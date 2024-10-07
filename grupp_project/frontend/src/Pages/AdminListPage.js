import React from 'react';
import {useEffect}  from 'react';
import {useUsersContext} from '../hooks/useUsersContext.js';
import { useAuthContext } from '../hooks/useAuthContext.js';



const AdminList = () => {
    const {users , dispatch} = useUsersContext();
    const{user} = useAuthContext();

    const userRole = () => {
        if(!user) {
            return 'member'
        }
        return user.role
    }

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetch('/api/user');
            
            const json = await response.json();
    
            if(response.ok) {
                dispatch ({type : 'SET_USERS', payload :json});
            }

        };
        if (user) {
            fetchUsers();
        }

    }, {dispatch , user});

    return(
            (userRole() === 'admin') && (
                <div className ="users">
                    <h2>The users and staff</h2>
                </div>
            )
    )
}
export default AdminList;