import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const MainPage = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to="/posts" />
  }
  return ( 
    <div className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-larger">SELLBUY</h1>
          <p className="lead">портал для объявлений</p>
          <div className="buttons">
             
            
            
            <Link to="/register" className="btn btn-primary">
              Зарегистрироваться
            </Link>
            <Link to="login" className="btn btn-primary">
              Логин
            </Link>
            <br></br>
            <br></br>
            <br></br>
            <Link  to="/posts" className="main-btn">
                Список объявлений
              </Link>
              <br/>
              <br/>
           
          </div>
        </div>
      </div>
     </div>
  );
};
MainPage.propTypes = {
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})
export default connect(mapStateToProps)(MainPage)