import axios from "axios";


const instanse = axios.create({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.0",
    headers: {
        "API-KEY": "6b942291-e486-4917-9612-6d20f8535ae9"
    }
});


export const usersAPI = {
    getUsers (currentPage = 1, pageSize = 10)  {
        return instanse.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data
            });
    },
    getUsersProfile (userId: any)  {
        return instanse.get(`profile/`+ userId)
            .then(response => {
                return response.data
            });
    },
    unfollowUsers(userId: number)  {
        return instanse.delete(`/follow/${userId}`)
            .then(response => {
                return response.data
            });
    },
    followUsers(userId:number)  {
        return instanse.post(`/follow/${userId}`)
            .then(response => {
                return response.data
            });
    },

}


export const authAPI =  {
    me(){
        return instanse.get(`auth/me`)
            .then(response => {
                return response.data
            });
    }
}
