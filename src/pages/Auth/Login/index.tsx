import { useForm } from "@mantine/form";
import { Button, TextInput } from "@mantine/core";
import logo from "../../../assets/logo1.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import axiosInstance from "../../../interceptors/axiosInterceptor.ts";
import {ACCESS_TOKEN, REFRESH_TOKEN} from "../../../constants/app.constant.ts";
import {notifySuccess} from "../../../constants/notification.tsx";

const Login = () => {
    const navigate = useNavigate();

    const form = useForm({
        initialValues: {
            email: "",
            password: "",
        },
        validate: {
            email: (value) =>
                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
                    ? null
                    : "Invalid email address",
            password: (value) =>
                value.length < 6 ? "Password must be at least 6 characters" : null,
        },
    });

    const handleSubmit = async (values: typeof form.values) => {
        try {
            const { data } = await axiosInstance.post(
                "/auth/login",
                { email: values.email, password: values.password },
                { headers: { "Content-Type": "application/json" } }
            );

            if (data.data.isAdmin) {
                notifySuccess("Admin logged successfully!");
            } else {
                notifySuccess("User logged successfully!");
            }

            localStorage.setItem(ACCESS_TOKEN, data.data.accessToken);
            localStorage.setItem(REFRESH_TOKEN, data.data.refreshToken);

            localStorage.setItem("name", data.data.name);
            localStorage.setItem("email", data.data.email);
            localStorage.setItem("isAdmin", String(data.data.isAdmin));

            if (data.data.isAdmin) navigate("/admin/dashboard");
            else navigate("/user/dashboard");
        } catch (error: unknown) {
            if (axios.isAxiosError(error) && error.response) {
                const msg = error.response.data.message || "Invalid email or password";

                form.setErrors({ email: undefined, password: undefined });

                if (msg.toLowerCase().includes("email")) {
                    form.setErrors({ email: msg });
                } else if (msg.toLowerCase().includes("password")) {
                    form.setErrors({ password: msg });
                } else {
                    form.setErrors({ email: msg, password: msg });
                }
            } else {
                console.error(error);
                form.setErrors({
                    email: "Something went wrong. Please try again.",
                    password: undefined,
                });
            }
        }
    };


    return (
        <div className="flex items-center justify-center min-h-screen bg-[#D3B5F8] px-4 sm:px-6 lg:px-8">
            <div className="bg-white shadow-sm rounded-md p-6 flex flex-col items-center w-full max-w-sm">
                <div className="w-full text-center">
                    <img alt="Logo" src={logo} className="mx-auto h-10 w-auto" />
                    <h2 className="mt-6 text-2xl font-bold tracking-tight text-gray-800">
                        Sign in to your account
                    </h2>
                </div>

                <form onSubmit={form.onSubmit(handleSubmit)} className="mt-6 w-full space-y-4">
                    {/* Email */}
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
                                {...form.getInputProps("email")}
                                classNames={{
                                    input: `block w-full rounded-md bg-white border px-3 py-2 text-base text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 sm:text-sm ${
                                        form.errors.email
                                            ? "border-red-500 focus:ring-red-500"
                                            : "border-gray-300 focus:ring-[#B453F5]"
                                    }`,
                                    error: "text-red-500 text-xs mt-1",
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
                            <TextInput
                                id="password"
                                type="password"
                                required
                                radius="md"
                                placeholder="••••••••"
                                {...form.getInputProps("password")}
                                classNames={{
                                    input: `block w-full rounded-md bg-white border px-3 py-2 text-base text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 sm:text-sm ${
                                        form.errors.password
                                            ? "border-red-500 focus:ring-red-500"
                                            : "border-gray-300 focus:ring-[#B453F5]"
                                    }`,
                                    error: "text-red-500 text-xs mt-1",
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
                    <Link to="/register" className="font-semibold text-[#B453F5] hover:text-[#830999]">
                        Create account
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;