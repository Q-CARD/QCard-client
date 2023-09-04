import axios from 'axios';
//import { USER_LOCALSTORAGE_KEY } from '@/constants/constants';
//import { IUser } from '@/interfaces/interfaces';
//import { ACCESS_TOKEN } from '@/constants/constants';

const AxiosModule = () => {
    let token = null;
    if (typeof window !== 'undefined') {
        // execute only client side
        //token = localStorage.getItem(ACCESS_TOKEN);
    }

    const axiosModule = token
        ? axios.create({
              baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
              headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`,
              },
          })
        : axios.create({
              baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
              headers: {
                  'Content-Type': 'application/json',
              },
          });

    return axiosModule;
};

const HTTP = AxiosModule();
export default HTTP;
