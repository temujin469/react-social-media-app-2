import baseUrl from "utils/axios";

export const getUser = async ({ userId, token }) => {
  const res = await baseUrl.get(`/users/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data.data;
};

export const getCurrentUser = async ({ token }) => {
  const res = await baseUrl.get(`/users/current-user`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data.data;
};

export const getFriends = async ({ userId, token }) => {
  const res = await baseUrl.get(`/users/${userId}/friends`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data.data;
};

export const patchFriend = async ({ friendId, token, userId }) => {
  const res = await baseUrl.patch(
    `/users/${userId}/${friendId}`,
    { userId },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.data;
};
