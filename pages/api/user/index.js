import { dbConnect } from "../../../lib/db-connect";
import User from "../../../models/user";
import { errorHandler, responseHandler, validateAll } from "../../../utils/common";
export default async function handler(req, res){
    if(req.method !== "POST"){
        // RETURN AN ERROR FROM ERROR HANDLER FUNCTION

        errorHandler("invalid request type", res);
    }

    try{
        // const { name, email, pNo} = req.body;
        validateAll(req.body);
        await dbConnect();
        const user = new User(req.body);
        const saveUser = await user.save();
        if(saveUser){
            responseHandler(saveUser,res, 201);
        }else{
            errorHandler('something went wrong', res);
        }
    }
    catch(err){
        errorHandler(err,res);
    }
}