import { CU_API } from "@/config";
import client from "@/utils/client";

const baseUrl = CU_API + "auth";

const login = async (email: string, password: string) => {
  try {
    const res = await client.post(`${baseUrl}/login`, { email, password });
    if (res.status === 201) {
      return true;
    } else {
      throw new Error("Error occurs with status code: " + res.status);
    }
  } catch (err) {
    console.log(err);
  }
};

const logout = async () => {
  try {
    const res = await client.post(`${baseUrl}/logout`);
    if (res.status === 200) {
      return true;
    } else {
      throw new Error("Error occurs with status code: " + res.status);
    }
  } catch (err) {
    console.log(err);
  }
};

const auth = {
  login,
  logout,
};

export default auth;
