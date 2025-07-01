import axios from "../axios";

export async function likePost(request) {
    const { data } = await axios.post("postLike/set", request);
    return data;
}

export async function unlikePost(request) {
    const { data } = await axios.post("postLike/unset", request);
    return data;
}

export async function getLikeCount(request) {
    const { data } = await axios.get("postLike/getCount", { params: request });
    return data;
}
