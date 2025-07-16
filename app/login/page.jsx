"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import SignInForm from "@app/components/SignInForm";
import SignUpForm from "@app/components/SignUpForm";

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase-config";
import { useAuthStore } from "@store/auth/authStore";
import { useToast } from "@chakra-ui/react";

const loginPage = () => {
    const router = useRouter();
    const toast = useToast();
    const [showSignup, setShowSignup] = useState(false);

    const [user] = useAuthState(auth);
    const googleProvider = new GoogleAuthProvider();
    const checkAuthChanges = useAuthStore((store) => store.checkAuthChanges);

    const googleLogin = () => {
        signInWithPopup(auth, googleProvider)
            .then(() => {
                toast({
                    title: "Login successful",
                    description: "Welcome back! You have successfully logged in.",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                    position: "top",
                });
                router.push("/");
            })
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        if (user) {
            router.push("/");
        }
        checkAuthChanges();
    }, [user]);

    return (
        <div className="text-black min-h-screen w-full flex flex-col md:flex-row items-center justify-center p-6 bg-[#0b3d20]">
            {/* Logo + Title Section */}
            <div className="w-full md:w-1/2 flex flex-col items-center justify-center gap-6 md:gap-4 mb-10 md:mb-0">
                <img className="w-2/3 md:w-2/3 max-w-xs md:max-w-md" src="/images/logo.png" alt="logo" />
                <h1 className="text-4xl md:text-6xl text-white font-bold text-center">
                    LinkInk
                </h1>
            </div>

            {/* Form Section */}
            <div className="w-full md:w-1/2 flex justify-center items-center px-4 md:px-8">
                {!showSignup ? (
                    <SignInForm
                        setShowSignup={setShowSignup}
                        googleLogin={googleLogin}
                    />
                ) : (
                    <SignUpForm
                        setShowSignup={setShowSignup}
                        googleLogin={googleLogin}
                    />
                )}
            </div>
        </div>
    );
};

export default loginPage;
