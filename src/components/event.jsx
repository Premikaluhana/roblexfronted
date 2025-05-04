
const Event = () => {
    return (
      <div className=" flex flex-col items-center justify-center space-y-16 py-12 bg-gray-800 max-w-auto ">
        <div className="text-center px-4 max-w-md w-full">
          <h2 className="text-[#f04e45] font-semibold text-lg md:text-xl mb-6 whitespace-nowrap mx-auto">
            You have not earned enough Robux to participate.
          </h2>
          <h3 className="text-[#fff] font-extrabold text-xl md:text-2xl mb-4 whitespace-nowrap">
            Last claimed prizes:
          </h3>
          <div className="space-y-4">
            <div className="mx-auto rounded-lg border-2 border-[#6fcf97] bg-[#2a6b53] text-white text-lg font-normal py-3 px-6 max-w-[400px]">
              Chees********1102 won 15 Robux
            </div>
            <div className="mx-auto rounded-lg border-2 border-[#6fcf97] bg-[#2a6b53] text-white text-lg font-normal py-3 px-6 max-w-[370px] whitespace-nowrap overflow-x-auto">
              TOOT*******bob won 8 Robux
            </div>
            <div className="mx-auto rounded-lg border-2 border-[#6fcf97] bg-[#2a6b53] text-white text-lg font-normal py-3 px-6 max-w-[220px]">
              tx**et won 5 Robux
            </div>
            <div className="mx-auto rounded-lg border-2 border-[#6fcf97] bg-[#2a6b53] text-white text-lg font-normal py-3 px-6 max-w-[280px]">
              mik*****k62 won 5 Robux
            </div>
            <div className="mx-auto rounded-lg border-2 border-[#6fcf97] bg-[#2a6b53] text-white text-lg font-normal py-3 px-6 max-w-[320px]">
              Qtr****im won 8 Robux
            </div>
          </div>
        </div>
  
        <div className="max-w-6xl w-full px-4">
          <h1 className="text-3xl font-extrabold mb-12 text-center max-w-4xl mx-auto text-gray-300">
            How does the event work?
          </h1>
          <div className="flex flex-col md:flex-row gap-8 max-w-6xl w-full justify-center mx-auto">
            <div className="border  rounded-lg p-8 flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8 flex-1 bg-[#3b4a8a]">
              <img
                alt="3D Roblox style character wearing a black cap holding a shiny green hexagonal icon"
                className="w-[160px] h-[213px] object-contain"
                src="https://blx.gg/img/robloxguy-coin.webp"
              />
              <div className="max-w-xl">
                <h2 className="text-2xl font-extrabold leading-tight mb-4 text-gray-100">
                  Claim RBX to celebrate with us
                </h2>
                <p className="text-gray-300 text-base leading-relaxed">
                  Welcome to our Claim RBX Event! We are thrilled to celebrate both our first anniversary and the remarkable milestone of reaching 3,000 members on our Discord. In honor of these achievements, we are excited to host our first event. During this special seven-day event, you'll have the opportunity to earn free Robux by spinning the wheel once. Don't miss your chance and claim your RBX now!
                </p>
              </div>
            </div>
            <div className="bg-[#3b4a8a] rounded-lg p-8 flex-1 max-w-md shadow-md">
              <h2 className="text-2xl font-extrabold mb-4 text-gray-200">
                Requirements:
              </h2>
              <p className="text-gray-300 text-base leading-relaxed">
                To claim your rbx, simply earn a minimum of                5 Robux on our website. You can do this on our
                <a className="text-[#3b4a8a] underline font-semibold" href="#">
                  Earn page
                </a>.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default Event;