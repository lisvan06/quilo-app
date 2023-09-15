import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Card } from "antd";
import Meta from "antd/es/card/Meta";
import BtnPublish from "./btnPublish";
import BtnEdit from "./btnEdit";
import BtnDelete from "./btnDelete";

export default function CardProduct(product: any) {
  // console.log("Product ", product.product);
  const item = product.product;
  return (
    <>
      <Card
        onClick={() => {
          console.log(item.id);
        }}
        hoverable
        style={{
          width: "16rem",
          margin: "0.8rem",
          boxShadow:
            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.19)",
        }}
        cover={<img alt="example" src="/detergente.jpg" />}
        actions={[
          <BtnPublish product={item} status="checked"></BtnPublish>,
          <BtnEdit id={item.id} route={`products`}></BtnEdit>,
          <BtnDelete id={item.id} name={"product"}></BtnDelete>,
        ]}
      >
        <Meta title={item.title} description={`$ ${item.price}`} />
        <div className="mt-0.5 text-gray-400 text-sm p-0">
          <p className="text-justify">{item.description.substring(0, 30)}...</p>
        </div>
      </Card>
    </>
  );
}

// <Card hoverable style={{ width: 300, marginTop: 16 }}>
//         <Meta
//           description={                   //Add your specific data here in description
//             <>
//               <div className="subject-card_extra-content">
//                <img src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" style={{width:20}}/>
//                <span>Data</span>
//               </div>

//               <div className="dashboard-subject_inline-actions">
//                 <Icon type="video-camera" />
//                 <p>
//                   Total Videos :<span> {5} </span>
//                 </p>
//               </div>

//               <Button htmlType="submit" icon="play-circle" className="custom-default-fill-btn">
//                 Continue Learning
//               </Button>

//               <Button htmlType="submit" icon="play-circle" className="custom-default-fill-btn">
//                 No Progress
//               </Button>
//             </>
//           }
//         />

//     </Card>
