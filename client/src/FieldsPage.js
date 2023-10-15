import React, { useState, useEffect } from "react";
import { ReactSortable } from "react-sortablejs";
import { active } from "sortablejs";
import { Link } from 'react-router-dom';

const group = () => {
  return (
    <div className="group">
      djsahdjsahdjasdkdka
    </div>
  )
}

export const Sort = (props) => {
  const { data, setData } = props;
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
      <div className="flex items-center">
        <p className="m-5 ml-28 text-3xl text-center flex-1">
          Drag & drop to rank the fields.
        </p>
        <div className="ml-auto">
          <Link to="/groups">
            <button type="button" className="bg-secondary h-12 pl-5 pr-5 mr-2 hover:bg-darker transition duration-50 ease-in-out">Submit</button>
          </Link>
        </div>
      </div>

      {/* if data is loading, show loading text */}
      {(data.length !== 0) ? <></> :
        <div className="flex justify-center">
          <p className="mt-16 text-3xl animate-dots">
            Loading
          </p>
        </div>
      }

      <ReactSortable className="flex flex-col flex-wrap items-center" list={data} setList={setData}>
        {data.map((item, i) => {
          let activeClass;
          if (item.active) { activeClass = ' active'}
          else { activeClass = ' inactive' }
          return (
            <div className={"flex m-3 items-center w-1/4 " + activeClass} key={i}>
              <p className="ml-5">{item.title}</p>
              <button className="ml-auto w-14 h-14 text-center text-3xl border-0" onClick={() => toggle(i)}>×</button>
            </div>)
        })}
      </ReactSortable>
    </div>
  )
}