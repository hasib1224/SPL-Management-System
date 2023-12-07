import axios from "axios";

const checkLogin = async () => {
    try {
        const res = await axios.post(
            "http://localhost:3005/api/auth/check-login",
            {},
            {
                withCredentials: true,
            }
        );

        const userType = res.data.data.userType;
        return userType;
    } catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
};

export default checkLogin;