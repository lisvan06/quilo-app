import { Button, Space } from "antd";
import { useRouter } from "next/navigation";

export default function BtnAdd({ route, text }) {
  const router = useRouter();
  const handleClickAdd = function () {
    router.push(`/dashboard/${route}/add`);
  };
  return (
    <>
      <Button type="primary" className="my-button" onClick={handleClickAdd}>{text}</Button>
    </>
  );
}
