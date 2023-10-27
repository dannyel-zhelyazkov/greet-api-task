import { axiosClient } from '@/client';

export const greetService = () => {
  const getGreets = async (page = 1, orderBy, orderType) => {
    try {
      const orderByParam = orderBy !== 'none' ? `&orderby=${orderBy}` : '';
      const orderTypeParam = orderBy !== 'none' ? `&order=${orderType}` : '';

      const response = await axiosClient.get(
        `?page=${page}&per_page=12${orderByParam}${orderTypeParam}`
      );

      const totalRecords = response.headers['x-wp-total'];
      const totalPages = response.headers['x-wp-totalpages'];

      return { data: response.data, totalRecords, totalPages };
    } catch (e) {
      throw new Error(e);
    }
  };

  return {
    getGreets,
  };
};
