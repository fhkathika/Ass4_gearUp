import app from "./app";
import dotenv from "dotenv";

dotenv.config();
const PORT=process.env.PORT 
async function main(){
    try{
    app.listen(PORT,()=>{
        console.log(`Server is running on port ${PORT}`)
    })
    }
    catch(err){

console.log("Error starting the server",err)
    }
}
main();