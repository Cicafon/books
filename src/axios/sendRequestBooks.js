import axios from "axios";

export const sendRequestBooks = async (params) => {
  const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/books`, {
    page: params.page,
    itemsPerPage: params.itemsPerPage || 20,
    filters: params.filters || [],
  });
  return res;
};
