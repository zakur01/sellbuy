import React from 'react'
import PropTypes from 'prop-types'

const profileTop = ({ profile: {
    contacts,
    location,
    avatar,
    user
}}) => {
    return (
      <div class="profile-top bg-primary p-2">
        <img
          class="round-img my-1"
          src={user.avatar}
          alt=""
        />
            <h1 class="large">{user.name}</h1>

            <p>{location}</p>
            <p>{contacts}</p>
       
      </div>  
    );
}

profileTop.propTypes = {
    profile: PropTypes.object.isRequired,
}

export default profileTop
