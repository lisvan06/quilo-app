import { Card } from "antd";
import Meta from "antd/es/card/Meta";
import BtnPublish from "./btnPublish";
import BtnEdit from "./btnEdit";
import BtnDelete from "../client/btnDelete";

export default function CardProduct(product: any) {
  const item = product.product;
  return (
    <>
      <Card
        onClick={() => {
          const url = "/dashboard/products/details/" + item.id;
          window.location.href = url;
        }}
        hoverable
        style={{
          width: "8rem",
          margin: "0.8rem",
          boxShadow:
            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.19)",
        }}
        cover={<div style={{  height: "128px", clear: "both" }}><img style={{ width: "100%" }} alt="example" src={item.image.url}/></div>}
        actions={[
          <BtnPublish product={item} status="checked"></BtnPublish>,
          <BtnEdit id={item.id} route={`products`}></BtnEdit>,
          <BtnDelete id={item.id} name={"product"}></BtnDelete>,
        ]}
      >
        <Meta title={item.title} description={`$ ${item.price}`}/>
        {/* { <div className="mt-0.5 text-gray-400 text-sm p-0">
          <p className="text-justify">{item.title.substring(0, 30)}...</p>
        </div>} */}
      </Card>
    </>
  );
}