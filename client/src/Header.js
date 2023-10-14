export const Header = () => {
  return (
    <>
      <div id="header" className="flex flex-row justify-left items-center">
        <img className="m-4 ml-2 mr-3" src="meet-together.png" alt="meet together" />
        <div className="border border-black h-10 mr-3"></div>
        <img src="m2-favicon.png" alt="meet together" />
        <p className="text-xl pt-1 pb-1 pl-5 pr-5 ml-10 border border-5 border-black">About</p>
        <img className="" src='github.png' />
        <img className="" src='discord.png' />
      </div>
      <hr className="w-90 border border-black"></hr>
    </>
  );
};
