import axios from "axios";
import { AUTH_URL } from "../../../constants/constants";
import { AuthUser } from "../../../interfaces/AuthInterface";

const API = axios.create({
  baseURL: "http://localhost:5000/",
});

// *************************** Auth *************************** //
// register
const register = async (formData: AuthUser) => {
  const response = await axios.post(`${AUTH_URL}/register`, formData);
  console.log("response.data", response.data);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

// login
const login = async (formData: AuthUser) => {
  const response = await axios.post(`${AUTH_URL}/login`, formData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

// logout
const logout = () => {
  localStorage.removeItem("user");
};

// *************************** User *************************** //
// get user profile
const getProfile = async (id: string, token: string) => {
  const response = await API.get(`/api/v1/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// follow a user
const followUser = async (followId: string, token: string) => {
  const response = await API.put(
    `/api/v1/users/follow`,
    {
      userId: followId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

// unfollow a user
const unfollowUser = async (unfollowId: string, token: string) => {
  const response = await API.put(
    `/api/v1/users/unfollow`,
    {
      userId: unfollowId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

// update user profile
const updateUserProfile = async (userId: string, token: string) => {
  const response = await API.put(`/api/v1/users/update`, userId, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const authServices = {
  register,
  login,
  logout,
  getProfile,
  followUser,
  unfollowUser,
  updateUserProfile,
};

export default authServices;
