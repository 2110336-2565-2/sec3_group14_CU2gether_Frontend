import { CU_API } from "@/config";
import client from "@/utils/client";
import FormData from "form-data";

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

const checkStatusById = async (id: string) => {
  try {
    const res = await client.get(baseUrl + '/' + id);
    return res.data;
  } catch (error) {
    throw new Error(`Error to get check user: ${id} status`);
  }
};

const uploadImage = async (params: FormData) => {
  try {
    await client.post(baseUrl + '/uploadImage', params, {"Content-Type": "multipart/form-data"});
  } catch (error) {
    throw new Error(`Error to upload image`);
  }
}

const uploadCoverImage = async (params: FormData) => {
  try {
    await client.post(baseUrl + '/uploadCoverImage', params, {"Content-Type": "multipart/form-data"});
  } catch (error) {
    throw new Error(`Error to upload image`);
  }
}

const userProfile = {
  checkStatus,
  checkStatusById,
  uploadImage,
  uploadCoverImage,
};

export default userProfile;
