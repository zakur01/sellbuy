import React from 'react'
import {  Link } from 'react-router-dom'

const DashboardActions = () => {
  return (
    <div className="profile-margin">
      <Link to="/edit-profile" className="btn btn-primary my-1">
        Настройки
      </Link>
    </div>
  );
};

export default DashboardActions;