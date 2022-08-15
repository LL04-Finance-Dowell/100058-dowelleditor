import * as api from "../api/index.js"

export const createDocument = (post) => async (dispatch) => {
    try {
        const { data } = await api.createPost(post);
        dispatch({ type: CREATE, payload: data });

    } catch (error) {
        console.log(error);
    }
}