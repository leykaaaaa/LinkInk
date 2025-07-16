import { create } from "zustand";
import { nanoid } from "nanoid";
import { db } from "@firebase-config";
import {
    getDocs,
    collection,
    deleteDoc,
    doc,
    addDoc,
} from "firebase/firestore";
import { useAuthStore } from "@store/auth/authStore";

const notebooksRef = collection(db, "notebooks");

const notebookStore = (set, get) => ({
    notebookList: [],
    renderNotebooks: async () => {
        const userDetails = useAuthStore.getState().userDetails;
        try {
            const data = await getDocs(notebooksRef);
            const filteredData = data.docs
                .map((doc) => ({
                    ...doc.data(),
                    notebookId: doc.id,
                }))
                .filter((doc) => doc.author === userDetails.email);

            set((state) => ({
                ...state,
                notebookList: filteredData,
            }));
        } catch (error) {
            console.log(error);
        }
    },
    deleteNotebook: async (id) => {
        const notebookDoc = doc(db, "notebooks", id);
        await deleteDoc(notebookDoc);
        get().renderNotebooks();
    },
});

export const useNotebookStore = create(notebookStore);
