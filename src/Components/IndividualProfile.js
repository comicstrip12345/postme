import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import NavbarNotLoggedin from './NavbarNotLoggedIn'
import ProfileFeedSettings from './ProfileFeedSettings';
import 'bootstrap-icons/font/bootstrap-icons.css'

const IndividualProfile = () => {

    const {userid} = useParams();
    const [profile, setProfile] = useState([]);
    const [editingMode, setEditingMode]=useState(false)
    const [cityChange,setCityChange] = useState();
    const [birthday,setBirthday] = useState();
    const [firstName,setFirstName] = useState();
    const [lastName,setLastName] = useState();
    const [nickname,setNickname] = useState();
    const [intro,setIntro] = useState();
    const [status,setStatus] = useState();
    
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

    const saveEditHandler = () => {
        

        axios.post("https://serserserver.herokuapp.com/editprofile", {
            userid:userid,
            firstName:firstName,
            lastName:lastName,
            nickname:nickname,
            intro:intro,
            status:status,
            newcity:cityChange,
            birthday:birthday
            } ).then((res)=> {
                    if(res.status===200){
                        console.log(res)
                    }
                }) 
            }

            setEditingMode(false)
       
    
 

  return (
    <>
        <NavbarNotLoggedin/>
        <section className='profile'>
            <div className='container'>
                <div className='row'>
                    <div className='col-2'>
                        <div className='circlePhoto'>

                        </div>
                    </div>
                    <div className='col-10 profileName pt-5 align-items-center'>
                        <div className='row'>
                            
                        { !editingMode? 
                                <div className='col'>

                                    <h1> {profile.firstName} {profile.lastName}</h1> 
                                </div>  :

                                <>
                                     <div className="form-floating form">
                                         <input type="text" className="form-control" id="post" placeholder="text" defaultValue={profile.firstName}  onChange={(e)=>{setFirstName(e.target.value)}}/>
                                        <label htmlFor="post">First Name </label>
                                     </div>
                                     <div className="form-floating form">
                                         <input type="text" className="form-control" id="post" placeholder="text" defaultValue={profile.lastName}  onChange={(e)=>{setLastName(e.target.value)}}/>
                                        <label htmlFor="post">Last Name</label>
                                     </div>
                                </>
                                     }
                            
                        </div>

                        <div className='row'>
                            { !editingMode? 
                                <p>{profile.nickname}</p>:
                                
                                <div className="form-floating form">

                                            <input type="text" className="form-control" id="post" placeholder="text" defaultValue={profile.nickname}  onChange={(e)=>{setNickname(e.target.value)}}/>
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
                                            <div className="form-floating form">
                                                <input type="text" className="form-control" id="post" placeholder="text" defaultValue={profile.intro}  onChange={(e)=>{setIntro(e.target.value)}}/>
                                                <label htmlFor="post">Intro</label>
                                            </div>
                                        }

                                        { !editingMode?  <p>{profile.status}</p>:
                                            <div className="form-floating form">
                                                <input type="text" className="form-control" id="post" placeholder="text" defaultValue={profile.status}  onChange={(e)=>{setStatus(e.target.value)}}/>
                                                <label htmlFor="post">Status</label>
                                            </div>
                                        }
                                        
                                        
                                        { !editingMode? <p>{profile.birthday}</p>:
                                            <div className="form-floating mb-3 form">
                                                <input type="date" className="form-control" id="birthday" placeholder="date" defaultValue={profile.birthday} onChange={(e)=>{setBirthday(e.target.value)}}/>
                                                <label htmlFor="birthday">Birthday</label>
                                            </div>
                                        }
                                        { !editingMode? <p>{profile.city}</p>:
                                            <div className="form-floating form">
                                                <input type="text" className="form-control" id="post" placeholder="text" defaultValue={profile.city}  onChange={(e)=>{setCityChange(e.target.value)}}/>
                                                <label htmlFor="post">City</label>
                                            </div>
                                        }
                                        
                                      
                                        {!editingMode?
                                         <button onClick={editHandler}><h1>Edit Details</h1></button>:
                                         <>
                                            <button onClick={doneEditHandler}><h1>Cancel Edit</h1></button>
                                            <button onClick={saveEditHandler}><h1>Save Edit</h1></button>
                                         </>
                                         }
                                    </div>
                                </div>
                            </div>
                            <div className='col-7 newsFeed'>
                                <div className='row'>
                                    <ProfileFeedSettings userid={`${userid}`} />
                                   
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        


    </>

    
  )
}

export default IndividualProfile