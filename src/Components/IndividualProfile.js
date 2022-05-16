import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const IndividualProfile = () => {

    const {userid} = useParams();
    const [profile, setProfile] = useState([])
    
        useEffect(
            ()=> {
                axios.post("https://serserserver.herokuapp.com/profile", {userid:userid} ).then((res)=> {
                    if(res.status===200){
                        console.log(res)
                        
                        const id = res["data"]["array"][0]
                        console.log(id)

                        setProfile(id)
                    }
                })
            },
            []
        )

  return (
    <div>

        <h1>{userid}</h1>

        SHET HELLO {profile.firstName}

    </div>

    
  )
}

export default IndividualProfile