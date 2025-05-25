import axios from "axios";
const baseUrl = "/api/login";

const login = async credentials => {
    console.log('Sending login request with credentials:', credentials);
    try {
        const response = await axios.post(baseUrl, credentials);
        console.log('Login response:', response);
        return response.data;
    } catch (error) {
        console.error('Login request failed:', error.response ? error.response.data : error.message);
        throw error;
    }
}

export default { login };