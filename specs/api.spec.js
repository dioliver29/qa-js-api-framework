import supertest from "supertest";
import {jest} from "@jest/globals";
import services from "../framework/services/services";
import config from "../framework/config/config";
import newUserCreds from "../framework/helpers/newUserCreds.json";
import newUser from "../framework/services/newUser";

test ('login with valid credentials', async () => {
    const res = await services.login(config.credentials);
    expect(res.status).toEqual(200);
    expect(res.body.username).toEqual(config.credentials.userName);
    expect(res.body.password).toEqual(config.credentials.password);
    expect(res.body.userId).toEqual(config.userId);

})

test ('login with invalid credentials', async () => {
    const res = await services.login({"userName": "string-new1Nddd", "password": "string-New!1N"});
    expect(res.status).toEqual(200);
    expect(res.body).toEqual({});

})

test ('get user info', async () => {
    const token = await services.getAuthToken();
    const res = await services.userInfo(config.userId, token)

    expect(res.status).toEqual(200);
    expect(res.body.username).toEqual(config.credentials.userName);
})

test ('user doesnt exist, cant get info', async () => {
    const token = await services.getAuthToken();
    const res = await services.userInfo({userId: "ad5c60d9-bb45-4599-9490-fa2e7572a974"}, token)

    expect(res.status).toEqual(401);
    expect(res.body).toEqual({"code": "1207", "message": "User not found!"});
})


describe('Delete user', () => {

    let userId = '';
    let token = '';

    beforeAll(async () => {
      
        const res = await newUser.newUser(newUserCreds);
        //console.log(res); 
        //const newUserId = await newUser.getnewUserId(); 
        //console.log(newUserId);
        userId = res.body.userID;
        console.log(userId);
        /* const newUserId = async () => {
            const res = await newUser.newUser(newUserCreds); 
            const newUserId = await newUser.getnewUserId(); 
            console.log(newUserId);
            return newUserId
            };
            
          const userId = newUserId().then((result) => {} );
          //userId.then((result) => {} )
          console.log(userId); */
      const authToken = await newUser.getAuthToken(newUserCreds);
      token = authToken.body.token;
      console.log(token);
});

    test('Удаление существующего юзера', async () => {
      const res = await newUser.deleteUser(userId, token);
      //console.log(res);
      expect(res.status).toEqual(204);
      expect(res.body).toEqual({});
    });


    test('Delete user with invalid userid', async () => {
      const res = await newUser.deleteUser('ad5c60d9-bb45-4599-9490-fa2e7572a974', token);
      expect(res.status).toEqual(200)
      expect(res.body).toEqual({ code: '1207', message: 'User Id not correct!' })
    })
})