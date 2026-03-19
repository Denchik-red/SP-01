import { useContext, createContext, useState } from "react";

const AuthContext = createContext();


export function AuthProvider({ children }) {
    const [isAuthorized, setIsAuthorized] = useState(true);

    return (
        <AuthContext.Provider
            value={{
                isAuthorized,
                setIsAuthorized,
            }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}