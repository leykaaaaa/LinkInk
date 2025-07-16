"use client";
import Link from "next/link";
import {
    FormControl,
    FormLabel,
    Input,
    Button,
    useToast,
    FormErrorMessage,
    FormHelperText,
    useDisclosure,
} from "@chakra-ui/react";
import { BsFacebook, BsGithub } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase-config";
import ForgetPasswordModal from "./modals/ForgetPasswordModal";

const SignInForm = ({ setShowSignup, googleLogin }) => {
    const toast = useToast();
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isError, setIsError] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const signIn = () => {
        setIsError(false);
        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                router.push("/");
                toast({
                    title: "Login successful",
                    description:
                        "Welcome back! You have successfully logged in.",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                    position: "top",
                });
            })
            .catch(() => {
                setIsError(true);
            });
    };

    return (
        <div className="w-[32rem] flex flex-col items-center justify-center bg-[#faf9f9] rounded-xl p-12">
            <h1 className="w-full text-3xl font-bold mb-2">Sign in</h1>
            <p className="w-full font-semibold mb-6">
                New user?{" "}
                <button
                    className="text-blue-600 hover:underline"
                    onClick={() => setShowSignup(true)}
                >
                    Create an account
                </button>
            </p>
            <FormControl
                as="form"
                onSubmit={(e) => {
                    e.preventDefault();
                    signIn();
                }}
                isInvalid={isError}
            >
                <FormLabel>Email address</FormLabel>
                <Input
                    id="signUp-email-field"
                    type="email"
                    mb={3}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <FormLabel>Password</FormLabel>
                <Input
                    id="signUp-password-field"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {isError ? (
                    <FormErrorMessage mb={3} fontWeight="medium">
                        Wrong Email or Password
                    </FormErrorMessage>
                ) : (
                    <FormHelperText
                        textAlign="right"
                        mb={3}
                        color="blue.700"
                        _hover={{ textDecoration: "underline" }}
                        cursor="pointer"
                        onClick={onOpen}
                    >
                        Forget Password?
                    </FormHelperText>
                )}
                <Button type="submit" colorScheme="messenger" w="full">
                    Sign in
                </Button>
            </FormControl>

            <div className="my-6">---------- or ----------</div>
            <Button
                w="full"
                mb={4}
                p={4}
                rounded="md"
                variant="outline"
                leftIcon={<FcGoogle />}
                onClick={googleLogin}
            >
                Continue with Google
            </Button>
            <Button
                isDisabled
                w="full"
                mb={4}
                p={4}
                rounded="md"
                colorScheme="facebook"
                leftIcon={<BsFacebook />}
            >
                Continue with Facebook
            </Button>
            <Button
                isDisabled
                w="full"
                mb={4}
                p={4}
                rounded="md"
                leftIcon={<BsGithub />}
                bg="black"
                color="white"
            >
                Continue with Github
            </Button>

            <ForgetPasswordModal isOpen={isOpen} onClose={onClose} />
        </div>
    );
};

export default SignInForm;
