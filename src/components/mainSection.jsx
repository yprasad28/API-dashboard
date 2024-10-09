import Icon from "@mdi/react";
import { mdiPencilBoxOutline, mdiContentCopy } from "@mdi/js";
import { Button, ConfigProvider, Input, Select } from "antd";
import { useEffect, useState } from "react";
import { RequestUsers, RequestPosts, RequestComments } from "./requestData";
import { COMMENTS1, USERS } from "../constantsapi";

function PrioritySelector() {
  return (
    <ConfigProvider
      theme={{
        token: {
          fontSize: 16,
          colorBgBase: "#18181b",
          colorPrimary: "#f257a0",
          colorText: "#fff",
          colorTextPlaceholder: "#fff",
          controlOutlineWidth: 1,
          paddingSM: 6,
          colorIcon: "#fff",
          colorIconHover: "#fff",
        },
        components: {
          Select: {
            activeOutlineColor: "#f257a0",
            optionSelectedBg: "#3f3f46",
          },
        },
      }}
    >
      <Select
        defaultValue="med"
        options={[
          {
            value: "easy",
            label: <span className="p-2 text-green-500">Easy</span>,
          },
          {
            value: "med",
            label: <span className="p-2 text-yellow-500">Medium</span>,
          },
          {
            value: "high",
            label: <span className="p-2 text-red-500">Hard</span>,
          },
        ]}
        className="w-full h-10"
      />
    </ConfigProvider>
  );
}

function APISelector({ index, apiSequence, setApiSequence }) {
  return (
    <ConfigProvider
      theme={{
        token: {
          fontSize: 14,
          colorBgBase: "#3f3f46",
          colorPrimary: "#f257a0",
          colorText: "#fff",
          colorTextPlaceholder: "#fff",
          controlOutlineWidth: 1,
          paddingSM: 16,
          colorIcon: "#fff",
          colorIconHover: "#fff",
        },
        components: {
          Select: {
            activeOutlineColor: "#f257a0",
            optionSelectedBg: "#18181b",
          },
        },
      }}
    >
      <Select
        defaultValue={
          apiSequence[index].api == "" ? "Select API" : apiSequence[index].api
        }
        options={[
          {
            value: "getUsers",
            label: <span className="p-2">Get Users List</span>,
          },
          {
            value: "postPosts",
            label: <span className="p-2">Create New Post</span>,
          },
          {
            value: "getComments",
            label: <span className="p-2">Get Comments by Post</span>,
          },
        ]}
        className="w-full h-10"
        onChange={(val) => {
          setApiSequence((prev) => {
            const newSeq = [...prev];
            newSeq[index].api = val;
            return newSeq;
          });
        }}
      />
    </ConfigProvider>
  );
}

function ExpectedOutcome({ expected, setExpected }) {
  const [isExpectedEditing, setIsExpectedEditing] = useState(false);
  return (
    <div className="max-w-[610px] relative h-32 overflow-y-scroll bg-black rounded-lg grow">
      <div className="sticky top-0 flex items-center justify-between p-3 px-4 bg-bg">
        <h3>Expected Outcome</h3>
        <div className="flex items-center gap-5">
          <Icon
            path={mdiPencilBoxOutline}
            size={1}
            className="transition-all duration-200 hover:translate-y-1"
            onClick={() => {
              setIsExpectedEditing(!isExpectedEditing);
            }}
          />
          <Icon path={mdiContentCopy} size={0.9} />
        </div>
      </div>
      <ul className="px-4 py-5 text-sm">
        {isExpectedEditing
          ? expected.map((item, i) => {
              return (
                <div key={"e" + i}>
                  <li>{"{"}</li>
                  {Object.entries(item).map((entry, index) => {
                    return (
                      <div key={"expected" + index}>
                        <input
                          type="text"
                          className="ml-4 text-black"
                          value={entry[0]}
                          key={"expected key" + index}
                          onChange={(e) => {
                            setExpected((prev) => {
                              const newArr = [...prev];
                              let val = newArr[index][e.target.dataset.tempkey];
                              delete newArr[index][e.target.dataset.tempkey];
                              newArr[index][e.target.value] = val;
                              return newArr;
                            });
                          }}
                          data-tempkey={entry[0]}
                        />
                        <span>:</span>
                        <input
                          type="text"
                          className="ml-4 text-black"
                          value={entry[1]}
                          onChange={(e) => {
                            setExpected((prev) => {
                              const newArr = [...prev];
                              newArr[index][e.target.dataset.tempkey] =
                                e.target.value;
                              return newArr;
                            });
                          }}
                          data-tempkey={entry[0]}
                        />
                      </div>
                    );
                  })}
                  <li>{"}"}</li>
                </div>
              );
            })
          : expected.map((entry, index) => {
              return (
                <div key={"exp" + index}>
                  <li>{"{"}</li>
                  {Object.entries(entry).map((item, i) => {
                    return (
                      <li
                        className="pl-4"
                        key={"expected" + index + i}
                      >{`"${item[0]}" : "${item[1]}"`}</li>
                    );
                  })}
                  <li>{"}"}</li>
                </div>
              );
            })}
      </ul>
      <p className="absolute p-1 px-3 text-xs bg-green-800 rounded-md w-fit top-16 right-4">
        201
      </p>
    </div>
  );
}

