import { useId } from "react";
import { Select, Space } from "antd";

export type Categories = {
  id: string;
  name: string;
};

export type SelectProps = {
  label: String;
  name: String;
  categories: Categories[];
  defaultValue: string;
  childToParent: Function;
  value: "name";
  onChange: (e: any) => string;
  options: { id: String; name: string }[];
};

function childToParent(e: any) {
  return e;
  console.log(e);
}

export const ComboCategory = ({ label, categories, childToParent }: any) => {
  const handleChange = (value: { value: string; label: React.ReactNode }) => {
    childToParent(value); // { value: "lucy", key: "lucy", label: "Lucy (101)" }
  };

  const cat = categories;

  const id = useId();
  return (
    <>
      <label htmlFor="{id}">{label}</label>
      <Select
        id="comboProdCat"
        key="categoryId"
        //defaultValue={"Select a category"}
        onChange={handleChange}
        options={cat.map((item: any) => ({
          value: item.id,
          label: item.name,
          key: item.id,
        }))}
      ></Select>
    </>
  );
};
