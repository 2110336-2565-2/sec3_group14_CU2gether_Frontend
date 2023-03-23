import { CU_API } from "@/config";
import client from "@/utils/client";

const baseUrl = CU_API + "userProfile";

const checkStatus = async () => {
  try {
    const res = await client.get(`${baseUrl}`);
    if (res.status === 200) {
      return res.data;
    } else if (res.status === 401) {
      return undefined;
    } else {
      throw new Error("Error occurs with status code: " + res.status);
    }
  } catch (err) {
    console.log(err);
  }
};

const userProfile = {
  checkStatus,
};

export default userProfile;
