import axios from "axios";
import MAIN_URL from "./apiConfig";
 
// for localites
export const getallsizes = async () =>
 {
    try {
        const res = await axios.get(`${MAIN_URL}/getallsizes`);
        return res?.data;
    } 
    catch (error)
    {
        console.log(error);
    }
};
