import ProductService from '@/app/api/products/service';
import { Switch } from 'antd';

export default function BtnPublish({product, status}){
    const onChange = (checked) => {
        // Change products to published true
        console.log(`switch to ${checked} with product ${product}`);
        try {
            product.published = checked;
            const ps = new ProductService();
            const res = ps.setPublised(product);
        } catch (error) {
            
        }
      };

    return <>
        <Switch defaultChecked={status} onChange={onChange} size="small"/>
    </>
}