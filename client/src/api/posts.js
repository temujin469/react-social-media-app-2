import baseUrl from "utils/axios";

export const getAllPost = async ({ token }) => {
  const res = await baseUrl.get(`/posts`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data.data;
};

export const getUserAllPost = async ({ userId, token }) => {
  const res = await baseUrl.get(`/posts/${userId}/posts`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data.data;
};

export const getFriendsPost = async ({ token }) => {
  const res = await baseUrl.get(`/posts/friends`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data.data;
};

export const getPost = async ({ postId, token }) => {
  const res = await baseUrl.get(`/posts/${postId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data.data;
};

export const patchLike = async ({ postId, token }) => {
  const res = await baseUrl.patch(`/posts/${postId}/like`, null, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data.data;
};

export const getLikeUser = async ({ postId, token }) => {
  const res = await baseUrl.get(`/posts/${postId}/like`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data.data;
};
