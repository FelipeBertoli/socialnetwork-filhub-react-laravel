import axios from "../axios";

export async function likeComment(request) {
    const { data } = await axios.post("commentLike/set", request);
    return data;
}

export async function unlikeComment(request) {
    const { data } = await axios.post("commentLike/unset", request);
    return data;
}

export async function getCommentLikeCount(request) {
    const { data } = await axios.get("commentLike/getCount", { params: request });
    return data;
}
