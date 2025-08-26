import {Burger, Button} from "@mantine/core";
import {Link} from "react-router-dom";
import logo from "../../assets/logo1.png";
import { useDisclosure } from '@mantine/hooks';
import welcomeImg from '../../assets/welcome.svg';
export default function Home() {

    const [opened, { toggle }] = useDisclosure(false);
    return (
        <div className="min-h-screen flex flex-col">
            <header
                className="w-full border-b border-gray-200 dark:border-gray-700 px-4"
                style={{ backgroundColor: '#D3B5F8' }}
            >
                <div className="flex justify-between items-center h-14 sm:h-16 md:h-20 lg:h-24">
                    {/* Left side: burger + logo */}
                    <div className="flex items-center">
                        <Burger opened={opened} onClick={toggle} size="sm" className="sm:hidden mr-4" />
                        <img
                            src={logo}
                            alt="Company Logo"
                            className="h-8 w-auto sm:h-10 md:h-12 lg:h-14 object-contain"
                            style={{ maxWidth: '200px' }}
                        />
                    </div>

                    {/* Right side: login button */}
                    <div>
                        <Link to='/login'>
                        <Button
                            type="submit"
                            radius="md"
                            className="bg-[#B453F5] hover:bg-[#830999] text-white font-semibold rounded-full py-2 px-4 sm:px-6 md:px-8 shadow-md transition duration-200 w-full sm:w-auto"
                        >
                            Sign in
                        </Button>
                        </Link>
                    </div>
                </div>
            </header>

    {/* Main Section */}
            <div className="flex-1 bg-[#D3B5F8] flex flex-col md:flex-row items-center justify-center px-6 py-10 md:py-20 gap-8">
                {/* Left content */}
                <div className="flex-1 flex flex-col justify-center md:items-start items-center text-center md:text-left space-y-8 md:space-y-12">
                    <h1 className="text-3xl md:text-5xl font-extrabold text-black leading-snug">
                        Track. Improve. Succeed.
                    </h1>

                    <p className="text-lg text-gray-800 max-w-lg md:text-2xl">
                        <span className="font-bold text-[#830999]">InternLog</span> is your personal task tracker during internship.
                    </p>

                    <p className="text-gray-800 max-w-lg ">
                        Effortlessly record your daily tasks, track progress with clarity, and stay perfectly aligned with your goals –{" "}
                        <span className="font-semibold">all within one powerful platform.</span>
                    </p>

                    {/* Sign up button - stays on left */}
                    <div className="w-full md:w-auto md:self-start">
                        <Link to="/register">
                            <Button
                                type="submit"
                                radius="md"
                                className="w-full sm:w-48 bg-[#B453F5] hover:bg-[#830999] text-white font-semibold rounded-full py-3 shadow-md transition duration-200"
                            >
                                Get started
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Right illustration */}
                <div className="flex-1 flex flex-col items-center gap-6">
                    <img
                        src={welcomeImg}
                        alt="Task tracking illustration"
                        className="w-[500px] md:w-[700px] lg:w-[750px] drop-shadow-lg"
                    />
                </div>
            </div>

        </div>
    );
}
