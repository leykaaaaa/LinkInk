import { create } from "zustand";

import {
    getDocs,
    collection,
    deleteDoc,
    doc,
    updateDoc,
} from "firebase/firestore";
import { db } from "@firebase-config";
import { useAuthStore } from "@store/auth/authStore";

const notesRef = collection(db, "notes");

const noteStore = (set, get) => ({
    notes: [],
    renderNotes: async () => {
        const userDetails = useAuthStore.getState().userDetails;
        const data = await getDocs(notesRef);
        const filteredData = data.docs
            .map((doc) => ({
                ...doc.data(),
                noteId: doc.id,
            }))
            .filter((doc) => doc.author === userDetails.email);

        set((state) => ({
            ...state,
            notes: filteredData,
        }));
    },
    deleteNote: async (id) => {
        const noteRef = doc(db, "notes", id);
        await deleteDoc(noteRef);
        get().renderNotes();
    },
    deleteAllNotes: async (category) => {
        const data = await getDocs(notesRef);
        const filteredData = data.docs
            .map((doc) => ({
                ...doc.data(),
                noteId: doc.id,
            }))
            .filter((data) => data.category === category);

        filteredData.forEach((data) => {
            get().deleteNote(data.noteId);
        });
    },
    updateNoteTitle: async (inputValue, prevNote) => {
        const deletePreviousNote = get().notes.filter(
            (note) => note.noteId !== prevNote.noteId
        );
        const updatedNote = {
            ...prevNote,
            noteTitle: inputValue,
            lastEdited: get().getLastEdited(),
        };

        try {
            const noteRef = doc(db, "notes", prevNote.noteId);
            await updateDoc(noteRef, updatedNote);
        } catch (error) {
            console.error("Error updating title:", error);
        }

        set((state) => ({
            ...state,
            notes: [updatedNote, ...deletePreviousNote],
        }));
    },
    updateNoteBody: async (inputValue, prevNote) => {
        const deletePreviousNote = get().notes.filter(
            (note) => note.noteId !== prevNote.noteId
        );
        const updatedNote = {
            ...prevNote,
            noteBody: inputValue,
            lastEdited: get().getLastEdited(),
        };

        try {
            const noteRef = doc(db, "notes", prevNote.noteId);
            await updateDoc(noteRef, updatedNote);
        } catch (error) {
            console.error("Error updating title:", error);
        }

        set((state) => ({
            ...state,
            notes: [updatedNote, ...deletePreviousNote],
        }));
    },
    getLastEdited: () => {
        const currentDate = new Date().toDateString();
        const currentTime = new Date()
            .toLocaleTimeString()
            .split("")
            .slice(0, 5)
            .join()
            .replace(/,/g, "");
        const amPm = new Date()
            .toLocaleTimeString()
            .split("")
            .slice(8, 11)
            .join()
            .replace(/,/g, "");

        return `${currentTime} ${amPm} | ${currentDate}`;
    },
});

export const useNoteStore = create(noteStore);
