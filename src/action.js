export const onDelete = (id) => dispatch => {
    dispatch({
        type: 'ONDELETE',
        payload: id
    })
}

export const newPost = (createPost) => dispatch => {
    dispatch({
        type: 'NEW_POST',
        payload: createPost
    })
}