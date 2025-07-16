import {
    ModalOverlay,
    useDisclosure,
    Button,
    Modal,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    Text,
    ModalFooter,
} from "@chakra-ui/react";

const ForgetPasswordModal = ({ isOpen, onClose }) => {
    return (
        <>
            <Modal isCentered isOpen={isOpen} onClose={onClose}>
                <ModalOverlay
                    bg="blackAlpha.300"
                    backdropFilter="blur(10px) hue-rotate(90deg)"
                />
                <ModalContent>
                    <ModalHeader>Foget Password?</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody p={4}>
                        <Text textAlign="center" fontWeight="semibold">
                            You got this!Try to remember your password.
                        </Text>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="telegram" onClick={onClose}>
                            Thanks
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default ForgetPasswordModal;
