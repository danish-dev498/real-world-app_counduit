const { default: axios } = require('axios');

import { POST } from '../../../services/APIconfig';

export const getUser = async (requestedParams) => {
  try {
    const response = await POST('/users', requestedParams);
    return response;
  } catch (error) {
    throw error;
  }
};
