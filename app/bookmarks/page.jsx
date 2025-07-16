"use client";
import { FaTrash } from "react-icons/fa";
import { BsDot } from "react-icons/bs";
import { useBookmarkStore } from "@store/bookmark/bookmarkStore";
import Link from "next/link";
import { useEffect } from "react";

const BookmarksPage = () => {
    const { bookmarks, toggleBookmark, renderBookmarks } = useBookmarkStore();

    useEffect(() => {
        renderBookmarks();
    }, []);

    return (
        <div className="w-full flex flex-col items-center p-8">
            <header className="relative w-full flex justify-center items-center p-6 rounded-lg bg-[#4A4B57] shadow-custom">
                <div className="absolute left-5 flex">
                    <BsDot className="text-[5rem] mx-[-1rem]" />
                    <BsDot className="text-[5rem] mx-[-1rem]" />
                    <BsDot className="text-[5rem] mx-[-1rem]" />
                </div>
                <h1 className="text-4xl font-bold">Bookmarks</h1>
                <div className="absolute right-5 flex">
                    <BsDot className="text-[5rem] mx-[-1rem]" />
                    <BsDot className="text-[5rem] mx-[-1rem]" />
                    <BsDot className="text-[5rem] mx-[-1rem]" />
                </div>
            </header>

            <div className="w-full h-full flex flex-col items-center gap-4 mt-14">
                {bookmarks.length > 0 ? (
                    bookmarks.map((bookmark, index) => (
                        <div
                            className="w-[40rem] flex items-center py-4 px-8 rounded-lg bg-[#4A4B57] shadow-custom"
                            key={bookmark.noteId}
                        >
                            <p className="text-xl font-semibold">
                                {index + 1}.
                            </p>
                            <span className="w-full mx-8">
                                <Link
                                    href={`/notebooks/${bookmark.category}/${bookmark.noteId}`}
                                >
                                    <h2 className="text-2xl font-bold hover:underline">
                                        {bookmark.noteTitle}
                                    </h2>
                                    <small className="ml-5 text-gray-200">
                                        From:{" "}
                                        {bookmark.category.replace(/%20/g, " ")}{" "}
                                        Notebook
                                    </small>
                                </Link>
                            </span>
                            <FaTrash
                                className="text-lg cursor-pointer"
                                onClick={() => {
                                    toggleBookmark(bookmark);
                                    renderBookmarks();
                                }}
                            />
                        </div>
                    ))
                ) : (
                    <p className="text-2xl text-gray-300 mt-12 ">
                        No bookmarks found
                    </p>
                )}
            </div>
        </div>
    );
};

export default BookmarksPage;
