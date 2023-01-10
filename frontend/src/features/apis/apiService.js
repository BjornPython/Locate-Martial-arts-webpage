import axios from "axios";

const GYM_API_ENDPOINT = "http://localhost:8000/api/gym"
const USERS_API_ENDPOINT = "http://localhost:8000/api/users"

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

const findSparringPartners = async (location=null) => {
    console.log("IN FIND SPARRING PARTNERS");

    const response = await axios.post(`${USERS_API_ENDPOINT}/sparringusers`, location, {
      headers: { 
        'Content-Type': 'application/json'
      }
    })

    if (response) { return response } else {return "no response from request"}
}


const findCoach = async (location=null) => {
  console.log("IN FIND COACH");
  const response = await axios.post(`${USERS_API_ENDPOINT}/coachusers`, location, {
    headers: { 
      'Content-Type': 'application/json'
    }
  })

  if (response) { return response } else {return "no response from request"}
}

const apiService = {
    findGyms, findSparringPartners, findCoach
}

export default apiService