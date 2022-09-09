import { createContext, useState, useContext } from "react";


export const userContext = createContext({
    user: null,
    logIn: () => {},
    logOut: () => {},
});

const USER = { name: "David", isGuestUser: true }

export function UserContextProvider({ children }) {
    const [ User, setUser ] = useState(USER);
    function logIn(username){
       setUser({ isGuestUser: false, name: username}); 
    }
    function logOut(){
        setUser(USER);
    }
    return(
        <userContext.Provider value={{ User, logIn, logOut}}>
          {children}
        </userContext.Provider>
    )
}

export function useUserContext() {
    const { User, logIn, logOut } = useContext(userContext);

    return { User, logIn, logOut };
}















