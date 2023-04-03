import { CU_API } from "@/config";
import client from "@/utils/client";
const baseUrl = CU_API + "auth";
const login = async (email: string, password: string) => {
  try {
    await client.post(`${baseUrl}/login`, { email, password });
    return true
  } catch (error) {
    throw new Error("Error logging in with this error: " + error);

  }
};
const logout = async () => {
  try {
    await client.delete(`${baseUrl}/logout`);
    return true
  } catch (error) {
    throw new Error("Error logging out with this error: " + error);
  }
};

const auth = {
  login,
  logout,
};
export default auth;
