import { instance } from '../../api/config/apiConfig';

export const registerAPI = {
  createUser(email: string, password: string) {
    return instance.post('/auth/register', { email, password });
  },
};
