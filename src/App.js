import './App.css';
import React, {useState ,useEffect} from 'react'
import axios from 'axios'
import LoadingIndicator from './components/LoadingIndicator'
import HomePage from './pages/HomePage'
import UserProfilePage from './pages/UserProfilePage'
import { Route} from "react-router-dom"
import NavBarDisplay from './components/NavBarDisplay';
import { ToastContainer } from 'react-toastify';
import MyProfilePage from './pages/MyProfilePage'
import UploadPage from './pages/UploadPage';

function App() {
  
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem('jwt') !== null
  )

  const [users, setUsers] = useState([])
  const [ isloading, setIsLoading] = useState(true);
  
  useEffect(() => {
    //perform a GET request
    axios.get('https://insta.nextacademy.com/api/v1/users')
    .then(result => {
      // If successful, we do stuffs with 'result'
      // console.log(result.data)
      setUsers(result.data)
      setIsLoading(false)
    })
    .catch(error => {
      // If unsuccessful, we notify users what went wrong
      console.log(error)
      console.log('ERROR: ', error)
    })

  }, [])

  if(isloading){
    return <LoadingIndicator width="150px" height="150px" color="green" /> 
  }
 
  return(
    <>
        <NavBarDisplay loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>    
        <Route exact path="/" render = {(props) => <HomePage{...props} users={users}/>}/>
          
        <Route path="/users/:id" component={UserProfilePage} /> 
        <Route exact path="/profile" component={MyProfilePage} />
        <Route exact path="/upload" component={UploadPage} />
        <ToastContainer />
       
    </>
  );
}
export default App;
