import React, {useState,useEffect} from 'react';
import axios from 'axios';
import LoadingIndicator from '../components/LoadingIndicator'
import {Card, CardImg} from 'reactstrap';

const UserImages = ({userId}) => {
    
    console.log(userId)
    const [userImages, setUserImages] = useState([]);
    const [isloading, setIsLoading] = useState(true);

    useEffect(() => {
        //perform a GET request
        axios.get(`https://insta.nextacademy.com/api/v2/images?userId=${userId}`)
        .then(result => {
          // If successful, we do stuffs with 'result'
          //console.log(result)
          setUserImages(result.data)
          setIsLoading(false)

        })
        .catch(error => {
          // If unsuccessful, we notify users what went wrong
          console.log('ERROR: ', error)
        })
    
      }, [userId])

      if(isloading){
        return <LoadingIndicator width="100px" height="100px" color="blue" /> 
      }

      return (
        
          <div style={{display:"flex", flexWrap:"wrap", alignItems:"center"}}>
            {userImages.map((eachImg,index) => {
                
                return (
                    <Card style={{width:"200px"}}>
                      <CardImg src={eachImg.url} alt="Card image cap" style={{width:"150px"}} />

                    </Card> 
                )
                 
            })}
          </div> 
        
      );

}
export default UserImages;