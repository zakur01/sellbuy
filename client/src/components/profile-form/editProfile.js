import React, { useState, Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../actions/profile';

const EditProfile = ({
  profile: { profile, loading },
  createProfile,
  getCurrentProfile,
}) => {
  const [formData, setFormData] = useState({
    location: ' ',
    contacts: ' ',
  });
  const [image, setImage] = useState('');
  const [loadingg, setLoading] = useState(false);
  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'j97xzaqe');
    setLoading(true);

    const res = await fetch(
      'https://api.cloudinary.com/v1_1/dtoxn56sf/image/upload',
      {
        method: 'POST',
        body: data,
      }
    );

    const file = await res.json();
    console.log(file);

    setImage(file.secure_url);
    setLoading(false);
  };

  useEffect(() => {
    getCurrentProfile();

    setFormData({
      location: loading || !profile.location ? ' ' : profile.location,
      contacts: loading || !profile.contacts ? ' ' : profile.contacts,
    });
  }, [profile.location, profile.contacts, loading, getCurrentProfile]);

  const { location, contacts } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    createProfile(formData, true);
  };
  return (
    <Fragment>
      <h1 className="large text-primary">Редактировать профиль</h1>{' '}
      <h2>Сменить аватар</h2>
      <img src={image}></img>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <input
          type="file"
          name="image"
          placeholder="Добавить изображение"
          onChange={uploadImage}
        />
        <div className="form-group">
          Месторасположение:
          <input
            type="text"
            placeholder="Город"
            name="location"
            value={location}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          Контактные данные:
          <input
            type="text"
            placeholder="Контактные данные"
            name="contacts"
            value={contacts}
            onChange={(e) => onChange(e)}
          />
        </div>
        <input
          type="submit"
          value="Отправить"
          className="btn btn-primary my-1"
        />
      </form>{' '}
      <Link className="btn btn-light my-1" to="/dashboard">
        Назад
      </Link>
    </Fragment>
  );
};

EditProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  EditProfile
);
