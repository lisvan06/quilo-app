import bcrypt from "bcryptjs";
import { NextRequest, NextResponse, userAgent } from "next/server";
import axios, { AxiosError } from "axios";

export default class ProductService {
  async getAllProducts<PrismaClient>() {
    try {
      const products = await axios.get(process.env.NEXTAUTH_URL+"/api/product");
      return products;
    } catch (error) {
      return false;
    }
  }

  async getProductsByOwnerId<PrismaClient>(id: string) {
    try {
      const products = await axios.get(process.env.NEXTAUTH_URL+"/api/product/search?ownerId="+id);
      return products;
    } catch (error) {
      return false;
    }
  
  }
}
