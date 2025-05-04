
const Footer = () => {
    return (
      <footer className=" px-6 py-10  sm:px-10 md:px-15 lg:px-20 xl:px-20 2xl:px-48 bg-gray-900 text-gray-300">
        <div className="max-w-auto mx-auto flex flex-col md:flex-row md:justify-between gap-16 md:gap-0 ">
          <div className="md:w-1/3">
            <h2 className="text-gray-100 text-2xl sm:text-3xl font-extrabold mb-6">
              BLX<span className="text-[#4b5ed7]">.GG</span>
            </h2>
            <p className="text-gray-400 max-w-xs sm:max-w-md leading-relaxed text-sm sm:text-base mb-10">
              BLX.GG strives to build a fun and easy experience of getting free Robux. We do this by rewarding consistent and honest users with a lot of bonuses, promocodes, and events.
            </p>
            <div className="flex gap-4 mt-0 flex-wrap">
              <a href="#" aria-label="TikTok" className="border border-gray-600 rounded-lg p-3 text-gray-400 hover:text-white hover:border-white transition">
                <i className="fab fa-tiktok fa-lg"></i>
              </a>
              <a href="#" aria-label="Instagram" className="border border-gray-600 rounded-lg p-3 text-gray-400 hover:text-white hover:border-white transition">
                <i className="fab fa-instagram fa-lg"></i>
              </a>
              <a href="#" aria-label="YouTube" className="border border-gray-600 rounded-lg p-3 text-gray-400 hover:text-white hover:border-white transition">
                <i className="fab fa-youtube fa-lg"></i>
              </a>
              <a href="#" aria-label="Discord" className="border border-gray-600 rounded-lg p-3 text-gray-400 hover:text-white hover:border-white transition">
                <i className="fab fa-discord fa-lg"></i>
              </a>
              <a href="#" aria-label="X" className="border border-gray-600 rounded-lg p-3 text-gray-400 hover:text-white hover:border-white transition">
                <i className="fab fa-twitter fa-lg"></i>
              </a>
            </div>
          </div>
          <div className="md:w-2/3 flex flex-col sm:flex-row sm:justify-between text-gray-400 gap-12 sm:gap-16 ms-5">
            <div className="min-w-[160px] sm:min-w-[180px]">
              <h3 className="text-gray-100 font-bold mb-3 leading-snug text-base sm:text-lg">
                Ways to Earn Free Robux
              </h3>
              <ul className="space-y-2 max-w-[220px] text-sm sm:text-base">
                <li className="flex items-center gap-2 hover:text-white cursor-pointer transition">
                  <i className="fas fa-chevron-right"></i>
                  <span>Earn Robux Through Offerwalls</span>
                </li>
                <li className="flex items-center gap-2 hover:text-white cursor-pointer transition">
                  <i className="fas fa-chevron-right"></i>
                  <span>Rewards &amp; Promocodes</span>
                </li>
              </ul>
            </div>
            <div className="min-w-[140px] sm:min-w-[160px]">
              <h3 className="text-gray-100 font-bold mb-3 leading-snug text-base sm:text-lg">
                Blogs, Guides &amp; Tutorials
              </h3>
              <ul className="space-y-2 max-w-[160px] text-sm sm:text-base">
                <li className="flex items-center gap-2 hover:text-white cursor-pointer transition">
                <i className="fas fa-chevron-right"></i>
                  <span>Blogs</span>
                </li>
              </ul>
            </div>
            <div className="min-w-[160px] sm:min-w-[180px]">
              <h3 className="text-gray-100 font-bold mb-3 leading-snug text-base sm:text-lg">
                Help &amp; Support
              </h3>
              <ul className="space-y-2 max-w-[220px] text-sm sm:text-base">
                <li className="flex items-center gap-2 hover:text-white cursor-pointer transition">
                  <i className="fas fa-chevron-right"></i>
                  <span>Help Center</span>
                </li>
                <li className="flex items-center gap-2 hover:text-white cursor-pointer transition">
                  <i className="fas fa-angle-double-right"></i>
                  <span>How to Earn Free Robux</span>
                </li>
                <li className="flex items-center gap-2 hover:text-white cursor-pointer transition">
                  <i className="fas fa-angle-double-right"></i>
                  <span>How to Withdraw</span>
                </li>
                <li className="flex items-center gap-2 hover:text-white cursor-pointer transition">
                  <i className="fas fa-angle-double-right"></i>
                  <span>Missing Robux?</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-20 border-t border-gray-700 pt-6 max-w-7xl mx-auto flex flex-col sm:flex-row justify-between text-gray-400 text-sm px-6 sm:px-0">
          <div className="mb-4 sm:mb-0 flex gap-6 justify-center sm:justify-start flex-wrap">
            <a href="#" className="hover:text-white transition whitespace-nowrap">Privacy Policy</a>
            <a href="#" className="hover:text-white transition whitespace-nowrap">Terms of Service</a>
          </div>
          <div className="text-center sm:text-right text-gray-400 text-sm max-w-full sm:max-w-[400px] mx-auto sm:mx-0">
            <span>©{new Date().getFullYear()} BLX.GG All rights reserved.</span>
            <span className="font-bold text-gray-100 ml-2 block sm:inline">We are not affiliated with ROBLOX Corporation.</span>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;