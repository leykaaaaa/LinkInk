"use client";
import { useNoteStore } from "@store/note/noteStore";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { BsBookmark, BsFillBookmarkFill } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useBookmarkStore } from "@store/bookmark/bookmarkStore";
import { useEffect, useState } from "react";

const NotePage = ({ params }) => {
    const noteId = params.note.replace(/%20/g, " ");
    const router = useRouter();
    const { notes, updateNoteTitle, updateNoteBody, deleteNote, renderNotes } =
        useNoteStore();
    const { toggleBookmark, renderBookmarks } = useBookmarkStore();
    const filteredNote = notes.find((note) => note.noteId === noteId);

    const [title, setTitle] = useState(filteredNote.noteTitle);
    const [body, setBody] = useState(filteredNote.noteBody);

    const handleBookmarkToggle = () => {
        toggleBookmark(filteredNote);
        renderBookmarks();
    };

    return (
        <div className="relative w-full flex flex-col gap-6 m-10 p-10 border-[2px] border-[#9F9F9F]">
            <AiOutlineArrowLeft
                className="absolute top-5 left-5 text-3xl hover:cursor-pointer active:scale-90"
                onClick={() => router.back()}
            />
            <div className="w-full flex justify-between py-4 px-10 border-b-[1px] border-[#9F9F9F]">
                <div className="w-full flex flex-col justify-center">
                    <input
                        className="text-3xl font-bold bg-transparent outline-none"
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => {
                            setTitle(e.target.value);
                            updateNoteTitle(e.target.value, filteredNote);
                        }}
                    />
                    <small className="ml-8 mt-2 text-gray-300 font-medium">
                        {`Last Edited: ${
                            filteredNote.lastEdited
                                ? filteredNote.lastEdited
                                : "N/A"
                        }`}
                    </small>
                </div>

                <div className="flex gap-6">
                    <button className="text-2xl">
                        {filteredNote.isBookmarked ? (
                            <BsFillBookmarkFill
                                onClick={handleBookmarkToggle}
                            />
                        ) : (
                            <BsBookmark onClick={handleBookmarkToggle} />
                        )}
                    </button>
                    <button
                        className="text-2xl"
                        onClick={() => {
                            deleteNote(filteredNote?.noteId);
                            router.back();
                        }}
                    >
                        <FaTrash />
                    </button>
                </div>
            </div>
            <textarea
                className="w-full h-full p-6 text-lg outline-none bg-transparent resize-none border-[1px] border-[#9F9F9F]"
                value={body}
                onChange={(e) => {
                    setBody(e.target.value);
                    updateNoteBody(e.target.value, filteredNote);
                }}
                placeholder="Body"
            />
        </div>
    );
};

export default NotePage;
