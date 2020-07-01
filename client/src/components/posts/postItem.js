import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { connect } from "react-redux";
import auth from "../../reducers/auth";
import { deletePost } from "../../actions/post";

const postItem = ({
  auth,
  post: { _id, text, image, name, avatar, user, comment, date },
  deletePost,
  showActions,
}) => (
  <div className="post bg-white p-1 my-1">
    <div>
      <a href={`/profile/${user}`}>
        {/* <img className="round-img" src={avatar} alt="" /> */}
        <h4>{name} </h4>
      </a>
    </div>
    <container>
      <p className="my-1">{text}</p>
      <img className="image2" src={image}/>
      <p className="post-date">
        <Moment format="DD/MM/YYYY">{date}</Moment>
      </p>

      {showActions && (
        <Fragment>
          <Link to={`/posts/${_id}`} className="btn btn-primary">
            Подробнее {/* {comment.length} */}
          </Link>
          {!auth.loading && user === auth.user._id && (
            <button
              onClick={(e) => deletePost(_id)}
              type="button"
              className="btn btn-danger"
            >
              <i className="fas fa-times"></i>
            </button>
          )}
        </Fragment>
      )}
    </container>
  </div>
);

postItem.defaultProps = {
  showActions: true
}

postItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { deletePost })(postItem);