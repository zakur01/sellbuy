import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { addPost } from "../../actions/post";
import Spinner from "../layout/spinner";
import history from '../../history';


const PostForm = ({ addPost }) => {
  const [text, setText] = useState(" ");

  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");
  

  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "j97xzaqe");
    setLoading(true);

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dtoxn56sf/image/upload",
      {
        method: "POST",
        body: data,
      }
    );

    const file = await res.json();
    console.log(file);

    setImage(file.secure_url);
    setLoading(false);
  };

  
 
  return (
    <div className="post-form">
      <div >
        <h3 className="text-light">Новое объявление: </h3>
      </div>
      <form
        
        onSubmit={(e) => {
          e.preventDefault();
          addPost({ text, image });
          setText("");
        }}
      >
        <div className="form__group">
        <textarea
          
          name="text"
          cols="30"
          rows="5"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        >
          
        </textarea>
        <br></br>
        <br></br>
        <input
          type="file"
          name="image"
          placeholder="Добавить изображение"
          onChange={uploadImage}
        />

        <br></br>
        <br></br>
          <input type="submit" className="btn btn-primary my-1" value="Отправить" />
          </div>
        
        {/* {loading ? (
          <Spinner />
        ) : (
          <img src={image} style={{ width: "400px" }} />
        )} */}
      </form>
    </div>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
};

export default connect(null, { addPost })(PostForm);
