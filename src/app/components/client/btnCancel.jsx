import { Button, Space } from "antd";
import { useRouter } from "next/navigation";

export default function BtnCancel({ text }) {
  const router = useRouter();
  const handleClick = function () {
    router.back();
  };
  return (
    <>
      <Button danger type="primary" onClick={handleClick}>
        {text}
      </Button>
    </>
  );
}
