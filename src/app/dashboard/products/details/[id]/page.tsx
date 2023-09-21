import ProductService from "@/app/api/products/service";
import CardProductDetails from "@/app/components/server/cardProductDetails";

type ParamsProps = {
  params: string;
};

const Details = async ({ params }: { params: { id: string } }) => {
  const newPS = new ProductService();
  const product = await newPS.getProductById(params.id);
  if (!product) return;

  const item = product.data.data;

  return (
    <>
      <CardProductDetails product={item} />
    </>
  );
};

export default Details;
