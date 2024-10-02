import { addListener } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { addToPaste, updateToPastes } from "../redux/pasteSlice";

const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch();
  const allPaste = useSelector((state) => state.paste.pastes);
  useEffect(() => {
    if (pasteId) {
      const paste = allPaste.find((p) => p._id === pasteId);

      setTitle(paste.title);
      setValue(paste.content);
    }
  }, [pasteId]);
  function createPaste() {
    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };

    if (pasteId) {
      //update
      dispatch(updateToPastes(paste));
    } else {
      //create
      dispatch(addToPaste(paste));
    }

    //after creation and updation
    setTitle("");
    setValue("");
    setSearchParams({});
  }
  return (
    <div>
      <div className="flex flex-row gap-7 place-content-between">
        <input
          className="p-2 rounded-2xl mt-2 w-[66%] pl-4"
          type="text"
          placeholder="Enter Title Here"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></input>
        <button onClick={createPaste} className="p-2 rounded-2xl mt-2">
          {pasteId ? "Update Paste" : "Create My Paste"}{" "}
        </button>
      </div>
      <div className="mt-8">
        <textarea
          className="rounded-2xl mt-4 min-w-[500px] p-4"
          value={value}
          placeholder="Enter Content Here"
          onChange={(e) => {
            setValue(e.target.value);
          }}
          rows={20}
        ></textarea>
      </div>
    </div>
  );
};

export default Home;
