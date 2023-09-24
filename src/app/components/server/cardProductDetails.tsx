"use client";
import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Card, Rate } from "antd";

export default function CardProductDetails(product: any) {
  const item = product.product;

  const cardStyle = {
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)", // Add your desired shadow properties here
  };

  return (
    <>
      <div className="sm:py-4 items-center p-3 w-full h-full">
        <Breadcrumb
          items={[
            {
              href: "/",
              title: <HomeOutlined />,
            },
            {
              href: "/dashboard",
              title: (
                <>
                  <span>Dashboard</span>
                </>
              ),
            },
            {
              title: "Products",
            },
          ]}
        />

        <div className="flex flex-col sm:flex-row space-x-5 space-y-6 md:space-y-1 md:space-x-6 items-start sm:items-start h-screen-128px mt-5 mx-7">
          {/* Card for Image (Mobile: On Top, Larger Screens: On Left) */}
          <div
            className="bg-white rounded-lg sm:w-70% sm:w-2/3 md:w-1/2 lg:w-2/5 xl:w-2/5 sm:order-1 lg:ml-10 lg:"
            style={cardStyle}
          >
            {/* Mobile: Image on Top */}
            {/* Larger Screens: Image on Left */}
            <div className="p-4">
              <img
                src={item.image.url}
                alt={item.image.pathname}
                className="w-full h-auto object-cover mb-4 sm:mb-0 rounded-lg"
              />
            </div>
          </div>

          {/* Div for Descriptions (Mobile: Below Image, Larger Screens: To the Right) */}
          <div className="bg-white rounded-lg sm:w-70% sm:w-1/3 md:w-1/2 lg:w-3/5 xl:w-3/5 sm:order-2 sm:mt-6 lg:px-10 mb-10">
            <span className="bg-green-500 text-white px-2 py-1 rounded-xl mb-2">
              {item.category.name}
            </span>
            <h2 className="text-lg font-semibold mb-2">{item.title}</h2>
            <p className="text-sm text-gray-600 mb-2">
              Category: {item.category.name}
            </p>
            <p className="text-sm text-gray-600 mb-2">Price: ${item.price}</p>
            <p className="text-sm text-gray-600 mb-2">
              Stock Quantity: {item.stock}
            </p>
            <div className="flex items-center mb-2">
              <div className="text-yellow-500">
              
            <Rate allowHalf defaultValue={4.5}/>
          {/* ★ ★ ★ ★ ☆ */}
          </div>
            </div>
            <p className="text-sm text-gray-600 text-justify mb-4">
              {item.description}
            </p>
            <Button type="primary">Contact Seller</Button>
          </div>
        </div>
      </div>
    </>
  );
}
