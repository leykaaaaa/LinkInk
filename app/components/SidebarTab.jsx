"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Flex, Icon, Text } from "@chakra-ui/react";

const SidebarTab = ({ name, path, icon, onClick, showLabel = true }) => {
    const pathname = usePathname();
    const isActive = pathname === path;

    return (
        <Link href={path} passHref>
            <Flex
                as="button"
                onClick={onClick}
                w="full"
                align="center"
                gap={showLabel ? 3 : 0}
                px={5}
                py={2.5}
                my={1}
                rounded="md"
                fontSize="lg"
                fontWeight={isActive ? "bold" : "medium"}
                bg={isActive ? "#2e8f21ff" : "#343541"}
                color="white"
                _hover={{ bg: "#4a4b4f" }}
                textAlign="left"
                justifyContent={showLabel ? "flex-start" : "center"}
            >
                <Icon as={icon.type} fontSize="1.2rem" />
                {showLabel && <Text>{name}</Text>}
            </Flex>
        </Link>
    );
};

export default SidebarTab;
