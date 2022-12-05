import React from 'react'
import FollowerCard from './FollowerCard'

const UserFollowProfileCard = (props) => {
    //follDash will either be a follower or a following array of userIDs
    const {follDash} = props
  return (
    //Return a map of follower Cards... the follower card will get the user Data and display
    //follDash is waiting for the API response display the spinner else display the list of followers
    <div>
        {
            follDash ? follDash.map((user) => <FollowerCard user={user} />) : <p>Spinner</p>
        }
    </div>
  )
}

export default UserFollowProfileCard