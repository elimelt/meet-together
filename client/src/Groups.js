const Group = (props) => {
  const { number, data } = props;
  return (
    <div className="w-60 bg-secondary border-t-1 pt-1 pb-1 m-5">
      <h1 className="text-3xl text-center m-3 pt-2 pb-1">Group {number}</h1>
      {data.map((element, i) => {
        return <p key={i} className="border-t-2 flex border-black p-1 pl-2">{element.name}</p>
      })}
    </div>
  );
}

export const Groups = (props) => {
  const { data } = props;
  return (
    <div id="group" className="flex flex-wrap justify-center items-start">
      <Group number='1' data={data} />
      <Group number='1' data={[{name: "WASKDAJAKJDALAA"}]} />
      <Group number='1' data={[{name: "WASKDAJAKJDALAA"}, {name: "WASKDAJAKJDALAA"}, {name: "WASKDAJAKJDALAA"}, {name: "WASKDAJAKJDALAA"}, {name: "WASKDAJAKJDALAA"}, {name: "WASKDAJAKJDALAA"}, {name: "WASKDAJAKJDALAA"}, {name: "WASKDAJAKJDALAA"}, {name: "WASKDAJAKJDALAA"}]} />

      <Group number='1' data={data} />

      <Group number='1' data={data} />
      <Group number='1' data={data} />
      <Group number='1' data={data} />
      <Group number='1' data={data} />
      <Group number='1' data={data} />

      <Group number='1' data={data} />
      <Group number='1' data={data} />


    </div>
  );
}