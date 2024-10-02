import { addListener } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import { addToPaste, updateToPastes } from "../redux/pasteSlice";

const ViewPaste = () => {
  const { id } = useParams();
  const allPaste = useSelector((state) => state.paste.pastes);
  const paste = allPaste.filter((p) => p._id === id)[0];

  return (
    <div>
      <div className="flex flex-row gap-7 place-content-between">
        <input
          className="p-2 rounded-2xl mt-2 w-[66%] pl-4"
          type="text"
          placeholder="Enter Title Here"
          value={paste.title}
          disabled
          onChange={(e) => setTitle(e.target.value)}
        ></input>
      </div>
      <div className="mt-8">
        <textarea
          className="rounded-2xl mt-4 min-w-[500px] p-4"
          value={paste.content}
          placeholder="Enter Content Here"
          disabled
          onChange={(e) => {
            setValue(e.target.value);
          }}
          rows={20}
        ></textarea>
      </div>
    </div>
  );
};

export default ViewPaste;
