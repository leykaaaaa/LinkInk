import { create } from "zustand";
import { useNoteStore } from "@store/note/noteStore";
import { useAuthStore } from "@store/auth/authStore";

import {
    addDoc,
    collection,
    doc,
    getDocs,
    updateDoc,
} from "firebase/firestore";
import { db } from "@firebase-config";

const bookmarkStore = (set, get) => ({
    bookmarks: [],
    renderBookmarks: async () => {
        const userDetails = useAuthStore.getState().userDetails;
        const notesRef = collection(db, "notes");

        try {
            const data = await getDocs(notesRef);
            const filteredData = data.docs
                .map((doc) => ({ ...doc.data() }))
                .filter((doc) => doc.author === userDetails.email);
            const filteredBookmark = filteredData.filter(
                (data) => data.isBookmarked
            );

            set({ bookmarks: filteredBookmark });
        } catch (error) {
            console.log(error);
        }
    },
    toggleBookmark: async (note) => {
        const noteRef = doc(db, "notes", note.noteId);

        try {
            await updateDoc(noteRef, {
                isBookmarked: !note.isBookmarked,
                noteId: note.noteId,
            });
            useNoteStore.getState().renderNotes(); //para mag render yung bookmark icon
        } catch (error) {
            console.log(error);
        }
    },
});

export const useBookmarkStore = create(bookmarkStore);
