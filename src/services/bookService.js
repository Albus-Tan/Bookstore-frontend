import config from '../utils/config';
import {postRequest_v2, postRequestNoPara} from "../utils/ajax";

const root = "/book";
const bookServiceApiUrl = config.apiUrl + root;

export const addBook = (data, callback) => {
    const url = `${bookServiceApiUrl}/add`;
    postRequest_v2(url, data, callback);
};

export const getAllBooks = (callback) => {
    const url = `${bookServiceApiUrl}/getAll`;
    postRequestNoPara(url, callback);
};

export const getBookById = (id, callback) => {
    const data = {id: id};
    const url = `${bookServiceApiUrl}/getById`;
    postRequest_v2(url, data, callback);
};