import Link from "next/link";
import RaisedButton from "../components/widgets/RaisedButton";
import TextButton from "../components/widgets/TextButton";

function About() {
  return (
    <div className="sm:px-16 p-5  py-[1.2rem] bg-secondary">
      <div className="flex justify-between  h-[2rem]  text-gray-600">
        <Link href="/">
          <img src="/logo.svg" alt="" />
        </Link>
      </div>
      <div className=" w-full   mt-5 flex justify-center  ">
        <div className="p-10 bg-layerBlack bg-opacity-50 text-customWhite font-secondaryTypefaceDmSans   rounded-md   space-y-6 sm:space-y-4   ">
          <div className="flex flex-row items-center space-x-2 py-6 ">
            <div className="w-full sm:w-1/2 border-r-4 border-white pr-2">
              <h1 className="text-5xl sm:text-6xl font-extrabold tracking-wide text-right text-primary font-primaryTypefaceJosefin">
                NO
              </h1>
              <h1 className="text-5xl sm:text-6xl font-extrabold tracking-wide text-right text-primary font-primaryTypefaceJosefin">
                MORE
              </h1>
            </div>

            <div className="w-full sm:w-1/2 text-customWhite">
              <ul>
                <li className="font-semibold text-sm sm:text-base">Forgery</li>
                <li className="font-semibold text-sm sm:text-base">
                  Paperwork
                </li>
                <li className="font-semibold text-sm sm:text-base">
                  Workforce
                </li>
                <li className="font-semibold text-sm sm:text-base">
                  Damage to Documents
                </li>
              </ul>
            </div>
          </div>

          <div>
            <div className="flex items-center">
              <div>
                <h2 className="text-2xl font-primaryTypefaceJosefin font-semibold text-primary mr-4">
                  How it works
                </h2>
              </div>
              <div className="w-20 h-1 bg-gray-500 rounded-lg"></div>
            </div>
            <img src="/index_story.svg" className=" w-full" alt="" />
            <div className="w-full  flex flex-col sm:flex sm:flex-row space-y-4 sm:space-y-0 mt-5">
              <div className="w-full sm:w-1/3">
                <p className=" border-l-4 border-customWhite pl-2 sm:mb-3 rounded-sm ">
                  <span className="uppercase font-extrabold text-sm text-Third">
                    Step 1
                  </span>
                  <br />A person rasies a request by adding the necessary
                  requirements.
                </p>
              </div>
              <div className="w-full sm:w-1/3">
                <p className=" border-l-4 pl-2 sm:mb-3 border-customWhite rounded-sm ">
                  <span className="uppercase font-extrabold text-sm text-Third">
                    Step 2
                  </span>
                  <br />
                  The signers either accept or reject the request. Status can be
                  tracked.
                </p>
              </div>
              <div className="w-full sm:w-1/3">
                <p className=" border-l-4 pl-2 sm:mb-3 border-customWhite rounded-sm ">
                  <span className="uppercase font-extrabold text-sm text-Third">
                    Step 3
                  </span>
                  <br />
                  The notification regarding the status of request is sent to
                  the person who raised it.
                </p>
              </div>
            </div>
          </div>
          <div>
            <div className="flex items-center">
              <div>
                <h2 className="text-2xl font-semibold font-primaryTypefaceJosefin text-primary mr-4">
                  What's in it?
                </h2>
              </div>
              <div className="w-20 h-1 bg-gray-500 rounded-lg"></div>
            </div>
            <div>
              <div>
                <div className="flex flex-col sm:flex-row-reverse  ">
                  <img
                    src="/track.svg"
                    className="w-full  sm:w-1/4 p-4"
                    alt=""
                  />
                  <p className="text-justify sm:w-3/4 mt-4 sm:mr-4">
                    <span className="text-xl font-primaryTypefaceJosefin font-semibold text-primary">
                      Tracking
                    </span>
                    <br />
                    <p>
                      Generally the tracking of a request is impossible because
                      it is done manually or physically but here it is possible.
                      Every one can check the status of the event at any point
                      of time even if it is not rasied by them.
                    </p>
                    <p>
                      In the traditional procedure, it's tough to track the
                      progress of request raised. Dasthavej, clears the clutter.
                      Our solution can track every detail of raised request.
                      This makes it very clear in addressing the delay which we
                      usually experience in the current procedure.
                    </p>
                  </p>
                </div>
              </div>
              <div>
                <div className="flex flex-col sm:flex-row  ">
                  <img
                    src="/stellar.svg"
                    className="w-full  sm:w-1/4 p-4"
                    alt=""
                  />
                  <p className="text-justify sm:w-3/4 mt-4 sm:ml-4">
                    <span className="text-xl font-primaryTypefaceJosefin font-semibold text-primary">
                      Blockchain
                    </span>
                    <br />
                    Every request is a transaction on blockchain. Every user is
                    an account on blockchain. This technology makes our solution
                    unique and leaves no stone unturned in securing the
                    application and the procedure followed.
                  </p>
                </div>
              </div>
              <div>
                <div className="flex flex-col sm:flex-row-reverse  ">
                  <img
                    src="/multisig.svg"
                    className="w-full  sm:w-1/4 p-4"
                    alt=""
                  />
                  <p className="text-justify sm:w-3/4 mt-4 sm:mr-4">
                    <span className="text-xl font-primaryTypefaceJosefin font-semibold text-primary">
                      Multisignature Protocol
                    </span>
                    <br />
                    Every request as previously mentioned is a transaction on
                    blockchain ledger which is written only after approval of
                    necessary authenticators.
                  </p>
                </div>
              </div>
              <div>
                <div className="flex flex-col sm:flex-row  ">
                  <img
                    src="/ipfs.svg"
                    className="w-full  sm:w-1/4 p-4"
                    alt=""
                  />
                  <p className="text-justify sm:w-3/4 mt-4 sm:mr-4">
                    <span className="text-xl font-primaryTypefaceJosefin font-semibold text-primary">
                      Inter Planetary File System
                    </span>
                    <br />
                    Inter Planetary File System is an added advantage to our
                    application which makes the data completely immutable. Every
                    request is considered as a transaction under a specific
                    category. The notification is sent to all the signers
                    related to that category Once all signs are done then the
                    txn is written to the ledger
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
