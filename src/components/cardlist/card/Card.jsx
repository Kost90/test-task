export default function Card({ data }) {
  return (
    <>
      {data !== null ? (
        data.map((el) => (
          <div
            key={el.id}
            className="flex flex-col items-center justify-center w-full bg-slate-50 p-5 rounded-md"
          >
            <h1>{el.text}</h1>
            <img src={el.img} alt="picture" />
          </div>
        ))
      ) : (
        <>
          <h1>don't have any data</h1>
        </>
      )}
    </>
  );
}
