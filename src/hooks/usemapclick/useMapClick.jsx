import { useState, useEffect } from "react";


function useMapClick() {
  const [clickeId, setClickedID] = useState(null);

  const handelChange = (id) => {
    setClickedID(id);
  };
  return { clickeId, handelChange };
}

export default useMapClick;
