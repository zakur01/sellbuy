import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Spinner from '../layout/spinner'
import { getPost } from '../../actions/post'
import PostItem from '../posts/postItem'

const Post = ({ getPost, post: { post, loading }, match }) => {
    useEffect(()=>{
        getPost(match.params.id);
    }, [getPost()])

    return loading || post === null ? <Spinner /> : 
    <Fragment>
        <PostItem/>
    </Fragment>
}
 Post.propTypes = {
    getPost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    post: state.post
})

export default connect(mapStateToProps, { getPost })(Post)
 