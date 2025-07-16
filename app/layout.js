"use client";
import Sidebar from "@app/components/Sidebar";
import { ChakraProvider } from "@chakra-ui/react";
import "./globals.css";
import { usePathname } from "next/navigation";
import { Box, Flex } from "@chakra-ui/react";

export default function RootLayout({ children }) {
    const pathname = usePathname();
    const hideSidebar = pathname === "/login";

    return (
        <html lang="en">
            <head>
                <title>LinkInk</title>
            </head>
            <body>
                <ChakraProvider>
                    <Flex>
                        {!hideSidebar && <Sidebar />}
                        <Box
                            as="main"
                            flex="1"
                            minH="100vh"
                        >
                            {children}
                        </Box>
                    </Flex>
                </ChakraProvider>
            </body>
        </html>
    );
}
