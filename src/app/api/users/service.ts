import axios, { AxiosError } from "axios";

let message = "";
let code = 0;

function exclude(user: any, keys: any) {
  return Object.fromEntries(
    Object.entries(user).filter(([key]) => !keys.includes(key))
  );
}
export default class UserService {
  async getUser<PrismaClient>(id: string) {
    try {
      const user = await axios.get(
        process.env.NEXTAUTH_URL + `/api/user/${id}`
      );
      return user;
    } catch (error) {}
  }

  async getUserWhithoutPassword<PrismaClient>(id: string) {
    try {
      const user = await axios.get(
        process.env.NEXTAUTH_URL + `/api/user/${id}`
      );
      const userWithoutPassword = exclude(user, ["password"]);
      return userWithoutPassword;
    } catch (error) {}
  }

  async createUser<PrismaClient>(user: PrismaClient) {
    try {
      const newUser = await axios.post(
        process.env.NEXTAUTH_URL + "/api/user/",
        user
      );
      return newUser;
    } catch (error) {
      return false;
    }
  }

  async deleteUser<PrismaClient>(id: string) {
    try {
      const deletedUser = await axios.delete(
        process.env.NEXTAUTH_URL + "/api/user/" + id
      );
      return deletedUser;
    } catch (error) {
      return false;
    }
  }

  async updateUser<PrismaClient>(user: PrismaClient, id: string) {
    try {
      console.log("User", process.env.NEXTAUTH_URL);
      const editedUser = await axios.put(
        "/api/user/" + id,
        user
      );
      return editedUser;
    } catch (error) {
      return false;
    }
  }

  async findByKey<PrismaClient>(key: string, value: string) {
    try {
      const user = await axios.get(
        process.env.NEXTAUTH_URL + "/api/user/search?" + key + "=" + value
      );
      return user;
    } catch (error) {
      return false;
    }
  }
}
