import { createContext, useContext, useEffect, useState } from "react";
import { account } from "../lib/appwrite";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkUserStatus();
    }, []);

    const checkUserStatus = async () => {
    try {
        const session = await account.get();
        setUser(session);
    } catch (error) {
        // Just set user to null, don't let the error crash the app
        setUser(null);
    } finally {
        setLoading(false);
    }
};

    return (
        <AuthContext.Provider value={{ user, setUser, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);