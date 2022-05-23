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
                            <div className="form-floating mb-3 form input-group">
                                <input type="text" style={{marginBottom:'0'}} className="form-control" id="searchPage" placeholder="name" onChange={(e)=>{setSearch(e.target.value)}} />
                                <label htmlFor="searchPage">Search someone</label>
                                <button onClick={searchHandler}><i className="bi bi-search"></i></button>
                            </div>
                        </div>
                        {profiles.map((profile,index)=> (
                                <Fade>
                                    <div className='col-4'>
                                        <div className='row searchTile' key={index}>
                                            <div className='col-3 image'>
                                                {/* container ng image sa future */}
                                                <img src={profile.picpath} alt="avatar" style={{width:"100px",height:"100px",objectFit:"cover",borderRadius:"500px"}}/>
                                            </div>
                                            <div className='col-9 detail d-flex align-items-center'>
                                                <h1>
                                                    <Link to={`/profile/${currentuserid}/${profile.userid}`}>{profile.firstName} {profile.lastName}</Link> <br/>
                                                    <small className='text-muted'>from {profile.city} </small>
                                                </h1>
                                            </div>
                                        </div>
                                    </div>
                                </Fade>
                            ))
                        }
                    </div>
                </div>
            </section>
            
        </>
        
    )
}

export default SearchPage