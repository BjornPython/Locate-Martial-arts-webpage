import axios from "axios";

const GYM_API_ENDPOINT = "http://localhost:8000/api/gym"

const findGyms = async () => {
    const response = await axios.get(`${GYM_API_ENDPOINT}/getgyms`)
    console.log(response);
    return response
}


const apiService = {
    findGyms
}

export default apiService