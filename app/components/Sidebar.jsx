"use client";
import { useEffect, useState } from "react";
import {
    Drawer,
    DrawerContent,
    DrawerOverlay,
    IconButton,
    useDisclosure,
    useBreakpointValue,
} from "@chakra-ui/react";
import { AiOutlineMenu } from "react-icons/ai";
import SidebarContent from "./SidebarContent";
import NewNotebookModal from "./modals/NewNotebookModal";

const Sidebar = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const isMobile = useBreakpointValue({ base: true, md: false });

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    return (
        <>
            {/* Mobile Hamburger Button */}
            {isMobile && (
                <IconButton
                    aria-label="Open Menu"
                    icon={<AiOutlineMenu />}
                    onClick={onOpen}
                    variant="outline"
                    position="fixed"
                    top="1rem"
                    left="1rem"
                    zIndex="1000"
                />
            )}

            {/* Drawer for Mobile */}
            <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
                <DrawerOverlay />
                <DrawerContent maxW="18rem">
                    <SidebarContent
                        onClose={onClose}
                        isExpanded={true}
                        onOpenModal={handleOpenModal}
                    />
                </DrawerContent>
            </Drawer>

            {/* Static Sidebar for Desktop */}
            {!isMobile && (
                <SidebarContent
                    isExpanded={true}
                    onOpenModal={handleOpenModal}
                />
            )}

            <NewNotebookModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
            />
        </>
    );
};

export default Sidebar;
