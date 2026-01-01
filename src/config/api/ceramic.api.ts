import axiosInstance from "../axios/axiosInstance";

export const ceramicAPI = {
  getCategories: async (params: any) => {
    const response = await axiosInstance.post(
      "http://esptiles.imperoserver.in/api/API/Product/DashBoard",
      params
    );
    return response.data;
  },

  getProducts: async (params: { SubCategoryId: number; PageIndex: number }) => {
    const response = await axiosInstance.post(
      "http://esptiles.imperoserver.in/api/API/Product/ProductList",
      params
    );
    return response.data;
  },
};
