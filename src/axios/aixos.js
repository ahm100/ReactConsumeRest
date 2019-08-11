import axios from 'axios';
//http://localhost:5000
const instance = axios.create({
    baseURL: 'http://dummy.restapiexample.com/api/v1',
    headers: {
        headerType: 'example header type'
    }
});

export default instance;