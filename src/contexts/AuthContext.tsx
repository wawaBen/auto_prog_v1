/* eslint-disable */
// ignore all ts errors in this file
// FIXME remove this once refactor is done
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import {
    createContext,
    useContext,
    useEffect,
    useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    GoogleAuthProvider,
    signInWithPopup,
} from 'firebase/auth';
import { auth } from '../firebase/firebase'

const UserAuthContext = createContext();

/*
  NOTE:
        CONTEXTE MIS A JOUR QUAND ON SE CONNECTE, PAS DE PB EN LOCAL
        MAIS REFRESH (SUR APPLI DEPLOYEE) CAUSERAIT CRASH APP ("missing index.html") ?
*/
/*
  NOTE 2 -> TODO -> IMPORTANT:
        PLUTOT QUE D'EXPLOITER L'OBJET user RENVOYE PAR Firebase,
        UTILISER LE jwtToken / token QU'ON PEUT RECUPERER 
        VIA FONCTION DE TYPE "firebase.getToken(currentUser)"
        -> VOIR DANS LA DOC
*/

export default function AuthContextProvider({ children }) {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const logIn = async (email, password) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            const token = await user.getIdToken();
            console.log(user)
        } catch (error) {
            console.error('Erreur lors de la connexion:', error);
            // Gérer les erreurs de connexion
        }
    }

    function signUp(email, password) {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    function logOut() {
        // REDIRECTION SUR PAGE Login
        navigate('/');
        return signOut(auth);
    }

    function googleSignIn() {
        const googleAuthProvider = new GoogleAuthProvider();
        return signInWithPopup(auth, googleAuthProvider);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
            if (currentuser) {
                setUser(currentuser);
                navigate('/dashboard')
            } else {
                // REDIRECTION SI DECONNECTE
                navigate('/');
                // setUser(null);
            }
        });

        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <UserAuthContext.Provider
            value={{
                user,
                logIn,
                signUp,
                logOut,
                googleSignIn,
            }}
        >
            {children}
        </UserAuthContext.Provider>
    );
}

export function useUserAuth() {
    return useContext(UserAuthContext);
}

