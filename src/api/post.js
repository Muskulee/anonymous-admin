import client from "./client";

const baseUrl = "http://localhost:2424/api/v1";

export const getPosts = async (pageNo, limit) => {
  try {
    // const { data } = await client(`/post/posts?pageNo=${pageNo}&limit=${limit}`);
    const { data } = await client(
      `${baseUrl}/post/posts?pageNo=${pageNo}&limit=${limit}`
    );
    // console.log('client', client)
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) {
      return response.data;
    }
    return { error: error.message || error };
  }
};

export const deletePost = async (id) => {
  try {
    // const { data } = await client(`/post/posts?pageNo=${pageNo}&limit=${limit}`);
    const { data } = await client.delete(`${baseUrl}/post/${id}`);
    //   console.log('client', client)
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) {
      return response.data;
    }
    return { error: error.message || error };
  }
};

export const searchPost = async (query) => {
  try {
    // const { data } = await client(`/post/posts?pageNo=${pageNo}&limit=${limit}`);
    const { data } = await client(`${baseUrl}/post/search?title=${query}`);
    //   console.log('client', client)
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) {
      return response.data;
    }
    return { error: error.message || error };
  }
};

export const uploadImage = async (formData) => {
  try {
    // const { data } = await client(`/post/posts?pageNo=${pageNo}&limit=${limit}`);
    const { data } = await client.post(`${baseUrl}/post/upload-image`, formData);
    //   console.log('client', client)
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) {
      return response.data;
    }
    return { error: error.message || error };
  }
};
