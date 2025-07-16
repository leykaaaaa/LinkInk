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
        <div className="relative w-full min-h-screen flex flex-col gap-6 m-10 p-10 bg-[#0d1f15] text-[#d4ffe6] border-[2px] border-[#1f4d3e] rounded-lg shadow-lg">
            <AiOutlineArrowLeft
                className="absolute top-5 left-5 text-3xl text-[#9bf5c1] hover:cursor-pointer hover:text-[#72c59f] transition active:scale-90"
                onClick={() => router.back()}
            />

            <div className="w-full flex justify-between items-start py-4 px-10 border-b border-[#2a674d]">
                <div className="w-full flex flex-col justify-center">
                    <input
                        className="text-3xl font-bold bg-transparent outline-none text-[#c4ffe4] placeholder:text-[#88bfa3]"
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => {
                            setTitle(e.target.value);
                            updateNoteTitle(e.target.value, filteredNote);
                        }}
                    />
                    <small className="ml-8 mt-2 text-sm text-[#a0d6be] font-medium">
                        {`Last Edited: ${
                            filteredNote.lastEdited
                                ? filteredNote.lastEdited
                                : "N/A"
                        }`}
                    </small>
                </div>

                <div className="flex gap-6 mt-2 text-[#9bf5c1]">
                    <button className="text-2xl hover:text-[#5fe4a8] transition">
                        {filteredNote.isBookmarked ? (
                            <BsFillBookmarkFill onClick={handleBookmarkToggle} />
                        ) : (
                            <BsBookmark onClick={handleBookmarkToggle} />
                        )}
                    </button>
                    <button
                        className="text-2xl hover:text-[#e57373] transition"
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
                className="w-full h-[70vh] p-6 text-lg outline-none bg-[#143525] text-[#d4ffe6] placeholder:text-[#a4cbb9] resize-none border border-[#2a674d] rounded-md"
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
