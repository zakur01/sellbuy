import React, { Fragment, useEffect } from "react";
import { Link } from 'react-router-dom'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPosts } from "../../actions/post";
import Spinner from "../layout/spinner";
import PostItem from './postItem'
import PostForm from './postForm'

const Posts = ({ getPosts, post: { posts, loading } }) => {
  useEffect(() => {
    getPosts();
  });

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-primary">Объявления</h1>
      <p className="lead">
        <i className="fas fas-user"></i>
      </p>
      <Link to="/newpost" className="btn btn-success my-2 btn:hover">Создать объявление</Link>
      {/* <PostForm /> */}
        <div className='posts'>
        {posts.map(post => (
            <PostItem key={post._id} post={post} />
        ))}
            
            
                  
      </div>
    </Fragment>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post
});

export default connect(mapStateToProps, { getPosts })(Posts);
