import { useMutation, useQuery, useQueryClient } from "react-query"
import apiRequest from "../../Services/axios"
import { forgetPassword, resetPassword, userId, userRegister } from "./user.types";
import { userLogin } from "./user.types";
// import Cookies from "js-cookie";

function usePostUserRegister() {
    return useMutation(async (user: userRegister) => {
        return apiRequest.post(`users/register`, user)
    },
        {
            onSuccess(res) {
                console.log(res);
                localStorage.setItem("userId", res.data.response.user._id)
            },
        }
    )
}


function usePostUserLogin() {
    return useMutation(async (user: userLogin) => {
        return apiRequest.post(`users/login`, user)
    },
        {
            onSuccess(res) {
                localStorage.setItem("userId", res.data.response.data._id)
            },
        }
    )
}

function usePostUserForgetPassword() {
    return useMutation(async (email: forgetPassword) => {
        return apiRequest.post(`users/forget-password`, email)
    },
    )
}


function usePostUserResetPassword() {
    return useMutation(async (data: resetPassword) => {
        return apiRequest.post(`users/reset-password`, data)
    },
    )
}

function usePostUserInformation() {
    return useMutation(async (userId: userId) => {
        return apiRequest.post(`users/user-information`, userId)
    },
    )
}

function usePostUserBan() {
    const queryClient = useQueryClient();
    return useMutation(async (userId: userId) => {
        return apiRequest.post(`users/user-ban-toggle`, userId)
    },
    {
        onSuccess: () => {
            queryClient.invalidateQueries(["AllPostAllUsers"]);
            queryClient.invalidateQueries(["myPost"]);
        }
    }
    )
}




export { usePostUserRegister, usePostUserLogin, usePostUserForgetPassword, usePostUserResetPassword, usePostUserInformation, usePostUserBan }