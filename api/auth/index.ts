import { CU_API } from "@/config";
import client from "@/utils/client";

const baseUrl = CU_API + "auth";

const login = async (email: string, password: string) => {
  try {
    await client.post(`${baseUrl}/login`, { email, password });
    return true;
  } catch (err) {
    console.log(err);
  }
};

const logout = async () => {
  try {
    await client.delete(`${baseUrl}/logout`);
    return true;
  } catch (err) {
    console.log(err);
  }
};

const auth = {
  login,
  logout,
};

export default auth;
