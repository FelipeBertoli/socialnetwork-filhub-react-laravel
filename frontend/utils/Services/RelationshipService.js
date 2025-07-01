import axios from "../axios";

export async function getFollowers(id) {
  const { data } = await axios.get("relationship/getFollowers", {params: { id }});
  return data;
}

export async function getFollowed(id) {
  const { data } = await axios.get("relationship/getFollowed", {params: { id }});
  return data;
}

export async function getFollowersCount(id) {
  const { data } = await axios.get("relationship/getFollowersCount", {params: { id }});
  return data;
}

export async function getFollowedCount(id) {
  const { data } = await axios.get("relationship/getFollowedCount", {params: { id }});
  return data;
}

export async function getSuggestUsers(id) {
  const { data } = await axios.get("relationship/getSuggestUsers", {params: { id }});
  return data;
}

export async function getPendentFollowers(id) {
  const { data } = await axios.get("relationship/getPendentFollowers", {params: { id}});
  return data;
}

export async function searchUsers({id, query}) {
  const { data } = await axios.get("relationship/searchUsers", {params: { id, query }});
  return data;
}

export async function verifyFollowership(request) {
  const { data } = await axios.post("relationship/verifyFollowership", request);
  return data;
}

export async function followUser(request) {
  const response = await axios.post("relationship/followUser", request);
  return response.data;
}

export async function unfollowUser(request) {
  const response = await axios.post("relationship/unfollowUser", request);
  return response.data;
}

export async function removeFollower(request) {
  const response = await axios.post("relationship/removeFollower", request);
  return response.data;
}