import axios from "axios";

export default class CategoryService {
    async getAllCategories<PrismaClient>() {
        try {
          const data = await axios.get(
            process.env.NEXTAUTH_URL + "/api/category"
          );
          return data;
        } catch (error) {
          return false;
        }
      }
}