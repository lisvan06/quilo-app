import bcrypt from "bcryptjs";
import { NextRequest, NextResponse, userAgent } from "next/server";
import axios, { AxiosError } from "axios";

let message = "";
let code = 0;

export default class UserService {
  async createUser<PrismaClient>(user: PrismaClient) {
    try {
      const newUser = await axios.post("/api/user/", user);
      return newUser;
    } catch (error) {
      return false;
    }
  }

  async deleteUser<PrismaClient>(id: string) {
    try {
      const deletedUser = await axios.delete("/api/user/" + id);
      return deletedUser;
    } catch (error) {
      return false;
    }  
  }

  async updateUser<PrismaClient>(user: PrismaClient, id: string) {
    try {
      const editedUser = await axios.put("/api/user/" + id, user);
      return editedUser;
    } catch (error) {
      return false;
    }
  }

  async findByKey<PrismaClient>(key: string, value: string) {
    try {
      const user = await axios.get("/api/user/search?" + key + "=" + value);
      return user;
    } catch (error) {
      return false;
    }
  }
}
