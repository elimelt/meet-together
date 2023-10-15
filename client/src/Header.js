export const Header = () => {
  return (
    <>
      <div id="header" className="flex flex-row justify-left items-center min-w-lg">
        <img className="m-4 ml-2 mr-3 h-16" src="meet-together.png" alt="meet together" />
        <div className="border border-black h-10 mr-3" />
        <img className="h-16" src="m2-favicon.png" alt="meet together" />
        <p className="text-lg pl-2 pr-2 pb-1 ml-12 mr-5 border-b-4 border-transparent hover:border-black hover:border-b-2 hover:border-b border-opacity-0 hover:border-opacity-100 transition-transform transform hover:translate-y-px">ABOUT</p>
        <img className="h-6 ml-auto transform hover:scale-110 transition-transform" src='github.png' />
        <img className="h-6 ml-4 mr-2 transform hover:scale-110 transition-transform" src='discord.png' />
      </div>
      <hr className="border border-black"></hr>
    </>
  );
};
