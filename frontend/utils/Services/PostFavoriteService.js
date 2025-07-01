import axios from "../axios";

export async function favoritePost(request) {
    const { data } = await axios.post("postFavorite/set", request);
    return data;
}

export async function unfavoritePost(request) {
    const { data } = await axios.post("postFavorite/unset", request);
    return data;
}
