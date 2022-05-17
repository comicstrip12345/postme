import React from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css'

const ProfileFeedSettings = () => {
    return (
        <div className='col-12 feed'>
            <div className='row'>
                <div className='col-2'>
                    <div className='profImage'>

                    </div>
                </div>
                <div className='col-10 postInput'>
                    <div className="form-floating form">
                        <i class="bi bi-send"></i>
                        <input type="text" className="form-control" id="post" placeholder="text"/>
                        <label htmlFor="post">Post Something..........</label>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileFeedSettings