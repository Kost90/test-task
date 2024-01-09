import { Link } from "react-router-dom";
import { useSingleAnnouncement } from "../../../context/singleannounc/Singleannounce";
import styles from "./Card.module.css";

export default function Card({ data }) {
  const announce = useSingleAnnouncement();

  return (
    <>
      {data !== null && announce.length === 0
        ? data.map((el) => (
            <div key={el.id} className={styles.flexcontainer}>
              <h1>{el.text}</h1>
              <img src={el.img} alt="picture" />

              <button
                type="button"
                className="bg-green-400 w-full py-3 px-5 rounded-md hover:bg-green-600 duration-75"
              >
                <Link to={`announce/${el.id}`}>Орендувати</Link>
              </button>
            </div>
          ))
        : null}
      {announce.length !== 0
        ? announce.map((el) => (
            <div key={el.id} className={styles.flexcontainer}>
              <h1>{el.text}</h1>
              <img src={el.img} alt="picture" />
              <button
                type="button"
                className="bg-green-400 w-full py-3 px-5 rounded-md hover:bg-green-600 duration-75"
              >
                <Link to={`announce/${el.id}`}>Орендувати</Link>
              </button>
            </div>
          ))
        : null}
    </>
  );
}
