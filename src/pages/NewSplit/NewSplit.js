import React, { useState, useEffect, useRef   } from 'react';
import TextField from '@mui/material/TextField';
import './NewSplit.css'
import Button from '@mui/material/Button';
import { useGlobalState } from '../../GlobalStateContext';
import { useNavigate } from 'react-router-dom';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function NewSplit() {
    const [splitName, setsplitName] = useState("");
    const [splitAmount, setsplitAmount] = useState("");
    const [paidBy, setpaidBy] = useState('');
    const [type, settype] = useState('');
    const [selectedPeople, setselectedPeople] = useState([]);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const { userData, saveSplitData } = useGlobalState();

    //model
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const navigate = useNavigate();
    const goBack = () => {
        navigate('/');
    };

    const calculateSplitAmount=()=>{
        if(type == 'EQUAL'){
            const totalPeople = selectedPeople.length;
            const totalAmount = parseFloat(splitAmount);
            if (totalPeople > 0 && totalAmount > 0) {
                const splitAmountPerPerson = (totalAmount / totalPeople).toFixed(2)
                const remainingAmount = totalAmount - splitAmountPerPerson * (totalPeople - 1);
                const adjustedSplitAmount = remainingAmount.toFixed(2)
                
                const updatedSelectedPeople = selectedPeople.map((person, index) => ({
                    ...person,
                    amount: index === 0 ? adjustedSplitAmount : splitAmountPerPerson,
                }));
            setselectedPeople(updatedSelectedPeople);
            }
        }
        
    }
    const prevSplitAmountRef = useRef();
    const prevSelectedPeopleLength = useRef(selectedPeople.length);

    useEffect(() => {
        if (prevSplitAmountRef.current !== splitAmount || prevSelectedPeopleLength.current != selectedPeople.length) {
            calculateSplitAmount();
            prevSplitAmountRef.current = splitAmount;
            prevSelectedPeopleLength.current = selectedPeople.length;
          }
    }, [selectedPeople, splitAmount]);

    const selectThisPerson = (userId, name) => {
        setselectedPeople((prevUsers) => {
            const isSelected = prevUsers.some((user) => user.userId === userId);
            if (isSelected) {
                const updatedUsers = prevUsers.filter((user) => user.userId !== userId);
                return updatedUsers;
            } else {
                const newUsers = [...prevUsers, { userId, name }];
                return newUsers;
            }
        });
    };

    const split=()=>{
        const isInvalid = validateSplit();
        if (isInvalid) {
            return;
        }

        const splitObject = {
            // other fields 
            "splitName": splitName,
            "owedTo": paidBy,
            "totalAmount": splitAmount,
            details: selectedPeople.map(person => {
            let amount = person.amount;
        
            if(type === 'PERCENT') {
                const totalAmount = parseFloat(splitAmount);
                amount = (person.amount/100) * totalAmount; 
            }
        
            return {
                userId: person.userId,
                name: person.name,
                amount  
            }
            })
        }

          saveSplitData(splitObject);
          navigate('/');
    }

    const changeType=(selectedType)=>{
        settype(selectedType)
    }

    const assignSplitValue = (e, user) => {
        const newValue = e.target.value;
    
        // Validate input value
        if (isNaN(newValue)) {
            setError(true);
            setErrorMessage('Please enter a valid number');
            return;
        }
    
        setselectedPeople((prevUsers) => {
            const updatedUsers = prevUsers.map((prevUser) => {
                if (prevUser.userId === user.userId) {
                    let updatedAmount = newValue;
                    return { ...prevUser, amount: updatedAmount };
                }
                return prevUser;
            });
    
            // Additional console log for debugging
            console.log(updatedUsers);
    
            return updatedUsers;
        });
    };
    
    
    
    
    const validateSplit = () => {
        // Reset error state
        setError(false);
        setErrorMessage('');

        if (type === 'EXACT') {
            const totalExactAmounts = selectedPeople.reduce((total, person) => total + parseFloat(person.amount), 0);
            if (totalExactAmounts !== parseFloat(splitAmount)) {
                setError(true);
                setErrorMessage('Total amounts do not match split amount');
                return true;
            }
        } else if (type === 'PERCENT') {
            const totalPercentages = selectedPeople.reduce((total, person) => total + parseFloat(person.amount), 0);
            if (totalPercentages !== 100) {
                setError(true);
                setErrorMessage('Total percentages do not add up to 100%');
                return true;
            }
        }

        return false;
    };

    return ( 
        <div className='splitPageWrapper'>
        <div>
            <div className='newSplitForm'>
                <TextField onChange={(e)=> setsplitName(e.target.value) } value={splitName} className="addUserTextField" label="Split title" variant="outlined" /> <br />
                <TextField onChange={(e)=> setsplitAmount(e.target.value) } value={splitAmount} className="addUserTextField" label="Amount" variant="outlined" /> <br />
                <InputLabel id="demo-simple-select-label">Paid by</InputLabel>
                <Select
                    style={{"width":"200px"}}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={paidBy}
                    // label="Paid by"
                    onChange={(event)=>{setpaidBy(event.target.value)}}
                >
                    {userData.length > 0 ? (
                        userData.map((user, index)=>(
                            <MenuItem key={index} value={user.name}>{user.name}</MenuItem>
                        ))
                    ) : (
                        <MenuItem value={""}>No users</MenuItem>
                    )}
                </Select>
                 <InputLabel id="demo-simple-select-label">Type</InputLabel>
                 <Select
                    style={{"width":"200px"}}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={type}
                    onChange={(event)=> changeType(event.target.value)}
                >
                    <MenuItem value="EQUAL">EQUAL</MenuItem>
                    <MenuItem value="EXACT">EXACT</MenuItem>
                    <MenuItem value="PERCENT">PERCENT</MenuItem>
                </Select> <br />
                <Button variant="outlined" style={{"marginTop":"10px"}} onClick={handleClickOpen}>
                    Add people
                </Button>
            </div>
                <Button variant="contained" style={{"width":"90%"}} onClick={split}>Save</Button> <br />
                <Button variant="text" onClick={goBack}>Back</Button>
            </div>            
            <div className='selectedPeople'>
                {selectedPeople.length > 0 ? (
                        selectedPeople.map((user) => (
                            <div className='selectedPerson' key={user.userId}>
                                <span>{user.name}</span>
                                <span className='splitAmount'>
                                {type === 'EQUAL' ? (
                                    <>
                                        Rs.<TextField value={user.amount} InputProps={{ readOnly: true, }} id="splitedAmount" variant="standard" style={{"width":"75px"}}/>
                                    </>
                                ) : type === 'EXACT' ? (
                                    <>
                                        Rs.<TextField onChange={(e) => assignSplitValue(e,user)} value={user.amount} id="splitedAmount" variant="standard" style={{"width":"75px"}}/>
                                    </>
                                ) : (
                                    <>
                                        <TextField onChange={(e) => assignSplitValue(e,user)} value={user.amount} id="splitedAmount" variant="standard" style={{"width":"75px"}}/>%
                                    </>
                                )}
                                </span>
                            </div>
                        ))
                    ) : <p>No selected users</p>}

                    {error && <p style={{ color: 'red' }}>{errorMessage}</p>}
            </div>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                    {"Select people to split your bill"}
                    </DialogTitle>
                    <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {userData.length > 0 ? (
                            userData.map((user, index)=>(
                                <MenuItem onClick={() => selectThisPerson(user.userId, user.name)} key={index} value={user.name} style={{
                                    backgroundColor: selectedPeople.some(
                                    (selectedPeople) => selectedPeople.userId === user.userId
                                    )
                                    ? 'lightblue'
                                    : 'inherit',
                                }}>{user.name}</MenuItem>
                            ))
                        ) : (
                            <MenuItem value={""}>No users</MenuItem>
                        )}
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleClose} autoFocus>
                        Done
                    </Button>
                    </DialogActions>
                </Dialog>

        </div>
     );
}

export default NewSplit;