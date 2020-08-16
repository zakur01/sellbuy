import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { deleteComment } from '../../actions/post'

const commentItem = ({
  auth,
  postId,
  deleteComment,
  comment: { _id, avatar, text, image, name, user, date }
}) => (
    <div className="post bg-white p-1 my-1">
      
    <div >
      <Link to={`/profile/${user}`}>
        {/* <img className="round-img" src={avatar} alt="" /> */}
          <img className="round-img" width="200px" height="auto" src={avatar} />
        <h4>{name}</h4>
      </Link>
    </div>
          <container>
      <p className="my-1">{text}</p>
      <img className="inner-img" src={image}/>
      <p className="post-date">
         <Moment format="YYYY/MM/DD">{date}</Moment>
      </p>
      {auth.user && !auth.loading && user === auth.user._id && (
        <button
          onClick={e => deleteComment(postId, _id)}
          type="button"
          className="btn btn-danger"
        >
          <i className="fas fa-times" />
        </button>
          )}
          </container>
  </div>
);

commentItem.propTypes = {
  postId: PropTypes.string.isRequired,
  comments: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired,
  avatar: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { deleteComment })(commentItem);
