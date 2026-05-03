import * as axios from 'axios';
import {IS_DEBUG} from '../constants.ts';

export const API_BASE_URL = IS_DEBUG ? 'http://localhost:5000' : undefined; // TODO: maybe .env, define url for dev and prod

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000
});
