import axios from 'axios';
import { API_HOST, API_PORT } from 'react-native-dotenv';

const api = axios.create({ baseURL: `http://${API_HOST}:${API_PORT}` });

export default api;
