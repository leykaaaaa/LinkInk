"use client";
import { Avatar, Button, Icon, useToast } from "@chakra-ui/react";
import { BsFillShieldLockFill, BsFillBellFill } from "react-icons/bs";
import { AiOutlineUserSwitch } from "react-icons/ai";
import { MdOutlineHelp } from "react-icons/md";
import SettingsTab from "@app/components/SettingsTab";

import { useAuthStore } from "@store/auth/authStore";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "@firebase-config";

const SettingsPage = () => {
    const router = useRouter();
    const toast = useToast();
    const userDetails = useAuthStore((store) => store.userDetails);
    const { displayName, email, photoURL } = userDetails;

    const userSignOut = () => {
        signOut(auth)
            .then(() => {
                toast({
                    title: "Logout successful",
                    description: "You have been logged out.",
                    status: "warning",
                    duration: 3000,
                    isClosable: true,
                    position: "top",
                });
            })
            .catch((err) => console.log(err));
        router.push("/login");
    };

    return (
        <div className="relative w-full flex justify-center items-center">
            <div className="w-[35rem] h-[80%] flex flex-col items-center p-8">
                <Avatar size="2xl" name={displayName || email} src={photoURL} />
                <h1 className="text-center text-3xl font-bold my-4 bg-transparent outline-none">
                    {displayName || email}
                </h1>
                <div className="w-full flex flex-col items-center gap-3 mt-6">
                    <SettingsTab
                        name="Security and Privacy"
                        icon={<BsFillShieldLockFill />}
                    />
                    <SettingsTab
                        name="Notifications"
                        icon={<BsFillBellFill />}
                    />
                    <SettingsTab name="Help" icon={<MdOutlineHelp />} />
                    <Button
                        w="full"
                        colorScheme="teal"
                        size="lg"
                        boxShadow="sm"
                        leftIcon={<AiOutlineUserSwitch size={22} />}
                        onClick={userSignOut}
                    >
                        Switch Account
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;
