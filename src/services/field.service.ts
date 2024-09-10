import { IField } from '@containers/app/pages/Field/field.constants';
import { axiosInstance } from './axios';

export const getFields = async () => {
  return axiosInstance.get('field', {});
};

export const postField = async (field: IField) => {
  return axiosInstance.post('field', field);
};
