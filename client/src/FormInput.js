import { Link } from 'react-router-dom';

export const FormInput = () => {
  return (
    <div className="bg-secondary w-20 h-20 m-auto flex flex-row itmes-center">
      <input className="border-radius-1 w-full text-lg ml-5 focus:outline-none bg-gradient-to-r from-black via-black via-black via-black to-secondary text-transparent bg-clip-text" type="text" placeholder="link here..."></input>
      <Link to='/fields'>
        <button className="pl-5 pr-5 w-full h-full hover:bg-darker transition duration-50 ease-in-out" type="button">Submit</button>
      </Link>
    </div>
  );
}