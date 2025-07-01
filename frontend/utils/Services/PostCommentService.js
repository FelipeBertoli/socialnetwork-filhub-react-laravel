import axios from "../axios";

export async function getPostComments(postId) {
    const { data } = await axios.get("postComment/getPostComments", {params: { postId}});
    return data;
}

export async function getCommentsCount(request) {
    const { data } = await axios.get("postComment/getCommentsCount", { params: request });
    return data;
}

export async function setComment(request) {
    const { data } = await axios.post("postComment/set", request);
    return data;
}

export async function deleteComment(request) {
    const { data } = await axios.post("postComment/delete", request);
    return data;
}