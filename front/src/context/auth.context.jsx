import { useState, createContext, useContext, useEffect} from "react";
import PropTypes from "prop-types";
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context){
        throw new Error(`useAuth must be used within an AuthProvider`);
    }
    return context;
}

export const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAutenticated] = useState(false);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const signIn = async (user) => {
        try{
                const response = await fetch(`/api/login`,{
                    method: 'POST',
                    body: JSON.stringify(user),
                    credentials: 'include'
                });
                if(!response.ok){
                    const errorData = await response.json();
                    console.log(errorData.data);
                    throw new Error(errorData.message)
                }
                const newUser = await response.json();
                setUser(newUser);
                setIsAutenticated(true);
                return true;
        }catch(err){
            console.error(err)
            setErrors([err.message])
        }
    };

    const signUp = async (newUser) => {
        try{
                const response = await fetch(`/api/register`,{
                    method: 'POST',
                    body: JSON.stringify(newUser)
                });

                if(!response.ok){
                    const errorData = await response.json();
                    throw new Error(errorData.message);
                }
                    const user = await response.json();
                    console.log(user);
                    window.alert('¡Ha sido registrado con éxito!');
        }catch(err){
            console.error(err)
            setErrors([err.message])
        }
    }

    const logout = async () => {
        Cookies.remove("token");
        setIsAutenticated(false);
        setUser(null);
    }


    useEffect(() => {
        if(errors.length > 0) {
            const timer = setTimeout(() => {
               setErrors([]); 
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [errors])

    useEffect(() => {
        async function checkLogin () {
            const cookies = Cookies.get();

        if(!cookies.token) { 
            setIsAutenticated(false);
            setLoading(false);
            return setUser(null);
        }
            try{
                const response = await fetch('/api/verify',{
                    method: 'GET',
                    credentials: 'include'
                })
                if(!response.ok) {
                    setIsAutenticated(false);
                    setLoading(false);
                    return
                }
                const user = response.json();
                console.log(user);
                setIsAutenticated(true);
                setUser(user); 
                setLoading(false);
            }catch(err){
                console.error(err);
                setIsAutenticated(false);
                setUser(null);
                setLoading(false);
            }
        
        }
        checkLogin();
    }, [])


    return (
        <AuthContext.Provider value={{
            signIn,
            signUp,
            logout,
            loading,
            user,
            isAuthenticated,
            errors
        }
        }>
            {children}
        </AuthContext.Provider>
    )
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired, 
  };