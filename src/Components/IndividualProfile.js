import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import NavbarLoggedIn from './NavbarLoggedIn';
import ProfileFeedSettings from './ProfileFeedSettings';
import 'bootstrap-icons/font/bootstrap-icons.css'

const IndividualProfile = () => {


    const {userid} = useParams();
    const [file, setFile]=useState("")
    const [profile, setProfile] = useState([]);
    const [profileUpdater,setProfileUpdater]=useState(1)
    const [editingMode, setEditingMode]=useState(false)
    const [formInput,setFormInput] = useState({
        firstName: "",
        lastName:"",
        nickname:"",
        intro:"",
        status:"",
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

    useEffect(()=>{

        const init ={
            firstName: profile.firstName,
            lastName:profile.lastName,
            nickname:profile.nickname,
            intro:profile.intro,
            status:profile.status,
            city:profile.city,
            birthday:profile.birthday,
        }

        setFormInput({...formInput, init})
        // eslint-disable-next-line
    },[profile])
   

    useEffect(
        ()=> {
   
                axios.post("https://serserserver.herokuapp.com/profile", {userid:userid} ).then((res)=> {
                    if(res.status===200){
                        const id = res["data"]["array"][0]
                        setProfile(id)
                    }
                }) // eslint-disable-next-line
            }, [editingMode])

       
    const editHandler = () => {
        setEditingMode(true)
    }

    const doneEditHandler = () => {
        setEditingMode(false)
       
    }

    const saveEditHandler = (e) => {
        e.preventDefault()

        const formData = new FormData();
        formData.append('userid',userid)
        formData.append('firstName',formInput.firstName)
        formData.append('lastName',formInput.lastName)
        formData.append('nickname',formInput.nickname)
        formData.append('intro',formInput.intro)
        formData.append('status',formInput.status)
        formData.append('birthday',formInput.birthday)
        formData.append('city',formInput.city)
        formData.append('image',file)

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        //  const data = {
        //      userid:userid,
        //      firstName:formInput.firstName,
        //      lastName:formInput.lastName,
        //      nickname:formInput.nickname,
        //      intro:formInput.intro,
        //      status:formInput.status,
        //      birthday:formInput.birthday,
        //      city:formInput.city
        //  }


         axios.post("https://serserserver.herokuapp.com/editprofile", formData, config ).then((res)=> {
                    if(res.status===200){
                        console.log(res)
                        setEditingMode(false)
                        setProfileUpdater(profileUpdater+1)
                    }
                }) 
            }

            


  return (
    <>
        <NavbarLoggedIn
            link={userid}
        />
        <section className='profile'>
            <form onSubmit={saveEditHandler} encType="multipart/form-data"> 
            <div className='container'>
                <div className='row'>
                    <div className='col-2'>
                        <div className='circlePhoto'>

                            {
                                !editingMode?    <img src={`${profile.picpath}`} style={{width:"160px", height:"160px",objectFit:"cover", borderRadius:"160px"}}  alt="profile avatar"/> :

                                <>
                                <input type="file" name="image"  accept="image/*" onChange={handleInput2}/>
                                <input type="text" className="form-control" name="userid"  hidden value={userid} readOnly/>
                                </>
                   
                            }
                         

                        </div>
                    </div>
                    <div className='col-10 profileName '>
                        <div className='row'>
                        { !editingMode? 
                                <div className='col-12'>

                                    <h1> {profile.firstName} {profile.lastName}</h1> 
                                </div>  :

                                <>
                                     <div className="col-4 me-1 form-floating form">
                                         <input type="text" className="form-control" id="post" placeholder="text" name="firstName" defaultValue={profile.firstName}   onChange={handleInput}/>
                                        <label htmlFor="post">First Name </label>
                                     </div>
                                     <div className="col-4 mb-1 form-floating form">
                                         <input type="text" className="form-control" id="post" placeholder="text" name="lastName" defaultValue={profile.lastName}  onChange={handleInput}/>
                                        <label htmlFor="post">Last Name</label>
                                     </div>
                                </>
                                     }
                            
                        </div>

                        <div className='row'>
                            { !editingMode? 
                                <p>{profile.nickname}</p>:
                                
                                <div className="col-4 form-floating form">

                                            <input type="text" className="form-control" id="post" placeholder="text" name="nickname" defaultValue={profile.nickname}  onChange={handleInput}/>
                                            <label htmlFor="post">Nickname</label>
                                 </div>
                                     }
                        </div>
                       
                    </div>
                    <div className='col-12 profileFeed'>
                        <div className='row'>
                            <div className='col-5 info'>
                                <div className='row'>
                                    <div className='col-12 intro'>
                                        <h1>Intro</h1>
                                        { !editingMode?  <p>{profile.intro}</p>:
                                            <div className="form-floating mb-3 form">
                                                <input type="text" className="form-control" id="post" placeholder="text" name="intro" defaultValue={profile.intro}  onChange={handleInput}/>
                                                <label htmlFor="post">Intro</label>
                                            </div>
                                        }

                                        { !editingMode?  <p>{profile.status}</p>:
                                            <div className="form-floating mb-3 form">
                                                <input type="text" className="form-control" id="post" placeholder="text" name="status" defaultValue={profile.status}  onChange={handleInput}/>
                                                <label htmlFor="post">Status</label>
                                            </div>
                                        }
                                        
                                        
                                        { !editingMode? <p>{profile.birthday}</p>:
                                            <div className="form-floating mb-3 form">
                                                <input type="date" className="form-control" id="birthday" placeholder="date" name="birthday" defaultValue={profile.birthday} onChange={handleInput}/>
                                                <label htmlFor="birthday">Birthday</label>
                                            </div>
                                        }
                                        { !editingMode? <p>{profile.city}</p>:
                                            <div className="form-floating mb-3 form">
                                                <input type="text" className="form-control" id="post" placeholder="text" name="city" defaultValue={profile.city}  onChange={handleInput}/>
                                                <label htmlFor="post">City</label>
                                            </div>
                                        }
                                        
                                      
                                        {!editingMode?
                                         <button onClick={editHandler}><h1>Edit Details</h1></button>:
                                         <>
                                            <button onClick={doneEditHandler}><h1>Cancel Edit</h1></button>
                                            <button type="submit"><h1>Save Edit</h1></button>
                                         </>
                                         }

                                    </div>
                                </div>
                            </div>
                            <div className='col-7 newsFeed'>
                                <div className='row'>
                                    <ProfileFeedSettings userid={`${userid}`} profileupdater={profileUpdater} picpath={profile.picpath} />
                                   
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </form>
        </section>
        


    </>

    
  )
}

export default IndividualProfile