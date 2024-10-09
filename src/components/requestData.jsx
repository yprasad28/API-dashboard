import Icon from "@mdi/react";
import { mdiPencilBoxOutline, mdiContentCopy } from "@mdi/js";
// import { Button, ConfigProvider, Input, Select } from "antd";
import { useEffect, useState } from "react";
import { useGetUsers, usePostPosts, useGetComments } from "./API";

function RequestUsers({ headers, setApiSequence }) {
  const { data, error, loading } = useGetUsers(headers);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>A network error was encountered</p>;
  return (
    <div className="h-32 overflow-y-scroll bg-black rounded-lg grow">
      <div className="sticky top-0 flex items-center justify-between p-3 px-4 bg-bg">
        <h3>Request</h3>
        <div className="flex items-center gap-5">
          { <Icon
            path={mdiPencilBoxOutline}
            size={1}
            className="transition-all duration-200 hover:translate-y-1"
          /> }
          <Icon path={mdiContentCopy} size={0.9} />
        </div>
      </div>
      {data.map((user, index) => {
        return (
          <ul className="px-4 py-5 text-sm" key={"users list" + index}>
            <li>{"{"}</li>
            {Object.entries(user).map((entry, index) => {
              if (entry[0] == "id" || entry[0] == "name" || entry[0] == "email")
                return (
                  <li
                    className="pl-4"
                    key={"request" + index}
                  >{`"${entry[0]}" : "${entry[1]}"`}</li>
                );
            })}
            <li>{"},"}</li>
          </ul>
        );
      })}
    </div>
  );
}

function RequestPosts({ headers, apiSequence, setApiSequence }) {
  const [bodyObj, setBodyObj] = useState({ title: "title", body: "body" });
  const { data, error, loading } = usePostPosts(1, bodyObj, headers);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>A network error was encountered</p>;

  // useEffect(() => {
  // if (
  //   apiSequence[apiSequence.length - 1].api == "postPosts" &&
  //   apiSequence[apiSequence.length - 1].data != data
  // )
  //   setApiSequence((prev) => {
  //     let newSeq = [...prev];
  //     newSeq[newSeq.length - 1].data = data;
  //     return newSeq;
  //   });
  // }, [data]);

  return (
    <div className="h-32 overflow-hidden bg-black rounded-lg grow">
      <div className="flex items-center justify-between p-3 px-4 bg-bg">
        <h3>Request</h3>
        <div className="flex items-center gap-5">
          <Icon
            path={mdiPencilBoxOutline}
            size={1}
            className="transition-all duration-200 hover:translate-y-1"
          />
          <Icon path={mdiContentCopy} size={0.9} />
        </div>
      </div>
      <ul className="px-4 py-5 text-sm">
        <li>{"{"}</li>
        {Object.entries(bodyObj).map((entry, index) => {
          return (
            <li
              className="pl-4"
              key={"request" + index}
            >{`"${entry[0]}" : "${entry[1]}"`}</li>
          );
        })}
        <li>{"},"}</li>
      </ul>
    </div>
  );
}

function RequestComments({ headers, apiSequence, setApiSequence }) {
  const [isCommentEditing, setIsCommentEditing] = useState(false);
  const [statePostId, setStatePostId] = useState(1);
  const { data, error, loading } = useGetComments(statePostId, headers);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>A network error was encountered</p>;
  return (
    <div className="h-32 overflow-y-scroll bg-black rounded-lg max-w-[610px] grow">
      <div className="sticky top-0 flex items-center justify-between p-3 px-4 bg-bg">
        <h3>Request</h3>
        <div className="flex items-center gap-5">
          <Icon
            path={mdiPencilBoxOutline}
            size={1}
            className="transition-all duration-200 hover:translate-y-1"
            onClick={() => {
              setIsCommentEditing(!isCommentEditing);
            }}
          />
          <Icon path={mdiContentCopy} size={0.9} />
        </div>
      </div>
      {data.map((user, index) => {
        return (
          <ul className="px-4 py-5 text-sm" key={"users list" + index}>
            <li>{"{"}</li>
            {Object.entries(user).map((entry, index) => {
              if (isCommentEditing && entry[0] == "postId") {
                return (
                  <li>
                    <span>{entry[0]} : </span>
                    <input
                      type="text"
                      value={statePostId}
                      className="ml-4 text-black"
                      onChange={(e) => {
                        setStatePostId(e.target.value);
                      }}
                    />
                  </li>
                );
              }
              return (
                <li
                  className="pl-4"
                  key={"request" + index}
                >{`"${entry[0]}" : "${entry[1]}"`}</li>
              );
            })}
            <li>{"},"}</li>
          </ul>
        );
      })}
    </div>
  );
}

export { RequestUsers, RequestPosts, RequestComments };