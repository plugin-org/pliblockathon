import Link from "next/link";

function Footer() {
  // flex w-full flex-col space-y-5  sm:flex-row sm:justify-evenly
  return (
    <footer className="h-20 bg-actionBlack flex items-center justify-center sm:justify-between sm:px-20">
      <div className="flex items-center  justify-center flex-col sm:flex-row  font-secondaryTypefaceDmSans sm:space-x-5">
        <img src="/Logo 3.svg" className="hidden sm:block h-6 sm:h-6" alt="" />
        <div className="h-8 w-px bg-secondary hidden sm:block rounded-md"></div>
        <p className="text-white text-xs sm:text-sm">
          ©2022 Pathram | All Rights Reserved
        </p>
        <div className="sm:hidden flex items-center space-x-2 mt-3">
          <img src="/icons/reddit.svg" className="w-5" alt="" />
          <img src="/icons/md.svg" className="w-5" alt="" />

          <img src="/icons/in.svg" className="w-5" alt="" />

          <img src="/icons/kb.svg" className="w-5" alt="" />
        </div>
      </div>
      <div className="  hidden sm:flex   items-center space-x-2 ">
        <img src="/icons/reddit.svg" className="w-5" alt="" />
        <img src="/icons/md.svg" className="w-5" alt="" />

        <img src="/icons/in.svg" className="w-5" alt="" />

        <img src="/icons/kb.svg" className="w-5" alt="" />
      </div>
    </footer>
  );
}

export default Footer;
