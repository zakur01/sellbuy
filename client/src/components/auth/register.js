import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";
import PropTypes from "prop-types";

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("Неверный пароль", "danger");
    } else {
      register({ name, email, password });
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />
  }

  return (
    <Fragment>
      <h1 className="large text-primary"> Регистрация </h1>
      <p className="lead">
        <i className="fas fa-user"></i>
      </p>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            name="name"
            placeholder="Имя пользователя"
            onChange={(e) => onChange(e)}
            value={name}
            required
            autoComplete="on"
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder="Почта"
            onChange={(e) => onChange(e)}
            value={email}
            required
            autoComplete="on"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password"
            placeholder="Пароль"
            onChange={(e) => onChange(e)}
            value={password}
            minLength="6"
            required
            autoComplete="on"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password2"
            placeholder="Повторите пароль"
            onChange={(e) => onChange(e)}
            value={password2}
            minLength="6"
            required
            autoComplete="on"
          />
        </div>
        <input
          type="submit"
          className="btn btn-primary"
          placeholder="Зарегистрироваться"
          value="Зарегистрироваться"
        />
      </form>
      <p className="my-1">
        Зарегистрированы? <Link to="/login">Войти</Link>
      </p>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});



export default connect(mapStateToProps, { setAlert, register })(Register);
