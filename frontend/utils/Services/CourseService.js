import axios from "../axios";

export async function followCourse(request) {
    const { data } = await axios.post("course/follow", request);
    return data;
}

export async function unfollowCourse(request) {
    const { data } = await axios.post("course/unfollow", request);
    return data;
}

export async function verifyFollowedCourse(request) {
    const { data } = await axios.post("course/verifyFollowed", request);
    return data;
}

export async function getFollowingCourses(request) {
    const { data } = await axios.post("course/getFollowingCourses", request);
    return data;
}