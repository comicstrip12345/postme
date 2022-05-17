import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';

const SearchPage = () => {

    const {userid} = useParams();
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
    <div className='container p-5'>
        <h1 className='h1 text-center'>Search</h1>

            <div className='row justify-content-center pt-5'>
                <div className="col-4 form-floating mb-3 form">
                    <input type="text" className="form-control" id="floatingFirstName" placeholder="name" onChange={(e)=>{setSearch(e.target.value)}} />

                    <label htmlFor="floatingFirstName">Search your friend</label>
                </div>

                
            </div>

            <div className='submit pb-5'>
                <div className='row justify-content-center'>
                    <div className='col-3'>
                        <input type="submit" onClick={searchHandler}/>
                    </div>
                </div>
            </div>

            <h1 className='h1 text-center'>Result</h1>

                {
                    profiles.map((profile,index)=> (
                        <div className='container' key={index}>
                            <div className='row justify-content-center'>
                                <div className='col-3'>
                                    {/* container ng image sa future */}
                                    <img src="https://e7.pngegg.com/pngimages/505/761/png-clipart-login-computer-icons-avatar-icon-monochrome-black-thumbnail.png" alt="avatar" style={{width:"50px"}}></img>
                                </div>

                                <div className='col-9'>
                                    <div className='row text-start'>     
                                        {profile.firstName} {profile.lastName} 
                                    </div>
                                    <div className='row text-start'>     
                                        <small className='text-muted'>from {profile.city} </small>
                                    </div>
                                    
                                </div>
                            </div>

                           

                        </div>
                    )

                       

                    )
                }
               





    </div>


  )
}

export default SearchPage