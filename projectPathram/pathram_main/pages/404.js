import Link from "next/link";
import Layout from "../components/Layout";

export default function FourOhFour() {
  return (
    <Layout
      Component={
        <>
          <div className="h-[34rem] flex-col flex items-center justify-center track-main-div">
            <div className="h-40 w-40 rounded-md bg-primary shadow-2xl rotate-45 flex items-center justify-center">
              <h1 className=" -rotate-45  text-secondary text-6xl font-primaryTypefaceJosefin">
                404
              </h1>
            </div>
            <h1 className="text-2xl sm:text-4xl uppercase font-primaryTypefaceJosefin text-primary mt-10 font-bold drop-shadow-lg">
              Dasthavej not found
            </h1>
            <p className=" text-sm sm:text-base text-customBlack drop-shadow-md">
              OOPS! The page you’re trying to find is unavailable.
            </p>
          </div>
        </>
      }
    />
  );
}
