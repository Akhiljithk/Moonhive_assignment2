import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import './AddUser.css'
import Button from '@mui/material/Button';
import { useGlobalState } from '../../GlobalStateContext';
import { useNavigate } from 'react-router-dom';

function AddUser() {
    const navigate = useNavigate();
    const goBack = () => {
        navigate('/');
    };
    const { userData, addNewUser } = useGlobalState();

    const [userId, setuserId] = useState("");
    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [phoneNumber, setphoneNumber] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        let formValues = {
            userId: userId,
            name: name,
            email: email,
            phoneNumber: phoneNumber
        }
        addNewUser(formValues);

        setuserId("")
        setname("")
        setemail("")
        setphoneNumber("")
      };
    return ( 
        <div className='addUser'>
            <div className='addUserForm'>
                <div>
                    <TextField onChange={(e)=> setuserId(e.target.value) } value={userId} className="addUserTextField" label="User Id" variant="outlined" /> <br />
                    <TextField onChange={(e)=> setname(e.target.value)} value={name} className="addUserTextField" label="Name" variant="outlined" />  <br />
                    <TextField onChange={(e)=> setemail(e.target.value)} value={email} className="addUserTextField" label="Email" variant="outlined" />  <br />
                    <TextField onChange={(e)=> setphoneNumber(e.target.value)} value={phoneNumber} className="addUserTextField" label="Phone number" variant="outlined" />
                </div>
                <Button variant="contained" onClick={handleSubmit}>Add user</Button> <br />
                <Button variant="text" onClick={goBack}>Back</Button>
            </div>
            <div className='allUsersWrap'>
            {userData.length > 0 ? (
                <div className='allUsers'>
                    {userData.map((user, index) => (
                        <div key={index} className='eachUser'>
                            <strong>User ID:</strong> {user.userId},&nbsp;
                            <strong>Name:</strong> {user.name},&nbsp;
                            <strong>Email:</strong> {user.email},&nbsp;
                            <strong>Phone Number:</strong> {user.phoneNumber}
                        </div>
                    ))}
                </div>
            ) : (
                <p>No user data available.</p>
            )}
            </div>
        </div>
     );
}

export default AddUser;