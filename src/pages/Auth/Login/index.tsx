import { useState } from "react";
import {Button, TextInput, Input} from "@mantine/core";
import logo from "../../../assets/logo1.png";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";

const Login =()=> {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Basic validation
        if (!email || !password) {
            return alert("Please fill in both email and password.");
        }

        // Email format validation
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            return alert("Please enter a valid email address.");
        }

        // Password length check
        if (password.length < 6) {
            return alert("Password must be at least 6 characters long.");
        }

        try {
            const {data} = await axios.post("http://localhost:5000/api/auth/login",
                { email, password },
                {headers: { "Content-Type": "application/json" },
                }
            );

            // Save token and role in localStorage
            localStorage.setItem("token", data.token);
            localStorage.setItem("name", data.name);
            localStorage.setItem("email", data.email);
            localStorage.setItem("isAdmin", data.isAdmin);

            // Redirect based on role
            if (data.isAdmin) {
                navigate("/admin/dashboard");
            } else {
                navigate("/user/dashboard");
            }
        } catch (error: any) {
            if (error.response) {
                // Server responded with error
                alert(error.response.data.message || "Login failed");
            } else {
                // Network or other issue
                console.error("Login error:", error);
                alert("Something went wrong. Please try again later.");
            }
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
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <div className="mt-2">
                            <Input
                                id="password"
                                type="password"
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
                    <Link to ="/register" className="font-semibold text-[#B453F5] hover:text-[#830999]">
                        Create account
                    </Link>
                </p>
            </div>
        </div>
    );
}
export default Login;