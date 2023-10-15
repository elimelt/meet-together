import React, { useState, useEffect } from "react";
import { ReactSortable } from "react-sortablejs";


export default function Sort(props) {
  const [data, setData] = useState([
    { id: 1, name: 'elijah', active: true},
    { id: 2, name: 'sriya', active: true},
    { id: 3, name: 'rasmus', active: true},
    { id: 4, name: 'simon', active: true},
  ]);
  const [loading, setLoading] = useState(false);

   let lastActive = data.length;

  const toggle = i => {
    const newActiveArray = [...data];
    newActiveArray[i].active 
    // const element = arr.splice(index, 1)[0];
    //arr.push(element);
  }

  useEffect(() => {
    setLoading(!loading)
  }, [data])

  return (
    <div className="App">
      <header className="App-header">
        <p>
          drag & drop to rank elements!
        </p>
        <ReactSortable list={data} setList={setData}>
          {data.map((item, i) => {
            if (item.active) {
              return (
              <div className="flex w-1/2 active" key={item.id}>
                <p>{item.name}</p>
                <button className="active w-14 h-14 text-center text-sm border-0" onClick={() => toggle(i)}>×</button>
              </div>
              )
            } else {
              return (<div className="flex inactive" key={item.id}>
                <p>{item.name}</p>
                <button className="inactive w-14 h-14 text-center text-sm border-0" onClick={() => toggle(i)}>×</button>
                </div>)
            }
          })}
        </ReactSortable>
      </header>
    </div>
  )
}