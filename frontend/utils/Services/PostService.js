import axios from "../axios";
import axiosUpload from "../axiosUpload";

export async function getProfilePosts(id) {
  const { data } = await axios.get("post/getProfilePosts", {params: { id }});
  return data;
}

export async function getTimeLinePosts({page = 1, id}) {
  const { data } = await axios.get("post/getTimeLinePosts", { params: { page, id } });
  return data;
}

export async function getCoursePosts({page = 1, course_id}) {
  const { data } = await axios.get("post/getCoursePosts", { params: { page, course_id } });
  return data;
}

export async function getFavoritePosts({page = 1, id}) {
  const { data } = await axios.get("post/getFavoritePosts", { params: { page, id } });
  return data;
}

export async function createPost(request) {
  const { data } = await axiosUpload.post("post/create", request);
  return data;
}

export async function updatePost(request) {
  const { data } = await axios.put("post/update", request);
  return data;
}

export async function deletePost(request) {
  const { data } = await axios.post("post/delete", request);
  return data;
}




