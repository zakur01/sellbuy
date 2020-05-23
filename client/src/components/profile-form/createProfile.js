import React, { useState, Fragment } from "react";
import { Link, withRouter } from 'react-router-dom'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createProfile} from '../../actions/profile'

const CreateProfile = ({ createProfile, history }) => {
  const [formData, setFormData] = useState({
    location: "",
    contacts: ""
  });
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
      e.preventDefault();
      createProfile(formData, history);
  };

  const { location, contacts } = formData;

  return (
    <Fragment>
      <h1 className="large text-primary">Редактировать профиль</h1>{" "}
      <form className="form" onSubmit={e => onSubmit(e) }>
        <div className="form-group">
          <input
            type="text"
            placeholder="Город"
            name="location"
            value={location}
            onChange={onChange}
          />{" "}
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Contacts   "
            name="contacts"
            value={contacts}
            onChange={onChange}
          />{" "}
        </div>
      <input type="submit" className="btn btn-primary my-1" />
      </form>{" "}
      <Link className="btn btn-light my-1" to="/dashboard">
        Go Back
      </Link>
    </Fragment>
  );
};

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired
  
};
export default connect(null, { createProfile })(withRouter(CreateProfile))
