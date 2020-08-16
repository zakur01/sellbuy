import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addComment } from "../../actions/post";
 

const Comment = ({ postId, addComment}) => {

const [text, setText] = useState('')
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
        
         <form
           
           onSubmit={(e) => {
             e.preventDefault();
             addComment(postId, { text, image });
             setText("");
           }}
           >
           <div className="form__group">
          <textarea
            
             name="text"
             cols="30"
             rows="5"
             placeholder="Добавьте комментарий..."
             value={text}
             onChange={(e) => setText(e.target.value)}
             required
           >
             {" "}
          </textarea>
          <br></br>
          <input type="file" name="image" onChange={uploadImage}></input>
          <br></br>
           <input type="submit" className="btn btn-primary my-2" value="Добавить" />
        </div>
        </form>
       </div>
  );
};

Comment.propTypes = {
    addComment: PropTypes.func.isRequired,
}
;

export default connect(null, { addComment })(Comment);
