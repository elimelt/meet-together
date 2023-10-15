const Group = (props) => {
  const { number, data } = props;
  return (
    <div className="w-60 bg-secondary border-t-1 pt-1 pb-1 m-5">
      <h1 className="text-3xl text-center m-3 pt-2 pb-1">Group {number}</h1>
      {data.map((element, i) => {
        return <p key={i} className="border-t-2 flex border-black p-1 pl-2">{element.title}</p>
      })}
    </div>
  );
}

export const Groups = (props) => {
  const { responseData } = props;
  return (
    <>
      <div className="flex justify-center">
        <h1 className="text-3xl">Enter the amount of groups:</h1>
        <input className="bg-secondary"></input>
      </div>
      <div id="group" className="flex flex-wrap justify-center items-start">
        <Group number='1' data={responseData} />
        <Group number='1' data={[{title: "WASKDAJAKJDALAA"}]} />
        <Group number='1' data={[{title: "WASKDAJAKJDALAA"}, {title: "WASKDAJAKJDALAA"}, {title: "WASKDAJAKJDALAA"}, {title: "WASKDAJAKJDALAA"}, {title: "WASKDAJAKJDALAA"}, {title: "WASKDAJAKJDALAA"}, {title: "WASKDAJAKJDALAA"}, {title: "WASKDAJAKJDALAA"}, {title: "WASKDAJAKJDALAA"}]} />
      </div>
    </>
  );
}