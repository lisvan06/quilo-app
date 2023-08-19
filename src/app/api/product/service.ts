import bcrypt from "bcryptjs";
import { NextRequest, NextResponse, userAgent } from "next/server";
import axios, { AxiosError } from "axios";

let message = "";
let code = 0;

export default class productService {
  async findAll() {
    try {
      console.log("Here in service");
      const res = await axios.get(process.env.BASE_URL+"/api/product");
      //console.log("Esta data", res.data);
      return NextResponse.json({res},{status: 200});
    } catch (error) {
      return false;
    }
  }

  async createProduct<PrismaClient>(product: PrismaClient) {
    try {
      const newProduct = await axios.post("/api/product/", product);
      return newProduct;
    } catch (error) {
      return false;
    }
  }

  async deleteProduct<PrismaClient>(id: string) {
    try {
      const deletedProduct = await axios.delete("/api/product/" + id);
      return deletedProduct;
    } catch (error) {
      return false;
    }
  }

  async updateProduct<PrismaClient>(product: PrismaClient, id: string) {
    try {
      const editedProduct = await axios.put("/api/product/" + id, product);
      return editedProduct;
    } catch (error) {
      return false;
    }
  }

  async findByKey<PrismaClient>(key: string, value: string) {
    try {
      const user = await axios.get("/api/product/search?" + key + "=" + value);
      return user;
    } catch (error) {
      return false;
    }
  }
}
