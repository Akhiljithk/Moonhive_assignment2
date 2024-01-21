import React from 'react';
import { useGlobalState } from '../../GlobalStateContext';
import Button from '@mui/material/Button';
import './SplitCards.css'
import { useNavigate } from 'react-router-dom';


function SplitCards() {
    const navigate = useNavigate(); 
    const { allSplits } = useGlobalState();

    const viewSplit = (splitData) => {
        console.log(splitData);
        navigate('/ViewSplit', {state: {splitData}});
      }

    return ( 
        <div className='splitCardsWrap'>
            {Array.isArray(allSplits) ? (
                allSplits.map((split, index) => (
                    <div key={index} className='splitCard'>
                        <div>
                            <h3>{split.splitName}</h3>
                            <h4>Split by {split.owedTo}</h4>
                            <p>Rs.{split.totalAmount}</p>
                        </div>
                        <Button onClick={()=>viewSplit(split)} variant="contained" style={{"width":"20%"}}>View</Button>
                    </div>
                ))
            ) : "No data"}
        </div>
    );
}

export default SplitCards;
