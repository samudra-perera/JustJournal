import React from 'react'
import FollowerCard from './FollowerCard'

const UserFollowProfileCard = (props) => {
    let following, follower
    const {follDash} = props
    console.log(follDash)
    // if(follDash.followers) {
    //     follDash = follDash.follower
    // } else {
    //     follDash = follDash.following
    // }
  return (
    <div>
        <FollowerCard />
    </div>
  )
}

export default UserFollowProfileCard