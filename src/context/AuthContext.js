
import React, {createContext, useEffect, useContext, useState} from "react";
import {auth, db} from '../Firebase/Firebase'
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged} from 'firebase/auth'
import { doc, setDoc } from "firebase/firestore"; 

const AuthContext = createContext();

export function AuthContextProvider({children}) {

    const [user, setUser] = useState({});

    function signUp(email, pass){
        createUserWithEmailAndPassword(auth, email, pass);        

        setDoc(doc(db, 'users', email), {
           savedShows: []
        });         
          
    }

    function logOut() {
        return signOut(auth);
    }

    function logIn(email, pass){
        return signInWithEmailAndPassword(auth, email, pass);
    }
    
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser)=>{
            setUser(currentUser);
        });
        return () => unsubscribe();
    })

    return(
        <AuthContext.Provider value={{signUp, user, logOut, logIn}}>
            {children}
        </AuthContext.Provider>
    );
}

export function UserAuth(){
    return useContext(AuthContext);
}