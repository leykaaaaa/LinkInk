// components/SidebarContent.jsx
"use client";
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box,
    Avatar,
    Flex,
    HStack,
    Text,
    Button,
    Icon,
    Spacer,
    useToast,
} from "@chakra-ui/react";
import {
    BsFillBookmarkStarFill,
    BsFillTrash2Fill,
    BsFillPersonFill,
} from "react-icons/bs";
import { AiFillHome, AiFillBook } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import { useRouter } from "next/navigation";
import SidebarTab from "./SidebarTab";
import NotebooksTab from "./NotebooksTab";
import NewNotebookModal from "./modals/NewNotebookModal";
import Link from "next/link";
import { auth } from "../../firebase-config";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useAuthStore } from "@store/auth/authStore";
import { useNotebookStore } from "@store/notebook/notebookStore";

const SidebarContent = ({ onClose, isExpanded = true, onOpenModal }) => {
    const toast = useToast();
    const router = useRouter();
    const [user] = useAuthState(auth);
    const { userDetails } = useAuthStore();

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
        if (onClose) onClose();
    };

    return (
        <Flex
            direction="column"
            h="100vh"
            w={isExpanded ? "20rem" : "5rem"}
            p="4"
            bg="#202123"
            color="white"
        >
            {isExpanded && (
                <Text fontSize="2xl" fontWeight="bold" mb={6}>
                    <Link href="/">LinkInk</Link>
                </Text>
            )}
            <Button
                colorScheme="blue"
                w="full"
                mb={4}
                size="md"
                onClick={onOpenModal}
            >
                {isExpanded ? "Create Notebook" : "+"}
            </Button>

            <SidebarTab
                name="Home"
                path="/"
                icon={<AiFillHome />}
                showLabel={isExpanded}
            />
            <Accordion defaultIndex={[0]} allowMultiple w="100%" my={0.5}>
                <AccordionItem border="none">
                    <AccordionButton
                        bg="#2e8f21ff"
                        _hover={{ bg: "#cb168cff" }}
                        rounded="6px"
                        position="relative"
                    >
                        <Box
                            flex="1"
                            textAlign="left"
                            display="flex"
                            alignItems="center"
                            gap={2}
                            pl={2}
                        >
                            <Icon as={AiFillBook} fontSize="1.2rem" />
                            {isExpanded && "Notebooks"}
                        </Box>
                        {isExpanded && (
                            <AccordionIcon position="absolute" right="1rem" />
                        )}
                    </AccordionButton>
                    {isExpanded && (
                        <AccordionPanel pb={0}>
                            <NotebooksTab onOpen={onOpenModal} />
                        </AccordionPanel>
                    )}
                </AccordionItem>
            </Accordion>

            <SidebarTab
                name="Bookmarks"
                path="/bookmarks"
                icon={<BsFillBookmarkStarFill />}
                showLabel={isExpanded}
            />
            <SidebarTab
                name="Account Settings"
                path="/settings"
                icon={<BsFillPersonFill />}
                showLabel={isExpanded}
            />
            <SidebarTab
                name="Trash"
                path="/trash"
                icon={<BsFillTrash2Fill />}
                showLabel={isExpanded}
            />

            <Spacer />
            {isExpanded && (
                <HStack mt={4} mb="15px">
                    <Avatar
                        size="sm"
                        name={userDetails.displayName || userDetails.email}
                        src={userDetails.photoURL}
                    />
                    <Text fontWeight="semibold">
                        {userDetails.displayName || userDetails.email}
                    </Text>
                </HStack>
            )}
            <Button colorScheme="red" onClick={userSignOut}>
                {isExpanded ? "Log out" : ""}
                <Icon as={FiLogOut} ml={isExpanded ? 2 : 0} />
            </Button>

            {isExpanded && (
                <small className="mt-1 mb-[-7px] text-gray-300">
                    Made with ♥ by{" "}
                    <Link
                        href="https://facebook.com/geleykayyy"
                        target="_blank"
                        className="hover:underline"
                    >
                        Geleykay
                    </Link>
                </small>
            )}
        </Flex>
    );
};

export default SidebarContent;
