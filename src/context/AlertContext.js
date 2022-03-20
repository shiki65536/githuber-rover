import {  createContext, useReducer } from 'react';
import AlertReducer from './AlertReducer';

const AlertContext = createContext();
const AlertProvider = ({children}) =>{

    const initial = {
        isError: false,
        showMsgBox: false,
        errMsg: '',
    }

    const [state, dispatch] = useReducer(AlertReducer, initial)

    const showAlert = (msg) => {
        dispatch({
            type: 'ERROR_MSG',
            payload: msg
        })

        setTimeout(dispatch({
            type: 'CANCEL_MSG'
        }), 3000)

    }



    return <AlertContext.Provider value={{
        ...state,
        showAlert
    }}>        
        {children}</AlertContext.Provider>


}

export {AlertContext, AlertProvider}