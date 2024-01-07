import React, { useEffect, useState } from "react";
import { useAnnouncement, useDispatch } from "../../context/Anouncement";
import { ANNOUNCE_ACTION_TYPES } from "../../context/AnouncementReducer";
import MaptilerAPI from "../../api/API/MaptilerAPI";

function FromAddAnouncement() {
  const [newformdata, setNewFormdata] = useState(null);
  const dispatch = useDispatch();
  const data = useAnnouncement();

  const handelSubmit = async (e) => {
    e.preventDefault();
    const newdata = {};
    const formdata = new FormData(e.target);
    for (const [key, value] of formdata) {
      if (key === "img") {
        newdata[key] = URL.createObjectURL(value);
      } else if (key === "geo") {
        newdata[key] = await MaptilerAPI.getGeo(value);
      } else {
        newdata[key] = value;
      }
    }
    setNewFormdata((prev) => (prev = newdata));
  };

  useEffect(() => {
    if (newformdata !== null) {
      console.log(newformdata.geo);
      dispatch({
        type: ANNOUNCE_ACTION_TYPES.addAnnounce,
        payload: {
          id: data.length + 1,
          img: newformdata.img,
          text: newformdata.text,
          geo: newformdata.geo.features[0].geometry.coordinates,
        },
      });
    }
  }, [newformdata]);

  return (
    <div>
      <form onSubmit={handelSubmit}>
        <label>Write name of car</label>
        <input type="text" name="text" />
        <label>Add picture</label>
        <input type="file" name="img" accept="image/*" />
        <label>Write search</label>
        <input type="text" name="geo" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default FromAddAnouncement;
