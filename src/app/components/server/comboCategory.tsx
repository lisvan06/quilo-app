import { handleClientScriptLoad } from "next/script";
import { useId } from "react";

export type Categories = {
  id: string;
  name: string;
};

export type SelectProps = {
  label: String;
  value: String;
  categories: Categories[];
  defaultValue: string;
  childToParent: Function;
  onChange: (id: string) => void;
  options: { id: String; title: string }[];
};

function childToParent (e: any) {
  return e;
};

export const ComboCategory = ({
  label,
  categories,
  childToParent
}: SelectProps) => {
  const cat = categories;

  const id = useId();
  return (
    <>
      <label htmlFor="{id}">{label}</label>
      <select
        name="categoryId"
        id="comboProdCat"        
        onChange={childToParent as any}
        className="border border-slate-500 px-8 py-2 mx-0 dark:text-zinc-600 rounded-md"       
      >
        <option value="select">-- Select a Category --</option>
        {Array.isArray(cat) ? (
          cat.map((item: Categories) => (
            <option id={item.id} value={item.id} key={item.id}>
              {item.name}
            </option>
          ))
        ) : (
          <></>
        )}
      </select>
    </>
  );
};
