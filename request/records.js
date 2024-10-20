import axios from "axios";
import MAIN_URL from "./apiConfig";
 
// for localites
export const getOrderByDistributorDateItem = async (params) =>
 {
    try {
        const res = await axios.get(`${MAIN_URL}/getOrderByDistributorDateItem`,{
            params: params,
          });
        return res?.data;
    } 
    catch (error)
    {
        console.log(error);
    }
};
export const getRtlOrderByDistributorDateItem = async (params) =>
 {
    try {
        const res = await axios.get(`${MAIN_URL}/getRtlOrderByDistributorDateItem`,{
            params: params,
          });
        return res?.data;
    } 
    catch (error)
    {
        console.log(error);
    }
};
