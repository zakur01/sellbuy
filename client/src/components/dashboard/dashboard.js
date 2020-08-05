import React, { useEffect, Fragment, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profile";
import Spinner from "../layout/spinner";
import { Link } from 'react-router-dom';
import DashboardActions from './dashboard-actions'

const Dashboard = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading},
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);



  // const [avatar, setAvatar] = useState("");
  // const changeAvatar = async e => {
  //   const files = e.target.files;
  //   const data = new FormData();
  //   data.append("file", files[0]);
  //   data.append("upload_preset", "j97xzaqe");

  //   const res = await fetch(
  //     "https://api.cloudinary.com/v1_1/dtoxn56sf/image/upload",
  //     {
  //       method: "POST",
  //       body: data,
  //     }
  //   );
  //   const file = await res.json();
  //   console.log(file);

  //   setAvatar(file.secure_url);

  //  ;
  // }

 

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-primary">Профиль</h1>
      <img className="image round-img"src={profile.user.avatar}></img>
      <p className="lead">
         {user && user.name}
      </p>
      {profile !== null ? (
          <Fragment>
            <DashboardActions />
        </Fragment>)
       : 
        (<Fragment>
          <p>
            Пожалуйста добавьте контактную информацию
          </p>
          <Link to="/create-profile" className="btn btn-primary my-1">
            Добавить
          </Link>
        </Fragment>)
      }
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
