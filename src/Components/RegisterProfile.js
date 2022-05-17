import React, {useState } from 'react'
import { Fade } from 'react-reveal'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const RegisterProfile = () => {

    const {usernameReg} = useParams();
    const [birthday, setBirthday] = useState("")
    const [city, setCity] = useState("")
    const [img, setImg] = useState("")
    const navigate = useNavigate()
  

    // const handleFile = (event) => {
    //     const imgFile = event.target.files[0]
    //     Promise.resolve().then(()=>setImgReg(imgFile)).then(()=>console.log(imgFile))
    // }
    

    const registeraddtl = () => {
        
        axios.post("https://serserserver.herokuapp.com/registeraddtl",{
            username:usernameReg,
            city:city,
            birthday:birthday,
        }).then((response)=> {
            console.log(response)

            if(response.status===200){
        
                const id = response["data"]["result"]["0"]["userid"];
             
                
                navigate(`/profile/${id}`)
            } 

        })
        console.log(`${usernameReg},${birthday},${city}`)

    }

    
    return (
        <Fade right>
            <div className='col-6 profile'>
                <h1>Finish your profile</h1>
                
                <div className="form-floating mb-3 form">
                    <input type="text" className="form-control" id="fullname" placeholder="city" onChange={(e)=>{setCity(e.target.value)}}/>
                    <label htmlFor="fullname">City</label>
                </div>

                <div className="form-floating mb-3 form">
                    <input type="date" className="form-control" id="birthday" placeholder="date" onChange={(e)=>{setBirthday(e.target.value)}}/>
                    <label htmlFor="birthday">Birthday</label>
                </div>

               
                    <label htmlFor="birthday">Profile Photo</label>
                    <input type="file" name="image" id="profilepicture" accept="image/*" />
                     

                <div className='submit'>
                    <input type="submit" onClick={registeraddtl} />
                </div>
                
            </div>
        </Fade>
        
    )
}

export default RegisterProfile