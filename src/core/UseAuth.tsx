import {axios} from "./UseAxiosApi";
import {useNavigate} from "react-router-dom";
import {AxiosResponse} from "axios";


//todo: user provider set and update after create user or sign in
export const useAuth = () => {
    const navigate = useNavigate();
    const userApiPath = "users"

    type UserResponse = {
        Authorization: string
        user: {
            cash: number,
            email: string,
            firstName: string
            lastName: string,
            id: number
        }
    }
    const createUser = async (firstName: string, lastName: string, email: string, password: string) => {
        return axios.post(`${userApiPath}/register`, {
            first_name: firstName,
            last_name: lastName,
            email: email,
            password: password

        }).then((res: AxiosResponse<UserResponse, any>) => {
            localStorage.setItem(process.env.REACT_APP_JWT_KEY as string, res.data.Authorization)
            console.log(res);

        });
    }

    const signIn = async (email: string, password: string) => {
        return axios.post(`${userApiPath}/login`, {
            email: email,
            password: password
        }).then((res: AxiosResponse<UserResponse, any>) => {
            localStorage.setItem(process.env.REACT_APP_JWT_KEY as string, res.data.Authorization)
            return true;
        }).catch((err) => {
            return false;
        });
    }

    const authorize = async () => {
        return axios.get(`${userApiPath}/authorize`)
            .then((res) => {
                if (res.status / 100 === 4) {
                    return Promise.reject();
                }
            })
    }

    const logout = () => {
        localStorage.removeItem(process.env.REACT_APP_JWT_KEY as string);
        navigate('/login', {replace: true});
    }

    return {createUser, signIn, authorize, logout};
}
