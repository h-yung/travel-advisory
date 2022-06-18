import axios from 'axios';
export default axios.create ({
    baseURL: 'http://localhost:8080/api', //change to rest api
        "Content-Type": "application/json"
    }
);
