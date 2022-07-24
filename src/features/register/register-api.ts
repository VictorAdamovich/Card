import { instance } from '../../api/config/apiConfig';

export const registerApi = {
  createUser(email: string, password: string) {
    return instance.post<{ email: string; password: string }>('auth/register', {
      email,
      password,
    });
  },
};
