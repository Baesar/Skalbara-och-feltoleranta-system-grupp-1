import {UsersContext} from '../context/UserContext.js';
import {useContext} from 'react';

export const useUsersContext = () => {
    const context = useContext(UsersContext) 

    if(!context ) {
        throw Error('useUsersContext must be inside UsersContextProvider')
    }
    return context
}