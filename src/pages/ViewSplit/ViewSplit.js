import React from 'react';
import Button from '@mui/material/Button';
import { useLocation } from 'react-router-dom';
import './ViewSplit.css'
import { useNavigate } from 'react-router-dom';

function ViewSplit() {

    const location = useLocation();
    const { state: { splitData } } = location;

    const navigate = useNavigate();
    const goBackToHome=()=>{
        navigate('/');
    }

    return ( 
        <div className='viewSplitCardWrapper'>
            <div className='viewSplitCard'>
                <div className='viewSplitCardHead'>
                    <h1>{splitData.splitName}</h1>
                    <h4 style={{"margin":"0"}}>Split by {splitData.owedTo}</h4>
                    <h2 style={{"marginBottom":"5px"}}>Rs.{splitData.totalAmount}</h2>
                </div>
                <div className='viewSplitCardPeopleWrapper'>
                    {splitData.details.map(detail => (
                        <div key={detail.userId}>
                            <p>{detail.name}</p>
                            <p>Rs.{detail.amount}</p>
                            {/* <Button variant="outlined" style={{"width":"20%"}}>Close</Button> */}
                        </div>
                    ))}
                </div>
                <Button variant="outlined" onClick={goBackToHome} style={{"width":"20%", "marginTop":"10px"}}>Back</Button>
            </div>
        </div>
    );
}

export default ViewSplit;
