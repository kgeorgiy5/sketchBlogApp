import {NextFunction, Request, Response} from 'express';
import {AppError} from "../src/types/error";
import requireAuth from "../src/middleware/requireAuth";
import {Session, SessionData} from "express-session";
import {header, ValidationChain} from "express-validator";

describe("Auth", function() {
    describe("require auth middleware", function() {
        let mockRequest: Partial<Request>;
        let mockResponse: Partial<Response>;
        let nextFunction: Partial<NextFunction> = jest.fn();
        // beforeEach(function() {
        //     mockRequest = {};
        // });

        test("No authorization header", () => {
            const expectedResponse:AppError = new Error("Unauthorized");
            expectedResponse.statusCode = 401;

            mockRequest = {
               headers:{

               }
            }

            requireAuth(mockRequest as Request, mockResponse as Response, nextFunction as NextFunction);

            expect(nextFunction).toBeCalledWith(expectedResponse);
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
            expect(nextFunction).toBeCalledWith(expectedResponse);
        })
    })
})