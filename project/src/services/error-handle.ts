import request from 'axios';
import {toast} from 'react-toastify';
import {ErrorType} from '../types/error';
import {ErrorsCode} from '../settings/http-code';

export const errorHandle = (error: ErrorType): void => {
  if (!request.isAxiosError(error)) {
    throw error;
  }

  const {response} = error;

  if (response) {
    switch (response.status) {
      case ErrorsCode.BAD_REQUEST:
        toast.warning(response.data.error);
        break;
      case ErrorsCode.UNAUTHORIZED:
        toast.info(response.data.error);
        break;
      case ErrorsCode.NOT_FOUND:
        toast.warning(response.data.error);
        break;
    }
  }
};
