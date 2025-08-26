import { useState } from "react";
import { Button, PasswordInput, TextInput, Anchor } from "@mantine/core";
import logo from "../../../assets/logo1.png";

const Login =()=> {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: {"Content-Type": "application/json",},
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                // Save token and role in localStorage
                localStorage.setItem("token", data.token);
                localStorage.setItem("name", data.name);
                localStorage.setItem("email", data.email);
                localStorage.setItem("isAdmin", data.isAdmin);

                // Redirect based on role
                if (data.isAdmin) {
                    window.location.href = "/admin-dashboard";
                } else {
                    window.location.href = "/user-dashboard";
                }
            } else {
                alert(data.message || "Login failed");
            }
        } catch (error) {
            console.error("Login error:", error);
            alert("Something went wrong. Please try again later.");
        }

    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#D3B5F8] px-4 sm:px-6 lg:px-8">
            <div className="bg-white shadow-sm rounded-md p-6 flex flex-col items-center w-full max-w-sm">

                <div className="w-full text-center">
                    <img
                        alt="Your Company"
                        src={logo}
                        className="mx-auto h-10 w-auto"
                    />
                    <h2 className="mt-6 text-2xl font-bold tracking-tight text-gray-800">
                        Sign in to your account
                    </h2>
                </div>

                <form onSubmit={handleSubmit} className="mt-6 w-full space-y-4">

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email address
                        </label>
                        <div className="mt-2">
                            <TextInput
                                id="email"
                                type="email"
                                required
                                radius="md"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.currentTarget.value)}
                                classNames={{
                                    input:
                                        "block w-full rounded-md bg-white border border-gray-300 px-3 py-2 text-base text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#B453F5] sm:text-sm",
                                }}
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <div className="text-sm">
                                <Anchor href="#" className="font-semibold text-[#B453F5] hover:text-[#830999]">
                                    Forgot password?
                                </Anchor>
                            </div>
                        </div>
                        <div className="mt-2">
                            <PasswordInput
                                id="password"
                                required
                                radius="md"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.currentTarget.value)}
                                classNames={{
                                    input:
                                        "block w-full rounded-md bg-white border border-gray-300 px-3 py-2 text-base text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#B453F5] sm:text-sm",
                                }}
                            />
                        </div>
                    </div>

                    <Button
                        type="submit"
                        fullWidth
                        radius="md"
                        className="mx-auto block w-full sm:w-48 bg-[#B453F5] hover:bg-[#830999] text-white font-semibold rounded-full py-2 shadow-md transition duration-200"
                    >
                        Sign in
                    </Button>
                </form>

                <p className="mt-6 text-center text-sm text-gray-600">
                    Do not have an account yet?{" "}
                    <a href="/register" className="font-semibold text-[#B453F5] hover:text-[#830999]">
                        Create account
                    </a>
                </p>
            </div>
        </div>
    );
}

    export default Login;


