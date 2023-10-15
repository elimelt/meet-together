const Group = (props) => {
  const { number } = props;
  return (
    <div className="w-60 h-60 bg-secondary">
      <h1 className="text-3xl text-center m-3">Group {number}</h1>
      <hr className="border border-black w-max"></hr>
    </div>
  );
}

export const Groups = () => {
  return (
    <div id="group">
      <Group number='1' />
    </div>
  );
}