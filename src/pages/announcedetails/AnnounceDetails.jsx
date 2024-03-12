import React from "react";
import { useLoaderData, Link } from "react-router-dom";

function AnnounceDetails() {
  const announce = useLoaderData();

  return (
    <div className="w-full block overflow-y-scroll max-h-screen">
      {announce.length !== 0
        ? announce.map((el) => (
            <div
              key={el.id}
              className="flex flex-col items-center justify-center w-full bg-slate-50 p-5 rounded-md gap-2 min-h-full"
            >
              <h1>{el.text}</h1>
              <img src={el.img} alt="picture" />
              <button
                type="button"
                className="bg-green-400 w-56 py-3 px-5 rounded-md hover:bg-green-600 duration-75"
              >
                <Link to={`/`}>На головну</Link>
              </button>
            </div>
          ))
        : null}
    </div>
  );
}

export default AnnounceDetails;
