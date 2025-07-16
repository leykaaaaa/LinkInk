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
    FormLabel,
    Input,
} from "@chakra-ui/react";
import { useState } from "react";
import { nanoid } from "nanoid";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@firebase-config";
import { useAuthStore } from "@store/auth/authStore";
import { useNoteStore } from "@store/note/noteStore";

const NewNoteModal = ({ isOpen, onClose, params }) => {
    const [title, setTitle] = useState("");
    const notesRef = collection(db, "notes");
    const { userDetails } = useAuthStore();
    const { renderNotes } = useNoteStore();

    const createNote = async () => {
        try {
            await addDoc(notesRef, {
                noteTitle: title,
                noteBody: "",
                isBookmarked: false,
                noteId: nanoid(),
                category: params,
                author: userDetails.email,
            });
            renderNotes();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent bg="#202123" color="white" borderColor="#9F9F9F">
                    <ModalHeader>New Note</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl>
                            <Input
                                placeholder="Note title"
                                autoComplete="off"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            type="submit"
                            colorScheme="facebook"
                            onClick={() => {
                                createNote(title, params);
                                setTitle("");
                                onClose();
                            }}
                            mx="auto"
                        >
                            Create Note
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default NewNoteModal;
