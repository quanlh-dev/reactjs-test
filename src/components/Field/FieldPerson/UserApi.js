import axiosClient from 'api/axiosClient';
import { GET } from 'containers/app/screens/Kanban/data-source/fetch';

const listPersons = async (params) => {
  const response = await GET('/users', params);
  return response;
};

export default { listPersons };
