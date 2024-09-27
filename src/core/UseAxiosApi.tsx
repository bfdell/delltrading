import Axios from "axios";

export const makeAxiosApi = () => {
    const axios = Axios.create({baseURL: process.env.REACT_APP_SERVER_URL})

    axios.interceptors.request.use((config) => {
        config.headers.set("Authorization", localStorage.getItem(process.env.REACT_APP_JWT_KEY as string))
        console.log("Making request to", config.url);
        return config
    }, (error) => {
        // Do something with request error
        console.log("REQUEST ERROR OCCURRED")
        return Promise.reject(error);
    });
//FIX SCROLLL
    // axios.interceptors.response.use((response) => {
    //     console.log(response)
    //     return response
    // }, (error) => {
    //     // Do something with response error
    //     console.log("RESPONSE ERROR OCCURRED")
    //     return Promise.reject(error);
    // })

    return {axios};

}

export const {axios} = makeAxiosApi();
