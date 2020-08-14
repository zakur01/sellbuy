import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Spinner from '../layout/spinner'
import { getPost } from '../../actions/post'
import PostItem from '../posts/postItem'
import { Link } from 'react-router-dom'
import Comment from './comment'
import CommentItem from './commentItem'

const Post = ({ auth, getPost, post: { post, loading },  match }) => {
    useEffect(()=>{
        getPost(match.params.id);
    }, [getPost, match.params.id])


    return loading || post === null ? (<Spinner />) : 
        <Fragment>
    <Link to='/posts' className="btn">
        Обратно
    </Link>
            <PostItem post={post} showActions={false} />
            <div>
                {post.user.name}
            </div>
        <div className="comments">
            <h1>Комментарии: </h1>
        {post.comments.reverse().map((comment) => (
            <CommentItem key={comment._id} comment={comment} postId={post._id}/>
            ))}
            </div>
        
            {auth.user !== null &&   <Comment postId={post._id} />}
    </Fragment>
}
 Post.propTypes = {
    getPost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
     profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    post: state.post,
    auth: state.auth
})

export default connect(mapStateToProps, { getPost })(Post)
  