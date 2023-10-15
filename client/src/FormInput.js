import { Link } from 'react-router-dom';
import { getFormMetadata as getMetadata, getFormResponses as getResponses } from './tools/form.js';

const getFormID = async () => {
  const url = document.getElementById('input').value;

  // Using regular expression to extract the form ID
  const regex = /\/[ed]\/([^/]+)\/viewform/;
  const match = url.match(regex);

  if (match) {
    const formId = match[1];
    const metadata = await getMetadata(formId);
    const responses = await getResponses(formId);
    console.log(metadata)
    console.log(responses)
  } else {
    console.log("Form ID not found in the URL.");
  }
}

export const FormInput = () => {
  return (
    <div className="bg-secondary w-20 h-20 m-auto flex flex-row itmes-center">
      <input id='input' className="border-radius-1 w-full text-lg ml-5 focus:outline-none bg-gradient-to-r from-black via-black via-black via-black to-secondary text-transparent bg-clip-text" type="text" placeholder="link here..."></input>
      <button onClick={getFormID} className="pl-5 pr-5 w-full h-full hover:bg-darker transition duration-50 ease-in-out" type="button">Submit</button>
    </div>
  );
}