import React, { useState, useEffect } from "react";
import { ReactSortable } from "react-sortablejs";
import './App.css'


export default function App(props) {
  const [data, setData] = useState([
    { id: 1, name: 'elijah', active: true},
    { id: 2, name: 'sriya', active: true}
  ]);
  const [loading, setLoading] = useState(false);

  const toggle = i => {
    const newActiveArray = [...data];
    newActiveArray[i].active = !newActiveArray[i].active;
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
              <div className= "active" key={item.id}>
                <p>{item.name}</p>
                <button onClick={() => toggle(i)}></button>
              </div>
              )
            } else {
              return (<div className="inactive" key={item.id}>
                <p>{item.name}</p>
                <button onClick={() => toggle(i)}></button>
                </div>)
            }
          })}
        </ReactSortable>
      </header>
    </div>
  )
}