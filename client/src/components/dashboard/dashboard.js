import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profile";
import Spinner from "../layout/spinner";
import { Link } from 'react-router-dom';
import DashboardActions from './dashboard-actions'

const Dashboard = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-primary">Профиль</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Здравствуйте {user && user.name}
      </p>
      {profile !== null ? (
          <Fragment>
            <DashboardActions />
        </Fragment>)
       : 
        (<Fragment>
          <p>
            Вы ещё не создали профиль, пожалуйста добавьте контактную информацию
          </p>
          <Link to="/create-profile" className="btn btn-primary my-1">
            Создать профиль
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
