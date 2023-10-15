import { useState } from "react";

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

const populateGroups = (responseData) => {
  const k = document.getElementById('k-groups').value;

  console.log(responseData);

  // Do algorithm here to seperate into groups using k
  // [[group 1], [group 2], [group 3]]

  // with response from algo just setGroupData(response)
}

export const Groups = (props) => {
  const [groupData, setGroupData] = useState([]);

  const { responseData } = props;
  return (
    <>
      <div className="flex justify-center items-center m-5">
        <h1 className="text-3xl">Enter the amount of groups:</h1>
        <input id="k-groups" onClick={() => { populateGroups() }} min='1' max={100} type='number' maxLength={3} className="h-10 w-16 ml-4 mt-2 bg-secondary p-2 focus:outline-none" />
        <button onClick={() => { populateGroups(responseData) }} type="button" className="bg-secondary h-10 pl-5 pr-5 mt-2 ml-4 hover:bg-darker transition duration-50 ease-in-out">Submit</button>
      </div>
      <div id="group" className="flex flex-wrap justify-center items-start">
        {(groupData.length === 0) ? <p>waiting...</p> :
        <>
          {groupData.map((group, i) => {
            return <Group key={i} number={i} data={group} />
          })}
        </>
        }
      </div>
    </>
  );
}