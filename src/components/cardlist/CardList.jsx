import React, { useEffect, useState } from "react";
import styles from "./CardList.module.css";
import LocalStorageAPI from "../../api/API/LocalStorageAPI";
import Card from "./card/Card";
import { useAnnouncement } from "../../context/allanncontext/Anouncement";

function CardList() {
  const data = useAnnouncement();
  const [carddata, setCardData] = useState(null);

  useEffect(() => {
    LocalStorageAPI.setData(data);
    setCardData((prev) => (prev = LocalStorageAPI.getData()));
  }, [data]);

  return (
    <div className="max-h-screen w-full lg:w-20%">
    <div className={styles.cardlist_container}>
    <h1 className="font-semibold text-xl text-slate-700">Знайдено оголошень</h1>
      <Card data={carddata} />
    </div>
    </div>
    
  );
}

export default CardList;
