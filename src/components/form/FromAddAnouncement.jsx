import React, { useEffect, useState, useCallback } from "react";
import { useAnnouncement, useDispatch } from "../../context/allanncontext/Anouncement";
import { ANNOUNCE_ACTION_TYPES } from "../../context/allanncontext/types";
import { FilterKeys } from "./utils";
import styles from "./FormAdd.module.css";

function FromAddAnouncement() {
  const [newformdata, setNewFormdata] = useState(null);
  const dispatch = useDispatch();
  const data = useAnnouncement();

  const handelSubmit = useCallback(async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const formdata = await FilterKeys(data);
    setNewFormdata((prev) => (prev = formdata));
    e.target.reset();
  }, []);

  useEffect(() => {
    if (newformdata !== null) {
      const id = Number(data.length + 1);
      dispatch({
        type: ANNOUNCE_ACTION_TYPES.addAnnounce,
        payload: {
          id: id,
          img: newformdata.img,
          geo: newformdata.geo,
          bbox: newformdata.bbox,
        },
      });
    }
  }, [newformdata]);

  return (
    <div className="flex flex-col items-center gap-3">
      <h1 className="font-semibold uppercase">Додати оголошення</h1>
      <form onSubmit={handelSubmit} className={styles.form}>
        <label>Введіть місто:</label>
        <input type="text" name="city" placeholder="місто" />
        <label>Введіть назву вулиці:</label>
        <input type="text" name="street" placeholder="вулиця" />
        <label>Введіть номер будинку/будівлі:</label>
        <input type="text" name="number" placeholder="номер" />
        <label>Додати фото</label>
        <input
          type="file"
          name="img"
          accept="image/*"
          className={styles.input_file}
        />
        <button type="submit">Додати</button>
      </form>
    </div>
  );
}

export default FromAddAnouncement;
