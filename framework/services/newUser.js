import supertest from "supertest";
import config from "../../framework/config/config";
import newUserCreds from "../helpers/newUserCreds.json";

let token = '';
let userId = '';

const newUser = {
    
    newUser: (payload) => {
        return supertest(config.url)
            .post('/v1/User')
            .set('Accept', 'Application/json')
            .send(payload)
    },
    /* async getnewUserId() {
        const payload = {
            "userName": "newuserDi1",
            "password": "newuserDi1!"
          }
        const res = await this.newUser(payload)
        userId = res.body.userId
        return userId
    },
    async getTokenNewUser() {
        const payload = newUserCreds
        const res = await this.newUser(payload)
        return res.body.token
    }, */

    getAuthToken: (payload) => {
        return supertest(config.url)
            .post('/v1/GenerateToken')
            .set('Accept', 'Application/json')
            .send(payload)
    },

    deleteUser: (userId, token) => {
        return supertest(config.url)
            .delete(`/v1/User/${userId}`)
            .set('Authorization', `Bearer ${token}`)
    }

}



export default newUser;