import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/auth";

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    login(email, password);
    console.log(formData)
  };

  if (isAuthenticated) {
    return <Redirect to="/posts" />
  }

  return (
    <Fragment>
      {/* <div className="dark-overlay"> */}
      <h1 className="large text-primary">Войти</h1>
      
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="form__group"> 
        <input
            className="form__field"
            type="email"
            name="email"
            id="email"
            placeholder="Почта"
            required
            onChange={onChange}
          />
          <label className="form__label">Почта</label>
        </div>
        <div className="form__group">
        <input
            className="form__field"
          type="password"
            id="password"
            placeholder="Пароль"
            onChange={onChange}
            name="password"
          />
          <label for="password" className="form__label">Пароль</label>
        </div>
        <input type="submit" className="btn btn-primary" value="Войти" />
      </form>
      <p className="my-1">
        Нет аккаунта? <Link to="/register">Зарегистрироваться</Link>
      </p>
      {/* </div> */}
    </Fragment>
  );
};

login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { login })(Login);
 