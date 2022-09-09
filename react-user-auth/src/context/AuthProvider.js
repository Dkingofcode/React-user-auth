import { createContext, useState } from "react";
import { useUserContext } from "./userContext";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const { User } = useUserContext();
    const [auth, setAuth] = useState({});

    return (
        <AuthContext.Provider value={{ auth, setAuth }} >
        {children}
        </AuthContext.Provider>
    )

}

export default AuthContext;













