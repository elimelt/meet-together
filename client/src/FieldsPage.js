import React, { useState, useEffect } from "react";
import { ReactSortable } from "react-sortablejs";
import { Link } from 'react-router-dom';

export const Sort = (props) => {
  const { formData, setFormData } = props;
  const [loading, setLoading] = useState(false);

  const findLastActive = () => {
    let i = 0;
    while (formData[i].active) i++;
    return i;
  }

  const activate = i => {
    let firstInactiveIdx = findLastActive();
    const act = formData.slice(0, firstInactiveIdx)

    const inact = [
        ...formData.slice(firstInactiveIdx, i),
        ...formData.slice(i + 1, formData.length)
    ];

    const updated = formData[i];
    updated.active = true;

    const newArray = [
        ...act,
        updated,
        ...inact
    ]

    setFormData(newArray);
  }

  const deactivate = i => {
    const newArray = [
        ...formData.slice(0, i),
        ...formData.slice(i + 1, formData.length),
        formData[i]
    ];

    newArray[newArray.length - 1].active = false;

    setFormData(newArray);
  }

  const toggle = i => {
    formData[i].active ? deactivate(i) : activate(i);
  }

  useEffect(() => {
    setLoading(!loading)
  }, [formData])

  return (
    <div id="fields" className="">
      <div className="flex items-center">
        <p className="m-5 ml-28 text-3xl text-center flex-1">
          Drag & drop to rank your form's questions by importance!
        </p>
        <div className="ml-auto">
          <Link to="/groups">
            <button type="button" className="bg-secondary h-12 pl-5 pr-5 mr-2 hover:bg-darker transition duration-50 ease-in-out">Submit</button>
          </Link>
        </div>
      </div>

      {/* if formData is loading, show loading text */}
      {(formData.length !== 0) ? <></> :
        <div className="flex justify-center">
          <p className="mt-16 text-3xl animate-dots">
            Loading
          </p>
        </div>
      }

      <ReactSortable className="flex flex-col flex-wrap items-center" list={formData} setList={setFormData}>

        {formData.map((item, i) => {
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