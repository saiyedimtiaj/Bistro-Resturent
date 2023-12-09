/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import auth from "../Firebase/Firebase.config";
import useAxios from "../Hooks/useAxios";


export const AuthContext = createContext([]) 

const AuthProvider = ({children}) => {
    const [user,setUser] = useState([]);
    const [loading,setLoading] = useState(true)
    const provider = new GoogleAuthProvider();
    const axios = useAxios()


    const createUser = (email,password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth,email,password)
    }

    const signIn = (email,password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth,email,password)
    }

    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        });
    }

    const logOut = () => {
        return signOut(auth)
    }

    const googleLogin = () => {
        setLoading(true);
        return signInWithPopup(auth,provider)
    }


    useEffect(()=>{
        const unSubscribe =  onAuthStateChanged(auth,currentUser=>{
            setUser(currentUser)
            const userInfo = {email:currentUser?.email}
            if(currentUser){
                axios.post('/jwt',userInfo)
                .then(res=>{
                    if(res.data.token){
                        localStorage.setItem('access-token',res.data.token)
                        setLoading(false)
                    }
                })
            }
            else{
                localStorage.removeItem('access-token')
                setLoading(false)
            }
        })
        return () => {
            return unSubscribe()
        }
    },[axios])
    

    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        logOut,
        updateUserProfile,
        googleLogin
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;