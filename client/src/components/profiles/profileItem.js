import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const profileItem = ({ profile: {
    user: { _id, name, avatar },
    contacts,
    location
} }) => {
    return (
      <div className="profile bg-light">
        <img src={avatar} alt="" className="round-img" />
        <div>
          <h2>{name}</h2>
          <p>{location && <span>{location}</span>}</p>
                <p>{contacts}</p>
                <Link to={`/profile/${_id}`} className="btn btn-primary">
                    Просмотреть профиль
                </Link>
        </div>
      </div>
    );
}

profileItem.propTypes = {
profile: PropTypes.object.isRequired,
}

export default profileItem
 