import { getToken, setToken } from "./TokenService";
import axios from "../axios";

export async function register(registerInfo) {
  const { data } = await axios.post("user/register", registerInfo);
  await setToken(data.token);
}

export async function updateProfile(updateInfo) {
  try {
    const response = await axios.put("user/updateProfile", updateInfo);
    return response.data;
  } catch (e) {
    console.log("Erro ao atualizar usuário:", e.response);
  }
}

export async function sendNewEmail(email) {
  const response = await axios.post("user/sendNewEmail", email);
  return response.data;
}

export async function updatePassword(password) {
  const response = await axios.put("user/updatePassword", password);
  return response.data;
}

export async function sendNewPassword(email) {
  const response = await axios.post("user/sendNewPassword", email);
  return response.data;
}

export async function deleteUser(id) {
  const response = await axios.put("user/deleteUser", id);
  return response.data;
}

export async function login(credentials) {
  const { data } = await axios.post("user/login", credentials);
  await setToken(data.token);
}

export async function loadUser() {
  const { data } = await axios.get("user/load");
  return data;
}

export async function getUserById(id) {
  const { data } = await axios.get(`user/getUserById/${id}`);
  return data;
}

export async function logout() {
  try {
    await axios.post("user/logout");
  } catch (e) {
    console.log("Erro ao sair do sistema");
  }
  await setToken(null);
}

export async function loadCourses() {
  const { data } = await axios.get("getCourses");
  return data;
}