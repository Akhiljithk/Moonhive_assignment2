import React, { createContext, useContext, useState } from 'react';

const GlobalStateContext = createContext();

export const useGlobalState = () => {
    return useContext(GlobalStateContext);
};

export const GlobalStateProvider = ({ children }) => {

  const userDataString = localStorage.getItem('userData');
  const userDataFromLocalStorage = JSON.parse(userDataString) || [];
  
  const [userData, setUserData] = useState(userDataFromLocalStorage);
  const [allSplits, setAllSplits] = useState([]);

  // save the splited data and update user details here
  // const saveSplitData = (newSplit) => {
  //   setAllSplits((prev) => [...prev, newSplit]);
  
  //   //Update user algorithm
  //   var splitOwnerPastSplitData;
  //   var splitOwner = newSplit.owedTo

  //   userData.map((user)=>{
  //       if(newSplit.owedTo==user.name){
  //           splitOwnerPastSplitData = user.owed_to
  //       }
  //   })

  //   userData.map((user)=>{
  //       if(! (user.name in splitOwnerPastSplitData)){
  //           splitOwnerPastSplitData[user.name] = 0;
  //       }
  //   })


  //   newSplit.details.map((person)=>{
  //     if(person.name in splitOwnerPastSplitData){
  //         console.log("Inside");
  //           if(splitOwnerPastSplitData[person.name] < person.amount){
  //               // user 2 = 100 | save in u2
  //               let balance = person.amount - splitOwnerPastSplitData[person.name]
  //               const updatedData = userData.map(u => {
  //                   if(u.name === person.name) {
  //                       return {
  //                         ...u,
  //                         owed_to: {
  //                           ...u.owed_to,
  //                           [splitOwner]: balance
  //                         }
  //                       }
  //                     }
  //                   if(u.name === splitOwner) {
  //                       let newOwedTo = {...u.owed_to}; 
  //                       delete newOwedTo[person.name];
  //                       return {
  //                           ...u,
  //                           owed_to: newOwedTo
  //                       }
  //                     }
  //                     return u; 
  //               });
                
  //               setUserData(updatedData);
  //               localStorage.setItem('userData', JSON.stringify(updatedData));
  //           }else if (splitOwnerPastSplitData[person.name] > person.amount){
  //               // save in u1
  //               let balance = splitOwnerPastSplitData[person.name]-person.amount;
  //               const updatedData = userData.map(u => {
  //                   if(u.name === splitOwner) {
  //                       return {
  //                         ...u,
  //                         owed_to: {
  //                           ...u.owed_to,
  //                           [person.name]: balance
  //                         }
  //                       }
  //                     }
  //                   if(u.name === person.name) {
  //                       let newOwedTo = {...u.owed_to}; 
  //                       delete newOwedTo[splitOwner];
  //                       return {
  //                           ...u,
  //                           owed_to: newOwedTo
  //                       }
  //                     }
  //                     return u; 
  //               });
  //               setUserData(updatedData);
  //               localStorage.setItem('userData', JSON.stringify(updatedData));
  //           }else if(splitOwnerPastSplitData[person.name] = person.amount){
  //               // delete both
  //               const updatedData = userData.map(u => {
  //                   const shouldDelete = u.name === splitOwner || u.name === person.name;
  //                   if (shouldDelete) {
  //                       delete u.owed_to[splitOwner];
  //                       delete u.owed_to[person.name]; // Ensure both are deleted
  //                   }
  //                     return u; 
  //               });
  //               setUserData(updatedData);
  //               localStorage.setItem('userData', JSON.stringify(updatedData));
  //           }
  //       }
  //   }) // update user algo ends
  // };
  const saveSplitData = (newSplit) => {
    setAllSplits((prev) => [...prev, newSplit]);
  
    // Update user data
    var splitOwnerPastSplitData;
    var splitOwner = newSplit.owedTo
    
    userData.map((user)=>{
        if(newSplit.owedTo==user.name){
            splitOwnerPastSplitData = user.owed_to
        }
    })

    newSplit.details.map((person)=>{
      if(person.name in splitOwnerPastSplitData){
          if(splitOwnerPastSplitData[person.name] < person.amount){
              // user 2 = 100 | save in u2
              let balance = person.amount - splitOwnerPastSplitData[person.name]
              const updatedData = userData.map(u => {
                  if(u.name === person.name) {
                      return {
                        ...u,
                        owed_to: {
                          ...u.owed_to,
                          [splitOwner]: balance
                        }
                      }
                    }
                  if(u.name === splitOwner) {
                      let newOwedTo = {...u.owed_to}; 
                      delete newOwedTo[person.name];
                      return {
                          ...u,
                          owed_to: newOwedTo
                      }
                    }
                    return u; 
              });
  
              setUserData(updatedData);
              localStorage.setItem('userData', JSON.stringify(updatedData));
          }else if (splitOwnerPastSplitData[person.name] > person.amount){
              // save in u1
              let balance = splitOwnerPastSplitData[person.name]-person.amount;
              const updatedData = userData.map(u => {
                  if(u.name === splitOwner) {
                      return {
                        ...u,
                        owed_to: {
                          ...u.owed_to,
                          [person.name]: balance
                        }
                      }
                    }
                  if(u.name === person.name) {
                      let newOwedTo = {...u.owed_to}; 
                      delete newOwedTo[splitOwner];
                      return {
                          ...u,
                          owed_to: newOwedTo
                      }
                    }
                    return u; 
              });
              setUserData(updatedData);
              localStorage.setItem('userData', JSON.stringify(updatedData));
          }else if(splitOwnerPastSplitData[person.name] = person.amount){
              // delete both
              const updatedData = userData.map(u => {
                  const shouldDelete = u.name === splitOwner || u.name === person.name;
                  if (shouldDelete) {
                      delete u.owed_to[splitOwner];
                      delete u.owed_to[person.name]; // Ensure both are deleted
                  }
                    return u; 
              });
              setUserData(updatedData);
              localStorage.setItem('userData', JSON.stringify(updatedData));
          }
      }
  })
  

  };

  const addNewUser = (formValues)=>{

    const initialUserState = {
      userId: formValues.userId,
      name: formValues.name,
      email: formValues.email,
      phoneNumber: formValues.phoneNumber,
      owed_to: {},
      balance: 0,
      expenses: 0,
    };
  
    setUserData((prevAllUserData) => [...prevAllUserData, initialUserState]);
    localStorage.setItem('userData', JSON.stringify([...userData, initialUserState]));
  }

  return (
    <GlobalStateContext.Provider value={{ userData, addNewUser, allSplits, saveSplitData }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

