import axios from "axios";
import MAIN_URL from "./apiConfig";
 
// for localites
export const getdispatchbychalannumber = async (params) =>
 {
    try {
        const res = await axios.get(`${MAIN_URL}/getdispatchbychalannumber`,{
            params: params,
          });
        return res?.data;
    } 
    catch (error)
    {
        console.log(error);
    }
};
export const savedispatch = async (data) =>
 {
    try {
        const res = await axios.post(`${MAIN_URL}/savedispatch`,data);
        return res?.data;
    } 
    catch (error)
    {
        console.log(error);
    }
};
