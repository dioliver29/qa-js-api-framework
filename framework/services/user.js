import supertest from "supertest";
import config from "../config/config";
const {url} = config;
const {userId} = config;

let token = '';

const user = {
    login: (payload) => {
        return supertest(url)
            .post('/Account/v1/login')
            .set('Accept', 'Application/json')
            .send(payload)
            
    },
    async getAuthToken() {
        const payload = config.credentials
        const res = await this.login(payload)
        return res.body.token
    },

    async getAuthTokenCache() {
        if(token){
            return token;
        }
        token = await this.getAuthToken()
        return token
    },

    userInfo: (userId, token) => {
        return supertest(url)
            .get(`/Account/v1/User/${userId}`)
            .set('Authorization', `Bearer ${token}`)
    },

    autorizhed: (payload) => {
        return supertest(url)
            .post('/Account/v1/Autorized')
            .set('Accept', 'Application/json')
            .send(payload)
    },

    deleteUser: (userId, token) => {
        return supertest(url)
            .delete(`/Account/v1/User/${userId}`)
            .set('Authorization', `Bearer ${token}`)
    }

}

export default user;