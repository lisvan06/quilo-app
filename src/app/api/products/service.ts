import bcrypt from "bcryptjs";
import { NextRequest, NextResponse, userAgent } from "next/server";
import axios, { AxiosError } from "axios";

export default class ProductService {
  async setPublised(product: any) {
    try {
      const res = await axios.put(`/api/products/${product.id}`, product);
      return res;
    } catch (error) {
      return false;
    }
  }

  async getAllProducts<PrismaClient>() {
    try {
      const products = await axios.get(
        process.env.NEXTAUTH_URL + "/api/products"
      );
      return products;
    } catch (error) {
      return false;
    }
  }

  async getProductById<PrismaClient>(id: string) {
    try {
      const products = await axios.get(
        process.env.NEXTAUTH_URL + "/api/products/" + id
      );
      return products;
    } catch (error) {
      return false;
    }
  }

  async getProductsByOwnerId<PrismaClient>(id: string) {
    // console.log("EHere in Product Service", "/api/product/search?ownerId=" + id);
    try {
      const products = await axios.get(
        process.env.NEXTAUTH_URL + "/api/products/search?ownerId=" + id
      );
      return products;
    } catch (error) {
      return false;
    }
  }
}
