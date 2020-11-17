import React, {useEffect, useState} from 'react';


import UsersList from '../components/userList/UsersList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/ErrorModal';

const Users = () =>{

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [loadedUsers, setLoadedUsers] = useState();

    useEffect(() => {

        const sendRequest = async () =>{
            setIsLoading(true);

            try{
                const response = await fetch('http://localhost:5000/api/users');         
           
                const responseData = await response.json();
               

                if(!response.ok){
                    throw new Error(responseData.message);
                }
             
                setLoadedUsers(responseData.users);
                
                setIsLoading(false);
            }catch(err){
                setIsLoading(false);
                setError(err.message);
            }
          
        };

        sendRequest();
    }, []);

 

const errorHandler = () => {
    setError(null);
};


    // const USERS = [
    //         {
    //             id: '1',
    //             name:'rooban', 
    //             image:'https://lh4.googleusercontent.com/-0A4JtBQDKrs/VVJPnSLrOXI/AAAAAAABXR8/VFxcZF53zqk/w1134-h850-no/20141002_080237_HDR%257E2.jpg', 
    //             place:'3'
    //         }
    //     ];
    return  <React.Fragment>
              <ErrorModal error={error} onClear={errorHandler}/>
              {isLoading && (
                <div className="center">
                     <LoadingSpinner/>
                </div>
              )}
              
              {!isLoading && loadedUsers && <UsersList items={loadedUsers}/> }  
            </React.Fragment>
    
}

export default Users;