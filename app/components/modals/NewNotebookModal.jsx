"use client";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    FormControl,
    Input,
} from "@chakra-ui/react";
import { useState } from "react";
import { nanoid } from "nanoid";
import { useNotebookStore } from "@store/notebook/notebookStore";

import { db } from "@firebase-config";
import { addDoc, collection, onSnapshot } from "firebase/firestore";

import { useRouter } from "next/navigation";
import { useAuthStore } from "@store/auth/authStore";

const NewNotebookModal = ({ isOpen, onClose }) => {
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const notebooksRef = collection(db, "notebooks");

    const { userDetails } = useAuthStore();
    const { renderNotebooks } = useNotebookStore();

    const createNotebook = async () => {
        try {
            await addDoc(notebooksRef, {
                notebookTitle: title,
                notebookDescription: description,
                notebookId: nanoid(),
                author: userDetails.email,
            });
            renderNotebooks();
        } catch (error) {
            console.log(error);
        }

        setTimeout(() => {
            router.push(`/notebooks/${title}`);
        }, 100);
    };

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent bg="#ac0c39ff" color="white" borderColor="#1bdc14ff">
                    <ModalHeader>New Notebook</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl>
                            <Input
                                placeholder="Title"
                                autoComplete="off"
                                value={title}
                                mb={3}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            <Input
                                placeholder="Description"
                                autoComplete="off"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            colorScheme="blue"
                            onClick={() => {
                                createNotebook();
                                setTitle("");
                                setDescription("");
                                onClose();
                            }}
                            mx="auto"
                        >
                            Create Notebook
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default NewNotebookModal;
