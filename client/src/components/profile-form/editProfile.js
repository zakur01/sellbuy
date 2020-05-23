import React, { useState, Fragment, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createProfile, getCurrentProfile } from "../../actions/profile";

const EditProfile = ({ profile: { profile, loading }, createProfile, getCurrentProfile, history }) => {
  const [formData, setFormData] = useState({
    location: " ",
    contacts: " "
  });

  useEffect(() => {
    getCurrentProfile();

    setFormData({
      location: loading || !profile.location ? ' ' : profile.location
      
    });
  }, [loading]);

  const {
    location,
    contacts
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    createProfile(formData, history, true);
  };
  return (
    <Fragment>
      <h1 className="large text-primary">Редактировать профиль</h1>{" "}
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Город"
            name="location"
            value={location}
            onChange={e => onChange(e)}
          />{" "}
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Contacts   "
            name="contacts"
            value={contacts}
            onChange={e => onChange(e)}
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

EditProfile.propTypes = {
  EditProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  withRouter(EditProfile)
);
