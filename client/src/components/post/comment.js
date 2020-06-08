import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addComment } from "../../actions/post";
 

const Comment = ({ postId, addComment}) => {
const [text, setText] = useState('')
  return (
    <div className="post-form">
         <div className="bg-primary p">
           <h3>Оставьте комментарий </h3>
         </div>
         <form
           className="form my-1"
           onSubmit={(e) => {
             e.preventDefault();
             addComment(postId, { text });
             setText("");
           }}
         >
           <textarea
             name="text"
             cols="30"
             rows="5"
             placeholder="Текст комментария"
             value={text}
             onChange={(e) => setText(e.target.value)}
             required
           >
             {" "}
           </textarea>
           <input type="submit" className="btn btn-dark my-1" value="Отправить" />
         </form>
       </div>
  );
};

Comment.propTypes = {
    addComment: PropTypes.func.isRequired,
}
;

export default connect(null, { addComment })(Comment);
