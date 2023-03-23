import baseUrl from "utils/axios";

export const getAllPost = async ({ userId, token, isProfile }) => {
  const res = await baseUrl.get(
    isProfile ? `/posts/${userId}/posts` : `/posts`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.data;
};

export const getPost = async ({ postId, token }) => {
  const res = await baseUrl.get(`/posts/${postId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const patchLike = async ({ postId, token, userId }) => {
  const res = await baseUrl.patch(
    `/posts/${postId}/like`,
    { userId },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.data;
};
