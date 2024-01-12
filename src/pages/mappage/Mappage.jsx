import { useCallback, useEffect, useRef, useState } from "react";
import Map from "../../components/map/Map";
import Loader from "../../components/loader/Loader";
import styles from "./Map.module.css";

function Mappage() {
  const map = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const handelChange = useCallback(() => {
    setIsLoading(true);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(true);
    }, 500);
    setIsLoading(false);
  }, []);
  return (
    <div className={styles.map_wrapper}>
      {isLoading === false ? <Loader /> : <Map onChange={handelChange} />}
    </div>
  );
}

export default Mappage;
