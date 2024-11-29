import {NextFunction, Request, Response} from 'express';
import {AppError} from "../src/types/error";
import requireAuth from "../src/middleware/requireAuth";
import {Session, SessionData} from "express-session";
import * as authController from "../src/controllers/auth";

describe("Auth", function() {
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let nextFunction: Partial<NextFunction> = jest.fn();

    beforeEach(() => {
        mockRequest = {};
    })

    describe("require auth middleware", function() {
        test("No authorization header", () => {
            const expectedResponse:AppError = new Error("Unauthorized");
            expectedResponse.statusCode = 401;

            mockRequest = {
               headers:{

               }
            }

            requireAuth(mockRequest as Request, mockResponse as Response, nextFunction as NextFunction);

            expect(nextFunction).toHaveBeenCalledWith(expectedResponse);
        });

        test("No session data", () => {
            const expectedResponse:AppError = new Error("Unauthorized");
            expectedResponse.statusCode = 401;

            const sessionData = {
                userId:undefined,
                isAuthenticated:false,
            };

            mockRequest = {
                headers:{
                    "Authorization":"dummy"
                },
                session:sessionData as Session&Partial<SessionData>,
            }

            requireAuth(mockRequest as Request, mockResponse as Response, nextFunction as NextFunction);
            expect(nextFunction).toHaveBeenCalledWith(expectedResponse);
        })
    })

    describe("auth controller", function(){
        describe("sign up handler", function() {
            test("No email or password given", async function() {
                mockRequest = {
                    body:{
                    }
                }

                const expectedResponse:AppError = new Error("No email or password provided");
                expectedResponse.statusCode = 400;

                await authController.postSignUp(mockRequest as Request, mockResponse as Response, nextFunction as NextFunction);
                expect(nextFunction).toHaveBeenCalledWith(expectedResponse);
            })
        })

        describe("sign in handler", function(){
            test("No email or password given, passes error to next func", async function(){
                mockRequest = {
                    body:{
                    }
                }

                const expectedResponse: AppError = new Error("No email or password provided");
                expectedResponse.statusCode = 400;

                await authController.postSignIn(mockRequest as Request, mockResponse as Response, nextFunction as NextFunction);
                expect(nextFunction).toHaveBeenCalledWith(expectedResponse);
            })
        })

        describe("getIsAuth handler", function(){
            test("No session data", function(){
                mockRequest = {}

                const expectedResponse:AppError = new Error("Session data is missing");
                expectedResponse.statusCode = 401;

                authController.getIsAuth(mockRequest as Request, mockResponse as Response, nextFunction as NextFunction);
                expect(nextFunction).toHaveBeenCalledWith(expectedResponse);
            })

            test("session data: isAuthenticated is false, passes 401 error to next func", function(){
                const sessionData = {
                    isAuthenticated:false,
                    userId:"dummy"
                }

                mockRequest = {
                    session: sessionData as Session&Partial<SessionData>
                }

                const expectedResponse:AppError = new Error("Unauthorized");
                expectedResponse.statusCode = 401;

                authController.getIsAuth(mockRequest as Request, mockResponse as Response, nextFunction as NextFunction);
                expect(nextFunction).toHaveBeenCalledWith(expectedResponse);
            })
        })
    })
})