import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import { AppError } from "../utils/app-error";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import config from "../config";
import { PrismaClientValidationError } from "../../prisma/generated/prisma/internal/prismaNamespace";

export const globalErrorHandle:ErrorRequestHandler=(err,req,res,next)=>{
    let statusCode = 500;
  let message = "Something went wrong";
  let errorDetails: unknown = null;

  console.log("actual error:", err);

  if (err instanceof ZodError) {
    statusCode = 400;
    message = "Validation error";
    errorDetails = err.issues;
  }

  else if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
    errorDetails = err.errorDetails ?? null;
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