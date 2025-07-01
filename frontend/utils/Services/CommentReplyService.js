import axios from "../axios";

export async function getCommentReplies(commentId) {
    const { data } = await axios.get("commentReply/getCommentReplies", {params: { commentId }});
    return data;
}

export async function replyComment(request) {
    const { data } = await axios.post("commentReply/set", request);
    return data;
}

export async function deleteReply(request) {
    const { data } = await axios.post("commentReply/delete", request);
    return data;
}