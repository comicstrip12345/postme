import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import NavbarLoggedIn from './NavbarLoggedIn'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { Link } from 'react-router-dom';
import { Fade } from 'react-reveal';

const SearchPage = () => {

    const {currentuserid} = useParams();
    const [search,setSearch] = useState();
    const [profiles,setProfiles]=useState([]);

    const searchHandler = () => {
        axios.post("https://serserserver.herokuapp.com/search",{
            search:search,
        }).then((response)=> {
            console.log(response);

            if(response.status===200){
                setProfiles(response["data"]["result"])
            } 
        })
        console.log(`${search}`)
    }

    return (
        <>
            <NavbarLoggedIn
                link={currentuserid}
            />
            <section className='searchPage'>
                <div className='container'>
                    <div className='row pt-5'>
                        <div className="col-12">
                            <div className="form-floating mb-3 form">
                                <button onClick={searchHandler}><i className="bi bi-search"></i></button>
                                <input type="text" className="form-control" id="searchPage" placeholder="name" onChange={(e)=>{setSearch(e.target.value)}} />
                                <label htmlFor="searchPage">Search your friend</label>
                            </div>
                            <div className='col-6'>
                                {profiles.map((profile,index)=> (
                                        <Fade>
                                            <div className='row' key={index}>
                                                <div className='col-2 image'>
                                                    {/* container ng image sa future */}
                                                    <img src="https://e7.pngegg.com/pngimages/505/761/png-clipart-login-computer-icons-avatar-icon-monochrome-black-thumbnail.png" alt="avatar"/>
                                                </div>
                                                <div className='col-10 detail d-flex align-items-center'>
                                                    <h1>
                                                        <Link to={`/profile/${currentuserid}/${profile.userid}`}>{profile.firstName} {profile.lastName}</Link> <br/>
                                                        <small className='text-muted'>from {profile.city} </small>
                                                    </h1>
                                                </div>
                                            </div>
                                        </Fade>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
        </>
        
    )
}

export default SearchPage