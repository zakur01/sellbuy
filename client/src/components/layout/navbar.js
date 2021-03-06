import React, { Fragment } from 'react'
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({ auth: { isAuthenticated, loading }, logout, noshow }) => {
 
  
  const authLinks = (
    <ul>
     <li>
        <Link to="/posts">
          Объявления
        </Link> 
      </li>
      
      <li>
        <Link to="/dashboard">
          <i className="fas fa-user"></i>{" "}
          <span className="hide-sm">Профиль</span>
        </Link>
      </li>
      <li>
        <a onClick={logout} href="/">
          <i className="fas fa-sign-out-alt"></i>{" "}
          <span className="hide-sm">Выйти</span>
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
      <ul>
       
          <li>
            <Link to="/register">Регистрация</Link>
          </li>
          <li>
            <Link to="/login">Войти</Link>
          </li>
          <li></li>
        </ul>
  );


    return (
      <nav className="navbar bg-dark">
        {/* <h1> */}
          {/* <Link to="/"> */}
            {/* <i className="fas fa-hands-helping"></i> 1488          </Link> */}
        {/* </h1> */}
        {!loading && (<Fragment>
          {isAuthenticated ? authLinks : guestLinks}
        </Fragment>)}
      </nav>
    );
}

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  noshow: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar)