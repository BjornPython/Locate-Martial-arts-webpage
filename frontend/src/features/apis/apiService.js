import axios from "axios";

const GYM_API_ENDPOINT = "http://localhost:8000/api/gym"


const findGyms = async (location, marts) => {
    console.log("apiservice MARTS: ", marts);
    const response = await axios.post(`${GYM_API_ENDPOINT}/getgyms`, {marts}, {
        headers: { 
          'Content-Type': 'application/json'
        }
      })
    console.log(response);
    return response
}


const apiService = {
    findGyms
}

export default apiService