import React from 'react'
import PropTypes from 'prop-types'

const profileTop = ({ profile: {
    contacts,
    location,
    user: {
        name,
        avatar
    }
}}) => {
    return (
      <div class="profile-top bg-primary p-2">
        <img
          class="round-img my-1"
          src={avatar}
          alt=""
        />
            <h1 class="large">{name}</h1>

            <p>{location}</p>
            <p>{contacts}</p>
       
      </div>
    );
}

profileTop.propTypes = {
    profile: PropTypes.object.isRequired,
}

export default profileTop
