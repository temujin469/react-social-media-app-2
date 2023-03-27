import baseUrl from "utils/axios";

export const getAllPost = async () => {
  const res = await baseUrl.get(`/posts`);
  return res.data.data;
};

export const getUserAllPost = async ({ userId }) => {
  const res = await baseUrl.get(`/posts/${userId}/posts`);
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

export const getLikeUser = async ({ postId }) => {
  const res = await baseUrl.get(`/posts/${postId}/like`);
  return res.data.data;
};
