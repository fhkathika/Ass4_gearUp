import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import { AppError } from "../utils/app-error";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import { PrismaClientValidationError } from "../../generated/prisma/internal/prismaNamespace";
import config from "../config";

export const globalErrorHandle:ErrorRequestHandler=(err,req,res)=>{
    let statusCode=500
    let message ="something went wrong"
    let errorDetails:unknown=null
    if(err instanceof ZodError){
        statusCode=400;
        message:"validation error"
    }
    else if (err instanceof AppError){
        statusCode=err.statusCode;
        message=err.message
        errorDetails=err.errorDetails ?? null;
    }
    else if (err instanceof PrismaClientKnownRequestError){
        switch(err.code){
case "P2002":
statusCode=400;
message="Duplicate Value";

case "P2025":
    statusCode=400;
    message="Record not found";

    default:
       statusCode=400;
    message="Database Error"; 
    errorDetails={code:err.code}

        }
      

    }
      else if(err instanceof PrismaClientValidationError){
          statusCode=400;
          message="invalid query";  
        }

        if(statusCode==500 && config.NODE_ENV=="production"){
            errorDetails=null;
        }
        else if(config.NODE_ENV!=="production" && err instanceof Error && errorDetails ==null){
            errorDetails={stack:err.stack};

        }
   res.status(statusCode).json({success:false,message,errorDetails})     
} 