import Icon from "@mdi/react";
import { mdiPencilBoxOutline } from "@mdi/js";
import { Button, ConfigProvider } from "antd";
import { useState } from "react";

function HeaderItems({ item, setHeaders, index }) {
  const [isKeyEditing, setIsKeyEditing] = useState(false);
  const [isValueEditing, setIsValueEditing] = useState(false);

  function handleKeyChange(e) {
    setHeaders((prev) => {
      const newArr = [...prev];
      newArr[index].key = e.target.value;
      return newArr;
    });
  }

  function handleValueChange(e) {
    setHeaders((prev) => {
      const newArr = [...prev];
      newArr[index].value = e.target.value;
      return newArr;
    });
  }

  return (
    <div className="overflow-hidden rounded-lg ">
      <div className="p-3 border-b-[1px] border-zinc-500 bg-altBg flex justify-between items-center">
        {isKeyEditing ? (
          <input
            type="text"
            value={item.key}
            onChange={handleKeyChange}
            className="px-2 py-1 bg-black rounded-md"
          />
        ) : (
          <p>{item.key}</p>
        )}

        <Icon
          path={mdiPencilBoxOutline}
          size={0.85}
          onClick={() => {
            setIsKeyEditing(!isKeyEditing);
          }}
          className="transition-all duration-200 hover:translate-y-1"
        />
      </div>
      <div className="flex items-center justify-between p-3 bg-black">
        {isValueEditing ? (
          <input
            type="text"
            value={item.value}
            onChange={handleValueChange}
            className="px-2 py-1 text-black bg-white rounded-md"
          />
        ) : (
          <p>{item.value}</p>
        )}
        <Icon
          path={mdiPencilBoxOutline}
          size={0.85}
          onClick={() => {
            setIsValueEditing(!isValueEditing);
          }}
          className="transition-all duration-200 hover:translate-y-1"
        />
      </div>
    </div>
  );
}

export default function Aside({ headers, setHeaders }) {
  return (
    <section className="flex flex-col w-1/5 gap-6 p-6">
      <ConfigProvider
        theme={{
          components: {
            Button: {
              defaultBg: "#3f3f46",
              defaultBorderColor: "#3f3f46",
              defaultColor: "#f257a0",
              defaultHoverBg: "#f257a0",
              defaultHoverBorderColor: "#3f3f46",
              defaultHoverColor: "#111",
              defaultActiveBg: "#3f3f46",
              defaultActiveBorderColor: "#3f3f46",
              defaultActiveColor: "#f257a0",
            },
          },
        }}
      >
        <Button
          className="h-10 font-medium"
          onClick={() => {
            setHeaders((prev) => {
              const newArr = [...prev];
              newArr.push({ key: "", value: "" });
              return newArr;
            });
          }}
        >
          + Add Headers
        </Button>
      </ConfigProvider>
      <h1 className="text-xl font-medium">Headers</h1>
      <div className="flex flex-col gap-3 text-sm">
        {headers.map((item, index) => {
          return (
            <HeaderItems
              item={item}
              setHeaders={setHeaders}
              index={index}
              key={"Header Item" + index}
            />
          );
        })}
      </div>
    </section>
  );
}