import axios from 'axios';
import { getCookie } from '@/utils/cookies';

const instance = axios.create({
  baseURL: 'http://localhost:6060/api/',
});
instance.defaults.headers.common = {
  Authorization: `Bearer ${getCookie('jwt')}`,
};
export default instance;
