import { Link } from 'react-router-dom';
import {
  getFormMetadata as getMetadata,
  getFormResponses as getResponses,
  processedFormdata as processResponses,
  processedMetadata as processMetadata
 } from './tools/form.js';

const getFormID = async (setFormData, setResponseData, formId) => {
  const url = document.getElementById('input').value;

  // Using regular expression to extract the form ID
  const regex = /\/[ed]\/([^/]+)\/viewform/;
  const match = url.match(regex);

  if (match) {
    const newFormId = match[1];
    const metadata = processMetadata(await getMetadata(newFormId));
    const responses = processResponses(await getResponses(newFormId));

    const newMetadata = metadata.map((element) => {
      const newElement = { ...element }
      newElement.active = true;
      newElement.weight = 0;
      return newElement;
    })
    setFormData(newMetadata);
    setResponseData(responses);
    formId.current = newFormId;
  } else {
    console.log("Form ID not found in the URL.");
  }
}

export const FormInput = (props) => {
  const { setFormData, setResponseData, formId } = props;



  return (
    <div>
      <h1 className='text-4xl text-center m-5 mb-5 mt-16 font-bold'>INPUT YOUR FORM</h1>
      <p className='text-center text-lg mb-8'>And we will make the magic happen! 🪄</p>
      <div className="bg-secondary w-3/5 h-20 m-auto flex flex-row items-center">
        <input id='input' className="border-radius-1 w-full text-lg ml-5 focus:outline-none bg-gradient-to-r from-black via-black via-black via-black to-secondary text-transparent bg-clip-text" type="text" placeholder="link here..."></input>
        <Link className='h-full' to="/fields">
          <button onClick={() => { getFormID(setFormData, setResponseData, formId) }} className="pl-5 pr-5 h-full hover:bg-darker transition duration-50 ease-in-out" type="button">Submit</button>
        </Link>
      </div>
    </div>
    
  );
}