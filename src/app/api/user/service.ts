import bcrypt from "bcryptjs";
import { NextRequest, NextResponse, userAgent } from "next/server";
import axios, { AxiosError } from "axios";

let message = "";
let code = 0;

export default class UserService {
  async createUser<PrismaClient>(user: PrismaClient) {

  }
  
  async deleteUser<PrismaClient>(id: string) {

  }

  async updateUser<PrismaClient>(user: PrismaClient, id: string) {
    try {
      const editedUser = await axios.put("/api/user/" + id, user);
      return editedUser;
    } catch (error) {
      return false;
    }
  }

  async findById<PrismaClient>(id: string) {
    try {
      const user = await axios.get("/api/user/" + id);
      return user;
    } catch (error) {
      return false;
    }
  }

  async findByEmail<PrismaClient>(email: string) {
    try {
      const user = await axios.get("/api/user?email=" + email);
      return user;
    } catch (error) {
      return false;
    }
  }
}
