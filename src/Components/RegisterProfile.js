import React, {useState } from 'react'
import { Fade } from 'react-reveal'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import swal from 'sweetalert'; 
import 'bootstrap-icons/font/bootstrap-icons.css'

const RegisterProfile = () => {

    const {usernameReg} = useParams();
    // eslint-disable-next-line
    const [username,setUsername]=useState(usernameReg)
    const navigate = useNavigate()
    const [file, setFile]=useState("")
    const [errorCityMessage, setErrorCityMessage] = useState("")
    const [errorBirthdayMessage, setErrorBirthdayMessage] = useState("")
    const [errorPhotoMessage, setErrorPhotoMessage] = useState(false)
    const [errorCityBorderColor,setErrorCityBorderColor] = useState("")
    const [errorBirthdayBorderColor,setErrorBirthdayBorderColor] = useState("")
    const [cityValidity, setCityValidity] = useState(false)
    const [birthdayValidity, setBirthdayValidity] = useState(false)
    const [photoValidity, setPhotoValidity] = useState(false)
    const [formInput,setFormInput] = useState({
        city:"",
        birthday:"",
    });


    const cityChecker = (e) => {
        e.preventDefault()
        setFormInput({...formInput,[
            e.target.name
        ]:e.target.value})
        setCityValidity(true)
        setErrorCityBorderColor("")
    }
    const birthdayChecker = (e) => {
        e.preventDefault()
        setFormInput({...formInput,[
            e.target.name
        ]:e.target.value})
        setBirthdayValidity(true)
        setErrorBirthdayBorderColor("")
    }

    const handleInput2 = (e) => {
        setFile(e.target.files[0])
        setPhotoValidity(true)
    }




    // const handleFile = (event) => {
    //     const imgFile = event.target.files[0]
    //     Promise.resolve().then(()=>setImgReg(imgFile)).then(()=>console.log(imgFile))
    // }

    // https://serserserver.herokuapp.com/registeraddt
    

    const registeraddtl = (e) => {
        e.preventDefault()

        

            const formData = new FormData();
        formData.append('username',username)
        formData.append('birthday',formInput.birthday)
        formData.append('city',formInput.city)
        formData.append('image',file)

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        
        axios.post("https://serserserver.herokuapp.com/registeraddtl",
          formData,config).then((response)=> {
            console.log(response)
           

            if(response.status===200){
        
                const id = response["data"]["result"]["0"]["userid"];
                swal("Details added", "You have successfully added additional details", "success")
                 navigate(`/profile/${id}`)
            } 

        }).catch(error => {
            console.log(error);
        })
        
       
        
        
        
        

    }

    
    return (
        <Fade right>
            <div className='col-6 profile'>
                <h1>Finish your profile</h1>
                
                <form onSubmit={registeraddtl} encType="multipart/form-data">
                    <div className='row'>
                        <div className="col-9 form-floating mb-3 form">
                            <input type="text" style={{borderColor:`${errorCityBorderColor}`}} className="form-control" name="city" placeholder="city" onChange={cityChecker}/>
                            <label htmlFor="fullname">City</label>
                        </div>
                    </div>
                    <div className='row'>
                        <div className="col-9 form-floating mb-3 form">
                            <input type="date" style={{borderColor:`${errorBirthdayBorderColor}`}} className="form-control" name="birthday"  placeholder="date" onChange={birthdayChecker}/>
                            <input type="text" className="form-control" name="username"  hidden value={username} readOnly/>
                            <label htmlFor="birthday">Birthday</label>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-7 form image-upload'>
                            <label>Profile Photo</label><br/>
                            <input type="file" name="image"  accept="image/*" onChange={handleInput2}/>
                        </div>
                        <div className='col-5 errorMessage d-flex align-items-center'>
                            {errorPhotoMessage && <p style={{backgroundColor: "red"}}><i className="bi bi-exclamation-triangle-fill"></i> Photo required.</p>}
                        </div>
                    </div>

                
                
                
                <div className='submit'>
                    <input type="submit"  />
                </div>
                </form>
            </div>
        </Fade>
        
    )
}

export default RegisterProfile