import axios from "axios";


const GYM_API_ENDPOINT = "http://localhost:8000/api/gym"
const USERS_API_ENDPOINT = "http://localhost:8000/api/users"


const findGyms = async (location, marts, token) => { 
    console.log("apiservice MARTS: ", marts);
    console.log("apiService LOCATION: ", location);
    const response = await axios.post(`${GYM_API_ENDPOINT}/getgyms`, {location, marts}, {
        headers: { 
          'Content-Type': 'application/json',
        }
      })
    console.log(response);
    return response
}

const findSparringPartners = async (location, marts) => {
    console.log("IN FIND SPARRING PARTNERS");

    const response = await axios.post(`${USERS_API_ENDPOINT}/sparringusers`, {location, marts}, {
      headers: { 
        'Content-Type': 'application/json'
      }
    })

    if (response) { return response } else {return "no response from request"}
}


const findCoach = async (location, marts) => {
  console.log("IN FIND COACH");
  const response = await axios.post(`${USERS_API_ENDPOINT}/coachusers`, {location, marts}, {
    headers: { 
      'Content-Type': 'application/json'
    }
  })

  if (response) { return response } else {return "no response from request"}
}

const getUserInfo = async (token) => {
  const response = await axios.get(USERS_API_ENDPOINT, {headers: {
    Authorization: `Bearer ${token}`
  }})
  console.log("RESPONSE: ", response);
}


const apiService = {
    findGyms, findSparringPartners, findCoach, getUserInfo
}

export default apiService