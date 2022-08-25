import client from "./client";

const baseUrl = "http://localhost:2424/api/v1";

export const getPosts = async (pageNo, limit) => {
  try {
    // const { data } = await client(`/post/posts?pageNo=${pageNo}&limit=${limit}`);
    const { data } = await client(`${baseUrl}/post/posts?pageNo=${pageNo}&limit=${limit}`);
    console.log('client', client)
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) {
      return response.data;
    }
    return { error: error.message || error };
  }
};
