import React, { useEffect, useState } from "react";
import styles from "./CardList.module.css";
import LocalStorageAPI from "../../api/API/LocalStorageAPI";
import Card from "./card/Card";
import { useAnnouncement } from "../../context/Anouncement";

function CardList() {
  const data = useAnnouncement();
  const [carddata, setCardData] = useState(null);

  useEffect(() => {
    LocalStorageAPI.setData(data);
    setCardData((prev) => (prev = LocalStorageAPI.getData()));
  }, [data]);

  return (
    <div className="max-h-screen w-20%">
    <div className={styles.cardlist_container}>
      <Card data={carddata} />
    </div>
    </div>
    
  );
}

export default CardList;
