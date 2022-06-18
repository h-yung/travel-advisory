import axios from 'axios';
export default axios.create ({
    baseURL: 'http://localhost:8080/api', //change to REST API url config by server
    headers: {
        "Content-Type": "application/json"
    }
});
