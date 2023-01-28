import supertest from "supertest";
import config from "../config/config";
import user from "./user"
const {url} = config;
const {userId} = config;
const {isbn} = config;
const {isbn2} = config;
const {token} = user;


const books = {

    linkBook: (token, userId, isbn) => {
        return supertest(url)
            .post('/BookStore/v1/Books')
            .set('Accept', 'Application/json')
            .set('Authorization', `Bearer ${token}`)
            .send({
                "userId": userId,
                "collectionOfIsbns": [
                  {
                    "isbn": isbn
                  }
                ]
              })
    },

    updateBook: (token, userId, isbn, isbn2) => {
        return supertest(url)
            .put(`/BookStore/v1/Books/${isbn}`)
            .set('Accept', 'Application/json')
            .set('Authorization', `Bearer ${token}`)
            .send({
                "userId": userId,
                "isbn": isbn2
              })
    },
    
    getBookInfo: (token, isbn) => {
        return supertest(url)
            .get(`/BookStore/v1/Book/?ISBN=${isbn}`)
            .set('Accept', 'Application/json')
            .set('Authorization', `Bearer ${token}`)
    },
    

    deleteBook: (token, userId, isbn2) => {
        return supertest(url)
            .delete(`/BookStore/v1/Book/`)
            .set('Accept', 'Application/json')
            .set('Authorization', `Bearer ${token}`)
            .send({
                "userId": userId,
                "isbn": isbn2
              })
    },

    deleteAllBooks: (token, userId, ) => {
        return supertest(url)
            .delete(`/BookStore/v1/Books/?UserId=${userId}`)
            .set('Accept', 'Application/json')
            .set('Authorization', `Bearer ${token}`)
    }

}




export default books;