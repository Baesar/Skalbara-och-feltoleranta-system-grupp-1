import { createContext, useReducer } from 'react'

export const UsersContext = createContext() 

export const usersReducer = (state, action ) => {
    switch (action.type) {
        case 'SET_USERS': 
        return {
            users: action.payload
        }

        case 'DELETE_USER':
            return {
                ...state,
                users: state.users.filter((user) => user._id !== action.payload)
            }
        default:
             return state;
    }
}

export const UserContextProvider = ({children}) => {
    const [state, dispatch] = useReducer (usersReducer, {
        users: []
    })
    return (
        <UsersContext.Provider value ={{ ...state, dispatch }}>
            {children}
        </UsersContext.Provider>
    )
}
