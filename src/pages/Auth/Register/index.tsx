import { Button, TextInput, Input } from "@mantine/core";
import { useForm } from "@mantine/form";
import logo from "../../../assets/logo1.png";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();

    const form = useForm({
        initialValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            role: "",
        },

        validate: {
            name: (value) => (value.trim().length < 2 ? "Name is too short" : null),
            email: (value) =>
                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
                    ? null
                    : "Invalid email address",
            password: (value) => {
                const requirements = [
                    { re: /[0-9]/, label: "number" },
                    { re: /[a-z]/, label: "lowercase letter" },
                    { re: /[A-Z]/, label: "uppercase letter" },
                    { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: "special symbol" },
                ];
                if (value.length < 6) return "Password must be at least 6 characters";
                for (const req of requirements) {
                    if (!req.re.test(value)) return `Password must include ${req.label}`;
                }
                return null;
            },
            confirmPassword: (value, values) =>
                value !== values.password ? "Passwords do not match" : null,
            role: (value) => (!value ? "Please select a role" : null),
        },
    });

    const handleSubmit = async (values: typeof form.values) => {
        try {
            const res = await fetch("http://localhost:5000/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: values.name,
                    email: values.email,
                    password: values.password,
                    isAdmin: values.role === "Admin",
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                form.setErrors({ email: data.message || "Registration failed" });
            } else {
                console.log("User registered:", data);
                navigate("/login");
            }
        } catch (err) {
            console.error(err);
            form.setErrors({ email: "Something went wrong. Please try again." });
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#D3B5F8] px-4 sm:px-6 lg:px-8">
            <div className="bg-white shadow-sm rounded-md p-6 flex flex-col items-center w-full max-w-sm">
                {/* Logo & Title */}
                <div className="w-full text-center">
                    <img alt="Your Company" src={logo} className="mx-auto h-10 w-auto" />
                    <h2 className="mt-6 text-2xl font-bold tracking-tight text-gray-800">
                        Create your account
                    </h2>
                </div>

                {/* Form */}
                <form
                    onSubmit={form.onSubmit((values) => handleSubmit(values))}
                    className="mt-6 w-full space-y-4"
                >
                    {/* Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <div className="mt-2">
                            <TextInput
                                id="name"
                                required
                                radius="md"
                                placeholder="Your name"
                                error={form.errors.name}
                                classNames={{
                                    input: `block w-full rounded-md bg-white border px-3 py-2 text-base text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 sm:text-sm ${
                                        form.errors.name
                                            ? "border-red-500 focus:ring-red-500"
                                            : "border-gray-300 focus:ring-[#B453F5]"
                                    }`,
                                    error: "text-red-500 text-xs mt-1", // <-- add this line
                                }}
                                {...form.getInputProps("name")}
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <div className="mt-2">
                            <TextInput
                                id="email"
                                type="email"
                                required
                                radius="md"
                                placeholder="Your email address"
                                error={form.errors.email} // Mantine shows error text
                                classNames={{
                                    input: `block w-full rounded-md bg-white border px-3 py-2 text-base text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 sm:text-sm ${
                                        form.errors.email
                                            ? "border-red-500 focus:ring-red-500"
                                            : "border-gray-300 focus:ring-[#B453F5]"
                                    }`,
                                    error: "text-red-500 text-xs mt-1", // <-- add this line to style the error text
                                }}
                                {...form.getInputProps("email")}
                            />
                        </div>
                    </div>


                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <div className="mt-2">
                            <Input
                                id="password"
                                type="password"
                                required
                                radius="md"
                                placeholder="Your password"
                                error={form.errors.password}
                                classNames={{
                                    input: `block w-full rounded-md bg-white border px-3 py-2 text-base text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 sm:text-sm ${
                                        form.errors.password
                                            ? "border-red-500 focus:ring-red-500"
                                            : "border-gray-300 focus:ring-[#B453F5]"
                                    }`,
                                }}
                                {...form.getInputProps("password")}
                            />
                        </div>
                        {form.errors.password && (
                            <p className="text-red-500 text-xs mt-1">
                                {form.errors.password}
                            </p>
                        )}
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Confirm Password
                        </label>
                        <div className="mt-2">
                            <Input
                                id="confirmPassword"
                                type="password"
                                required
                                radius="md"
                                placeholder="Confirm your password"
                                error={form.errors.confirmPassword}
                                classNames={{
                                    input: `block w-full rounded-md bg-white border px-3 py-2 text-base text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 sm:text-sm ${
                                        form.errors.confirmPassword
                                            ? "border-red-500 focus:ring-red-500"
                                            : "border-gray-300 focus:ring-[#B453F5]"
                                    }`,
                                }}
                                {...form.getInputProps("confirmPassword")}
                            />
                        </div>
                        {form.errors.confirmPassword && (
                            <p className="text-red-500 text-xs mt-1">
                                {form.errors.confirmPassword}
                            </p>
                        )}
                    </div>

                    {/* Role Selection */}
                    <div className="pt-2">
                        <div className="flex space-x-6 justify-center">
                            <label className="flex items-center space-x-2">
                                <input
                                    type="radio"
                                    name="role"
                                    value="User"
                                    checked={form.values.role === "User"}
                                    onChange={() => form.setFieldValue("role", "User")}
                                    className="text-[#B453F5] focus:ring-[#B453F5]"
                                />
                                <span className="text-sm text-gray-700">User</span>
                            </label>
                            <label className="flex items-center space-x-2">
                                <input
                                    type="radio"
                                    name="role"
                                    value="Admin"
                                    checked={form.values.role === "Admin"}
                                    onChange={() => form.setFieldValue("role", "Admin")}
                                    className="text-[#B453F5] focus:ring-[#B453F5]"
                                />
                                <span className="text-sm text-gray-700">Admin</span>
                            </label>
                        </div>
                        {form.errors.role && (
                            <p className="text-red-500 text-xs mt-1">{form.errors.role}</p>
                        )}
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
                    <Link
                        to="/login"
                        className="font-semibold text-[#B453F5] hover:text-[#830999]"
                    >
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