export default function MainSection({ headers }) {
  const [apiSequence, setApiSequence] = useState([
    { api: "getUsers", data: "" },
  ]);
  const [expected, setExpected] = useState([{ "": "" }]);
  const btnStyles = {
    defaultBg: "#3f3f46",
    defaultBorderColor: "#3f3f46",
    defaultColor: "#fff",
    defaultHoverBg: "#f257a0",
    defaultHoverBorderColor: "#3f3f46",
    defaultHoverColor: "#111",
    defaultActiveBg: "#3f3f46",
    defaultActiveBorderColor: "#3f3f46",
    defaultActiveColor: "#f257a0",
  };

  useEffect(() => {
    if (apiSequence[apiSequence.length - 1].api == "getUsers") {
      setExpected(USERS);
    }
    if (apiSequence[apiSequence.length - 1].api == "postPosts") {
    }
    if (apiSequence[apiSequence.length - 1].api == "getComments") {
      setExpected(COMMENTS1);
    }
  }, [apiSequence]);

  return (
    <main className="flex flex-col gap-5 px-8 py-6 bg-altBg grow rounded-l-2xl">
      <div className="flex justify-between">
        <h1 className="text-2xl font-medium text-devzery">New Test Case</h1>
        <div>
          <ConfigProvider
            theme={{
              components: {
                Button: {
                  defaultBg: "#f257a0",
                  defaultBorderColor: "#3f3f46",
                  defaultColor: "#fff",
                  defaultHoverBg: "#18181b",
                  defaultHoverBorderColor: "#18181b",
                  defaultHoverColor: "#f257a0",
                  defaultActiveBg: "#f257a0",
                  defaultActiveBorderColor: "#f257a0",
                  defaultActiveColor: "#000",
                },
              },
            }}
          >
            <Button className="w-24 h-10 mx-4 font-medium">Add</Button>
          </ConfigProvider>
          <ConfigProvider
            theme={{
              components: {
                Button: {
                  defaultBg: "#18181b",
                  defaultBorderColor: "#18181b",
                  defaultColor: "#fff",
                  defaultHoverBg: "#f257a0",
                  defaultHoverBorderColor: "#3f3f46",
                  defaultHoverColor: "#111",
                  defaultActiveBg: "#18181b",
                  defaultActiveBorderColor: "#18181b",
                  defaultActiveColor: "#f257a0",
                },
              },
            }}
          >
            <Button className="w-24 h-10 font-medium">Cancel</Button>
          </ConfigProvider>
        </div>
      </div>
      <section className="flex gap-5 grow">
        <div className="flex flex-col w-1/2 gap-5">
          <div>
            <h2 className="mb-3 text-xl">Test Case Title</h2>
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: "#f257a0",
                  colorTextPlaceholder: "#999",
                  colorBgBase: "#18181b",
                  colorText: "#fff",
                },
              }}
            >
              <Input.TextArea
                rows={6}
                className="p-5 text-white border-none"
                placeholder="Describe what this test case is about"
              />
            </ConfigProvider>
          </div>
          <div className="flex flex-col gap-5 p-5 rounded-lg bg-bg grow">
            <h2 className="text-lg">Add API Sequence</h2>
            {apiSequence.map((item, index) => {
              return (
                <APISelector
                  index={index}
                  apiSequence={apiSequence}
                  setApiSequence={setApiSequence}
                  key={"API Sequence" + index}
                />
              );
            })}
            <div className="flex gap-5">
              <ConfigProvider
                theme={{
                  components: {
                    Button: btnStyles,
                  },
                }}
              >
                <Button
                  className="w-10 h-10 font-bold"
                  onClick={() => {
                    const newSeq = [...apiSequence];
                    newSeq.push({ api: "", data: "" });
                    setApiSequence(newSeq);
                  }}
                >
                  +
                </Button>
              </ConfigProvider>
              <ConfigProvider
                theme={{
                  components: {
                    Button: btnStyles,
                  },
                }}
              >
                <Button
                  className="w-10 h-10 font-bold"
                  onClick={() => {
                    const newSeq = [...apiSequence];
                    newSeq.pop();
                    setApiSequence(newSeq);
                  }}
                >
                  -
                </Button>
              </ConfigProvider>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-1/2 gap-5">
          <div>
            <h2 className="mb-3 text-xl">Priority</h2>
            <PrioritySelector />
          </div>
          {apiSequence[apiSequence.length - 1].api == "getUsers" ? (
            <RequestUsers headers={headers} setApiSequence={setApiSequence} />
          ) : apiSequence[apiSequence.length - 1].api == "postPosts" ? (
            <RequestPosts
              headers={headers}
              apiSequence={apiSequence}
              setApiSequence={setApiSequence}
            />
          ) : (
            <RequestComments
              headers={headers}
              setApiSequence={setApiSequence}
              apiSequence={apiSequence}
            />
          )}
          <ExpectedOutcome expected={expected} setExpected={setExpected} />
        </div>
      </section>
    </main>
  );
}