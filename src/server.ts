import dotenv from "dotenv";
import app from "./app";
import config from "./config";


dotenv.config();
const PORT=process.env.PORT 

if(config.NODE_ENV==="production"){
  app.listen(PORT,()=>{
        console.log(`Server is running on port ${PORT}`)
    })
}
// async function main(){
//     try{
  
//     }
//     catch(err){

// console.log("Error starting the server",err)
//     }
// }
// main();