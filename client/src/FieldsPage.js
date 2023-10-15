import React, { useState, useEffect } from "react";
import { ReactSortable } from "react-sortablejs";
import { active } from "sortablejs";

const group = () => {
  return (
    <div className="group">
      djsahdjsahdjasdkdka
    </div>
  )
}

export const Sort = (props) => {
  const [data, setData] = useState([
    { id: 1, name: 'elijah', active: true},
    { id: 2, name: 'sriya', active: true},
    { id: 3, name: 'rasmus', active: true},
    { id: 4, name: 'simon', active: true},
    { id: 5, name: 'max', active: true},
    { id: 6, name: 'bella', active: true},
    { id: 7, name: 'turner', active: true}
  ]);
  const [loading, setLoading] = useState(false);

  let lastActive = data.length;

  const toggle = i => {
    const newActiveArray = [...data];
    newActiveArray[i].active = !newActiveArray[i].active;
    // const element = arr.splice(index, 1)[0];
    //arr.push(element);
  }

  useEffect(() => {
    setLoading(!loading)
  }, [data])

  return (
    <div id="fields" className="">
      <p className="text-3xl text-center m-5">
        Drag & drop to rank the fields.
      </p>
      <ReactSortable className="flex flex-col flex-wrap items-center" list={data} setList={setData}>
        {data.map((item, i) => {
          let activeClass;
          if (item.active) { activeClass = ' active'}
          else { activeClass = ' inactive' }
          return (
            <div className={"flex m-3 items-center w-1/4 " + activeClass} key={item.id}>
              <p className="ml-5">{item.name}</p>
              <button className="ml-auto w-14 h-14 text-center text-3xl border-0" onClick={() => toggle(i)}>×</button>
            </div>)
        })}
      </ReactSortable>
    </div>
  )
}