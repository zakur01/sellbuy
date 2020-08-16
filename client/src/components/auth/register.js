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
      <form  onSubmit={(e) => onSubmit(e)}>
        <div className="form__group">
          <input
            className="form__field"
            type="text"
            name="name"
            id="name"
            placeholder="Юзернейм"
            onChange={(e) => onChange(e)}
            value={name}
            required
            autoComplete="on"
          />
          <label className="form__label">Юзернейм</label>
        </div>
        <div className="form__group">
          <input
            className="form__field"
            type="email"
            name="email"
            placeholder="Почта"
            onChange={(e) => onChange(e)}
            value={email}
            required
            autoComplete="on"
          />
          <label className="form__label">Почта</label>
        </div>
        <div className="form__group">
          <input
            className="form__field"
            type="password"
            name="password"
            placeholder="Пароль"
            onChange={(e) => onChange(e)}
            value={password}
            minLength="6"
            required
            autoComplete="on"
          />
        <label className="form__label">Пароль</label>
        </div>
        <div className="form__group">
          <input
            className="form__field"
            type="password"
            name="password2"
            placeholder="Повторите пароль"
            onChange={(e) => onChange(e)}
            value={password2}
            minLength="6"
            required
            autoComplete="on"
          />
          <label className="form__label">Пароль</label>
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
