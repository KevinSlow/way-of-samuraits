import axios from "axios";


const instance = axios.create({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.0",
    headers: {
        "API-KEY": "6b942291-e486-4917-9612-6d20f8535ae9"
    }
});


export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data
            });
    },
    getUsersProfile(userId: any) {
        return profileAPI.getUsersProfile(userId);
    },
    unfollowUsers(userId: number) {
        return instance.delete(`/follow/${userId}`)
            .then(response => {
                return response.data
            });
    },
    followUsers(userId: number) {
        return instance.post(`/follow/${userId}`)
            .then(response => {
                return response.data
            });
    },

}

export const profileAPI = {
    getUsersProfile(userId: any) {
        return instance.get(`profile/` + userId)
    },
    getStatus(userId: any) {
        return instance.get(`profile/status/` + userId)
    },
    updateStatus(status: any) {
        return instance.put(`profile/status/`, {status: status})
    },
    savePhoto(photoFile: any) {
        var formData: any = new formData()
        formData.append("image", photoFile)
        return instance.put(`profile/photo`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
    }
}


export const authAPI = {
    me() {
        return instance.get(`auth/me`)
            .then(response => {
                return response.data
            });
    },
    login(email: string, password: string, rememberMe: boolean) {
        return instance.post(`auth/login`, {email, password, rememberMe})
    },
    logout() {
        return instance.delete(`auth/login`)
    }
}
