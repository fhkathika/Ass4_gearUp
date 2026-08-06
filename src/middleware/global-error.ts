import { ErrorRequestHandler } from "express";

export const globalErrorHandle:ErrorRequestHandler=(err,req,res)=>{
    let statusCode=500
    let message ="something"
}