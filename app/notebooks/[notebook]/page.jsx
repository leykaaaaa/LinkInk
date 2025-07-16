"use client";
import Link from "next/link";
import { Suspense, useEffect } from "react";
import { useDisclosure, Button } from "@chakra-ui/react";
import { useNoteStore } from "@store/note/noteStore";
import { useNotebookStore } from "@store/notebook/notebookStore";
import { useRouter } from "next/navigation";
import NewNoteModal from "@app/components/modals/NewNoteModal";

const NotebookPage = ({ params }) => {
    const router = useRouter();
    const notebookName = params.notebook.replace(/%20/g, " ");
    const { isOpen, onOpen, onClose } = useDisclosure();

    const { notes, renderNotes, deleteAllNotes } = useNoteStore();
    const filteredNotes = notes.filter(
        (note) => note.category === params.notebook
    );

    const { notebookList, deleteNotebook } = useNotebookStore();
    const thisNotebook = notebookList.find(
        (book) => book.notebookTitle === notebookName
    );

    useEffect(() => {
        renderNotes();
    }, []);

    return (
        <div className="w-full flex flex-col items-center gap-8 p-12">
            <header className="relative w-full flex border-[1px] border-[#6D6D6D] rounded-lg py-6 px-12">
                <div className="w-full flex flex-col justify-center">
                    <h1 className="text-4xl font-bold">
                        {thisNotebook?.notebookTitle}
                    </h1>
                    <small className="text-base mt-2 ml-6">
                        {thisNotebook?.notebookDescription}
                    </small>
                </div>
                <div className="w-[12rem] flex flex-col gap-2">
                    <Button
                        colorScheme="blue"
                        w="full"
                        size="md"
                        boxShadow="base"
                        onClick={onOpen}
                    >
                        New Note
                    </Button>
                    <Button
                        colorScheme="red"
                        w="full"
                        size="md"
                        boxShadow="base"
                        onClick={() => {
                            deleteNotebook(thisNotebook.notebookId);
                            deleteAllNotes(thisNotebook.notebookTitle);
                            router.push("/");
                        }}
                    >
                        Delete Notebook
                    </Button>
                </div>
            </header>
            <Suspense fallback={<div>Loading notes...</div>}>
                <div className="w-full h-full flex flex-wrap gap-6">
                    {filteredNotes.map((note) => (
                        <Link
                            href={`/notebooks/${params.notebook}/${note.noteId}`}
                            key={note.noteId}
                        >
                            <div className="w-[10rem] h-[10rem] flex justify-center items-center bg-[#202123] border-[1px] border-[#9F9F9F] rounded-lg">
                                <h1 className="font-semibold text-xl text-center">
                                    {note.noteTitle}
                                </h1>
                            </div>
                        </Link>
                    ))}
                </div>
            </Suspense>

            <NewNoteModal
                isOpen={isOpen}
                onClose={onClose}
                params={params.notebook}
            />
        </div>
    );
};

export default NotebookPage;
