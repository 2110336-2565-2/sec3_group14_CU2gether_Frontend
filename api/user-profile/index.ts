import { CU_API } from "@/config";
import client from "@/utils/client";

const baseUrl = CU_API + "userProfile";

const checkStatus = async () => {
  try {
    const res = await client.get(`${baseUrl}/whoami`);
    if (res.status === 200) {
      return true;
    } else if (res.status === 401){
      return false
    } else {
        throw new Error(
            "Error occurs with status code: " + res.status
        );
    }
  } catch (err) {
    console.log(err);
  }
};

const userProfile = {
  checkStatus,
};

export default userProfile;
