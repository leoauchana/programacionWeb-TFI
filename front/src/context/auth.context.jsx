import { useState, createContext, useContext, useEffect} from "react";
import PropTypes from "prop-types";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";

export const authContext = createContext();

export const useAuth = () => {
    const context = useContext(authContext);
    if(!context){
        throw new Error(`useAuth must be used within an AuthProvider`);
    }
    return context;
}

export const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAutenticated] = useState(false);
    const navigate = useNavigate();

    const signIn = (user) => {
        try{
            console.log(user);
            setUser(user);
            setIsAutenticated(true);
        }catch(err){
            console.error(err);
        }
    };

    const signUp = async (values) => {
        try{
            const body = {
                name: values.inputNameValue,
                lastName: values.inputLastNameValue,
                userName: values.inputUserNameValue,
                password: values.inputPasswordValue
            };
                const response = await fetch(`/api/register`,{
                    method: 'POST',
                    body: JSON.stringify(body)
                });
                if(response.ok){
                    const newUser = response.json();
                    console.log(newUser);
                    window.alert('¡Ha sido registrado con éxito!');
                    navigate(-1);
                } else {
                    const errorData = await response.json();
                    window.alert(`${errorData.message}`);
                }
        }catch(err){
            console.error(err)
        }
    }

    useEffect(() => {
        const cookies = Cookies.get();

        if(cookies.token) {
            try{
                const response = fetch('api/verify',{
                    method: 'GET',
                    credentials: 'include'
                })
                if(!response.ok) setIsAutenticated(false);
                setIsAutenticated(true);
                setUser(response.data.json()); 
            }catch(err){
                console.error(err);
                setIsAutenticated(false);
                setUser(null);
            }
        }
    }, [])


    return (
        <authContext.Provider value={{
            signIn,
            user,
            isAuthenticated,
            signUp
        }
        }>
            {children}
        </authContext.Provider>
    )
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired, 
  };