"use client";
import Link from "next/link";
import { useState } from "react";
import {
    BsFacebook,
    BsInstagram,
    BsGithub,
    BsTiktok,
    BsList,
} from "react-icons/bs";

const Homepage = () => {
    const [sidebarVisible, setSidebarVisible] = useState(false);

    const toggleSidebar = () => setSidebarVisible(!sidebarVisible);

    return (
          <div className="min-h-screen w-full bg-[#1f3322] text-white flex flex-col items-center px-4">
            {/* Main Content */}
            <div className="w-full flex flex-col-reverse md:flex-row items-center justify-between max-w-6xl mt-8">
                {/* Text Section */}
                <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left space-y-6 p-4">
                    <h1 className="text-4xl md:text-6xl font-bold text-pink-400">LinkInk</h1>
                    <p className="text-[#ffb6c1] leading-relaxed">
                        LinkInk is a powerful web app designed to revolutionize the way you capture and organize your notes.
                        With LinkInk, your notes are seamlessly stored in a virtual notebook, making it easy to keep track
                        of your thoughts, ideas, and important information.
                    </p>

                    {/* Social Links */}
                    <div className="flex space-x-4 text-pink-400">
                        <Link href="https://facebook.com" target="_blank"><BsFacebook size={24} /></Link>
                        <Link href="https://instagram.com" target="_blank"><BsInstagram size={24} /></Link>
                        <Link href="https://github.com" target="_blank"><BsGithub size={24} /></Link>
                        <Link href="https://tiktok.com" target="_blank"><BsTiktok size={24} /></Link>
                    </div>
                </div>

                {/* Logo Section */}
                <div className="w-full md:w-1/2 flex justify-center p-4">
                    <img
                        className="w-full max-w-xs md:max-w-md"
                        src="/images/logo.png"
                        alt="LinkInk logo"
                    />
                </div>
            </div>
        </div>
    );
};

export default Homepage;
