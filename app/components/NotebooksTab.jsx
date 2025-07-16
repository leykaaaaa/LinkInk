"use client";
import Link from "next/link";
import { useNotebookStore } from "@store/notebook/notebookStore";
import { usePathname } from "next/navigation";

const NotebooksTab = ({ onOpen }) => {
    const pathname = usePathname();

    const notebookList = useNotebookStore((store) => store.notebookList);
    return (
        <ul className="w-full flex flex-col">
            {notebookList.length > 0 ? (
                notebookList.map((list) => (
                    <Link
                        href={`/notebooks/${list.notebookTitle}`}
                        key={list.notebookTitle}
                    >
                        <li
                            className={`${
                                pathname ===
                                "/notebooks/" +
                                    list.notebookTitle?.replace(/\s/g, "%20")
                                    ? "activeTab"
                                    : ""
                            } w-full bg-[#343541] text-center text-lg p-2 my-1 rounded-md font-semibold`}
                        >
                            {list.notebookTitle}
                        </li>
                    </Link>
                ))
            ) : (
                <p className="text-center font-medium">
                    No notebooks found,{" "}
                    <span
                        className="text-blue-400 cursor-pointer hover:underline"
                        onClick={onOpen}
                    >
                        Create one?
                    </span>
                </p>
            )}
        </ul>
    );
};

export default NotebooksTab;
