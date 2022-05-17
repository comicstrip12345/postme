import React from 'react'

const ProfileFeedPost = () => {
    return (
        <div className='col-12 post'>
            <div className='row'>
                <div className='col-2'>
                    <div className='profImage'>

                    </div>
                </div>
                <div className='col-10 postName d-flex align-items-center'>
                    <h1>
                        Adriano Sabanal Jr.
                        <p>4hrs.</p>
                    </h1>
                </div>
                <div className='col-12 postContent'>
                    <p>Good Morning Everyone :)</p>
                </div>
                <div className='col-12 postMenu'>
                    <div className='row'>
                        <div className='col-6'>
                            <p><a href='#/'>Like</a></p>
                        </div>
                        <div className='col-6'>
                            <p><a href='#/'>Comment</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileFeedPost