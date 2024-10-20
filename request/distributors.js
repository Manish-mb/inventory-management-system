import axios from "axios";
import MAIN_URL from "./apiConfig";
 
export const getalldistributors = async () =>
 {
    try {
        const res = await axios.get(`${MAIN_URL}/getalldistributors`);
        return res?.data;
    } 
    catch (error)
    {
        console.log(error);
    }
};
export const savedistributor = async (data) =>
 {
    try {
        const res = await axios.post(`${MAIN_URL}/savedistributor`,data);
        return res?.data;
    } 
    catch (error)
    {
        console.log(error);
    }
};
