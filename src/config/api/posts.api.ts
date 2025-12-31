import axiosInstance from "../axios/axiosInstance";

export const postsAPI = {
  getPosts: async () => {
    try {
      const response = await axiosInstance.get("/posts");
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error;
    }
  },

  getPostsPaginated: async (props: { pageParam: number }) => {
    try {
      const response = await axiosInstance.get(
        `/posts?_page=${props.pageParam}&_limit=${10}`
      );
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error;
    }
  },

  createPost: async (postData: {
    title: string;
    body: string;
    userId: string;
  }) => {
    try {
      const response = await axiosInstance.post("/posts", postData);
      return response;
    } catch (error: any) {
      throw error.response?.data || error;
    }
  },

  updatePost: async (postData: {
    id: number;
    title: string;
    body: string;
    userId: string;
  }) => {
    console.log("Updating post:", postData);
    try {
      const response = await axiosInstance.put(
        `/posts/${postData.id}`,
        postData
      );
      return response;
    } catch (error: any) {
      throw error.response?.data || error;
    }
  },
};
