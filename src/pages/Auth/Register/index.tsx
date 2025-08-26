import { useState } from "react";
import { Button, PasswordInput, TextInput, Anchor } from "@mantine/core";
import logo from "../../../assets/logo1.png";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role, setRole] = useState("");


    const handleSubmit = async (e:any) => {
        e.preventDefault();

        // Validate password match
        if (password !== confirmPassword) {
            return alert("Passwords do not match");
        }

        try {
            const res = await fetch("http://localhost:5000/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                    isAdmin: role === "Admin", // convert role to boolean
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                alert(data.message || "Registration failed");
            } else {
                console.log("User registered:", data);
                alert("Registration successful!");
                // Redirect to login page
                window.location.href = "/login";
            }
        } catch (err) {
            console.error(err);
            alert("Something went wrong. Please try again.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#D3B5F8] px-4 sm:px-6 lg:px-8">
            <div className="bg-white shadow-sm rounded-md p-6 flex flex-col items-center w-full max-w-sm">

                {/* Logo & Title */}
                <div className="w-full text-center">
                    <img
                        alt="Your Company"
                        src={logo}
                        className="mx-auto h-10 w-auto"
                    />
                    <h2 className="mt-6 text-2xl font-bold tracking-tight text-gray-800">
                        Create your account
                    </h2>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="mt-6 w-full space-y-4">

                    {/* Name */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <div className="mt-2">
                            <TextInput
                                id="name"
                                required
                                radius="md"
                                placeholder="Your name"
                                value={name}
                                onChange={(e) => setName(e.currentTarget.value)}
                                classNames={{
                                    input:
                                        "block w-full rounded-md bg-white border border-gray-300 px-3 py-2 text-base text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#B453F5] sm:text-sm",
                                }}
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <div className="mt-2">
                            <TextInput
                                id="email"
                                type="email"
                                required
                                radius="md"
                                placeholder="Your email address"
                                value={email}
                                onChange={(e) => setEmail(e.currentTarget.value)}
                                classNames={{
                                    input:
                                        "block w-full rounded-md bg-white border border-gray-300 px-3 py-2 text-base text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#B453F5] sm:text-sm",
                                }}
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <div className="mt-2">
                            <PasswordInput
                                id="password"
                                required
                                radius="md"
                                placeholder="Your password"
                                value={password}
                                onChange={(e) => setPassword(e.currentTarget.value)}
                                classNames={{
                                    input:
                                        "block w-full rounded-md bg-white border border-gray-300 px-3 py-2 text-base text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#B453F5] sm:text-sm",
                                }}
                            />
                        </div>
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                            Confirm Password
                        </label>
                        <div className="mt-2">
                            <PasswordInput
                                id="confirmPassword"
                                required
                                radius="md"
                                placeholder="Confirm your password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.currentTarget.value)}
                                classNames={{
                                    input:
                                        "block w-full rounded-md bg-white border border-gray-300 px-3 py-2 text-base text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#B453F5] sm:text-sm",
                                }}
                            />
                        </div>
                    </div>

                    {/* Role Selection */}
                    <div className="pt-2">
                        <div className="flex space-x-6 justify-center">
                            <label className="flex items-center space-x-2">
                                <input
                                    type="radio"
                                    name="role"
                                    value="User"
                                    checked={role === "User"}
                                    onChange={(e) => setRole(e.target.value)}
                                    className="text-[#B453F5] focus:ring-[#B453F5]"
                                />
                                <span className="text-sm text-gray-700">User</span>
                            </label>
                            <label className="flex items-center space-x-2">
                                <input
                                    type="radio"
                                    name="role"
                                    value="Admin"
                                    checked={role === "Admin"}
                                    onChange={(e) => setRole(e.target.value)}
                                    className="text-[#B453F5] focus:ring-[#B453F5]"
                                />
                                <span className="text-sm text-gray-700">Admin</span>
                            </label>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        fullWidth
                        radius="md"
                        className="mx-auto block w-full sm:w-48 bg-[#B453F5] hover:bg-[#830999] text-white font-semibold rounded-full py-2 shadow-md transition duration-200"
                    >
                        Sign up
                    </Button>
                </form>

                {/* Sign In Link */}
                <p className="mt-6 text-center text-sm text-gray-600">
                    Already have an account?{" "}
                    <Anchor href="/login" className="font-semibold text-[#B453F5] hover:text-[#830999]">
                        Sign in
                    </Anchor>
                </p>
            </div>
        </div>
    );
};

export default Register;