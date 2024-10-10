import { useState, useEffect }  from 'react';
import { useUsersContext } from '../hooks/useUsersContext.js';
import { useAuthContext } from '../hooks/useAuthContext.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';



const AdminList = () => {
    const { users, dispatch } = useUsersContext();
    const { user } = useAuthContext();

    const [memberUsers, setMemberUsers] = useState([]);
    const [staffUsers, setStaffUsers] = useState([]);

    const [memberSearch, setMemberSearch] = useState('');
    const [staffSearch, setstaffSearch] = useState('');

    const userRole = () => {
        if (!user) {
            return 'member'
        }

        return user.role
    }

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetch('/api/user');
            
            const json = await response.json();
    
            if(response.ok) {
                dispatch ({type: 'SET_USERS', payload: json});
            }
        };

        if (user) {
            fetchUsers();
        }
    }, [dispatch, user]);

    useEffect(() => {
        if (users) {
            setMemberUsers(getMemberUsers(users))
            setStaffUsers(getStaffUsers(users))
        }
    }, [users])

    const getMemberUsers = (users) => {
        return users.filter((user) => user.role === 'member')
    }

    const getStaffUsers = (users) => {
        return users.filter((user) => user.role === 'staff')
    }

    const filteredMembers = memberUsers.filter((aUser) => 
    `${aUser.firstname} ${aUser.lastname}`
        .toLowerCase()
        .includes(memberSearch.toLowerCase())
    )

    const filteredStaff = staffUsers.filter((aUser) => 
        `${aUser.firstname} ${aUser.lastname}`
            .toLowerCase()
            .includes(staffSearch.toLowerCase())
    )

    const handleDelete = async (id) => {
        if (!user) return;

        const response = await fetch(`/api/user/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        });

        if (response.ok) {
            dispatch({ type: 'DELETE_USER', payload: id });
        }
    };

    return (
        (userRole() === 'admin') && (
            <div>
                <h2>The members and staff</h2>
                <div className="users">
                    <div className="members">
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <h3>Members</h3>
                            <input
                                type='text'
                                placeholder='Search members...'
                                value={memberSearch}
                                onChange={(e) => setMemberSearch(e.target.value)}
                                style={{ marginLeft: '10px', maxWidth: '350px' }}
                            />
                        </div>
                        {filteredMembers.map((aUser) => (
                            <div key={aUser._id} className="user-item">
                                <div>
                                    <p>Name: {aUser.firstname} {aUser.lastname}</p>
                                    <p>Email: {aUser.email}</p>
                                    <p>ID: {aUser._id}</p>
                                </div>
                                <button onClick={() => handleDelete(aUser._id)} className="delete-button">
                                    <FontAwesomeIcon icon={faTrash} /> {/* Trash can icon */}
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="staff">
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <h3>Staff</h3>
                            <input 
                                type="text" 
                                placeholder='Search staff...'
                                value={staffSearch}
                                onChange={(e) => setstaffSearch(e.target.value)}
                                style={{ marginLeft: '10px', maxWidth: '350px' }}
                            />
                        </div>
                        {filteredStaff.map((aUser) => (
                            <div key={aUser._id} className="user-item">
                                <div>
                                    <p>Name: {aUser.firstname} {aUser.lastname}</p>
                                    <p>Email: {aUser.email}</p>
                                    <p>ID: {aUser._id}</p>
                                </div>
                                <button onClick={() => handleDelete(aUser._id)} className="delete-button">
                                    <FontAwesomeIcon icon={faTrash} /> {/* Trash can icon */}
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    )
}
export default AdminList;