import React, { useState } from "react";
// import LocalStorageAPI from '../../api/API/LocalStorageAPI';
import { useAnnouncement, useDispatch } from "../../context/Anouncement";
import { ANNOUNCE_ACTION_TYPES } from "../../context/AnouncementReducer";

function FromAddAnouncement() {
  const dispatch = useDispatch();
  const data = useAnnouncement();

  const handelSubmit = (e) => {
    e.preventDefault();
    const newdata = {};
    const formdata = new FormData(e.target);
    formdata.forEach((value, key) => {
      if (key === "img") {
        newdata[key] = URL.createObjectURL(value);
      } else {
        newdata[key] = value;
      }
    });
    dispatch({
      type: ANNOUNCE_ACTION_TYPES.addAnnounce,
      payload: {
        id: data.lenght + 1,
        img: newdata.img,
        text: newdata.text,
      },
    });
  };

  return (
    <div>
      <form onSubmit={handelSubmit}>
        <label htmlFor="max">Write name of car</label>
        <input type="text" name="text" />
        <label htmlFor="min">Add picture</label>
        <input type="file" name="img" accept="image/*" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default FromAddAnouncement;
