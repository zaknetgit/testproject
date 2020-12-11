import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom';
import UserImages from '../containers/UserImages';

const UserProfilePage = () =>{

  let user = useParams();
  const [users, setUsers] = useState({})

  useEffect(() => {
    axios.get(`https://insta.nextacademy.com/api/v1/users/${user.id}`)
    .then(result =>{
      setUsers(result.data)
    })
    .catch(err => {
      console.log(err)
    })
  }, [user.id])

  return (
    <>
      <div>
        <h2>@{users.username}</h2>
        <img src={users.profileImage} className="rounded-circle" width="200" alt="profilepic"/>
      </div>
      <div>
        <UserImages userId ={users.id} />
      </div>
    </>
  )

}

export default UserProfilePage