import supertest from "supertest";
import {jest} from "@jest/globals";
import user from "../framework/services/user";
import books from "../framework/services/books";
import config from "../framework/config/config";
import bookInfo from "../framework/helpers/bookInfo.json"
import generateData from "../framework/helpers/generateDataForTests"
const {userId} = config;
const {isbn} = config;
const {isbn2} = config;
const {token} = user;

//let token = '';
describe('Books store test', () => {

    /* beforeEach(async() => {
        const getToken = await user.getAuthToken();
        //token = getToken.body;
    }) */



    test ('POST /BookStore/v1/Books', async () => {
        const token = await user.getAuthToken();
        const res = await books.linkBook(token, userId, isbn);

        expect(res.status).toEqual(201);
        expect(res.body).toEqual({
            "books": [
            {
                "isbn": config.isbn
            }
            ]
        });
    })

    test ('POST /BookStore/v1/Books with wrong isbn', async () => {
        const token = await user.getAuthToken();
        const res = await books.linkBook(token, userId, generateData.randomIsbn);
        expect(res.status).toEqual(400);
        expect(res.body).toEqual({
            "code": "1205",
            "message": "ISBN supplied is not available in Books Collection!"
        });
    })

    test ('PUT /BookStore/v1/Books/{isbn}', async () => {
        const token = await user.getAuthToken();
        const res = await books.updateBook(token, userId, isbn, isbn2);
        const data = JSON.stringify(res.body.books[0].isbn)
        //console.log(res)
        //console.log(data)
        expect(res.status).toEqual(200);
        expect(data).toEqual(`\"${isbn2}\"`);
    })

    test ('PUT /BookStore/v1/Books/{isbn} with invalid isbn', async () => {
        const token = await user.getAuthToken();
        const res = await books.updateBook(token, userId, isbn, generateData.randomIsbn);
        expect(res.status).toEqual(400);
        expect(res.body).toEqual({"code":"1205","message":"ISBN supplied is not available in Books Collection!"});
    })

    test ('Get /BookStore/v1/Books/isbn', async () => {
        const token = await user.getAuthToken();
        const res = await books.getBookInfo(token, isbn);
        expect(res.status).toEqual(200);
        expect(res.body).toEqual(bookInfo);
    })

    test ('Delete /BookStore/v1/Book/', async () => {
        const token = await user.getAuthToken();
        const res = await books.deleteBook(token, userId, isbn2);
        expect(res.status).toEqual(204);
        expect(res.body).toEqual({});
    })

    test ('Delete all books', async () => {
        const token = await user.getAuthToken();
        const res = await books.deleteAllBooks(token, userId);
        expect(res.status).toEqual(204);
        expect(res.body).toEqual({});
    })

    test ('Delete all books with invalid userId', async () => {
        const token = await user.getAuthToken();
        const res = await books.deleteAllBooks(token, generateData.randomUserId);
        expect(res.status).toEqual(401);
        expect(res.body).toEqual({"code": "1207","message": "User Id not correct!"});
    })
})