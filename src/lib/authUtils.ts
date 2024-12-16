import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "./firebase";

export const registerUser = async (email: string, password: string): Promise<void> => {
    await createUserWithEmailAndPassword(auth, email, password);
};

export const login = async (email: string, password: string): Promise<void> => {
    await signInWithEmailAndPassword(auth, email, password);
};

export const logout = async (): Promise<void> => {
    await signOut(auth);
};

export const getCurrentUser = (): any => {
    return auth.currentUser;
};
