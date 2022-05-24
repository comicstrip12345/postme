import React, {useState } from 'react'
import { Fade } from 'react-reveal'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import swal from 'sweetalert'; 

const RegisterProfile = () => {

    const {usernameReg} = useParams();
    // eslint-disable-next-line
    const [username,setUsername]=useState(usernameReg)
    const navigate = useNavigate()
    const [file, setFile]=useState("")
    const [formInput,setFormInput] = useState({
        city:"",
        birthday:"",
    });


    const handleInput = (e) => {
        e.preventDefault()
        setFormInput({...formInput,[
            e.target.name
        ]:e.target.value})
    }

    const handleInput2 = (e) => {
       setFile(e.target.files[0])
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
                <div className="form-floating mb-3 form">
                    <input type="text" className="form-control" name="city" placeholder="city" onChange={handleInput}/>
                    <label htmlFor="fullname">City</label>
                </div>

                <div className="form-floating mb-3 form">
                    <input type="date" className="form-control" name="birthday"  placeholder="date" onChange={handleInput}/>
                    <input type="text" className="form-control" name="username"  hidden value={username} readOnly/>
                    <label htmlFor="birthday">Birthday</label>
                </div>
                <div className='form image-upload mb-3'>
                    <label>Profile Photo</label><br/>
                    <input type="file" name="image"  accept="image/*" onChange={handleInput2}/>
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