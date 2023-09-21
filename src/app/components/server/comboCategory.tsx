import { useId, useState } from "react";
import { Select, Space } from "antd";

export type Categories = {
  id: string;
  name: string;
};

export const ComboCategory = ({ categories, childToParent, actualValue }: any) => {
  const id = useId();
  const [value, setValue] = useState(actualValue);

  const onChange = (value: { value: string; label: React.ReactNode }) => {
    setValue(value);
    childToParent(value);
  };

  const cat = categories;

  return (
    <>
      <Select
        id="comboProdCat"
        key="categoryId"
        value={value}
        // showSearch
        placeholder="Select a category"
        // optionFilterProp="children"
        onChange={onChange}
        // onSearch={onSearch}
        options={cat.map((item: any) => ({
          value: item.id,
          label: item.name,
          key: item.id,
        }))}
      ></Select>
    </>
  );
};
