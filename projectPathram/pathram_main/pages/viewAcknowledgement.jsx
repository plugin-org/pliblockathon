import Layout from "../components/Layout";
import RaisedButton from "../components/widgets/RaisedButton";

function ViewAcknowledgement({ res, ack }) {
  console.log(res);
  return (
    <Layout
      Component={
        <>
          <div className="max-w-5xl flex sm:flex-row flex-col justify-between items-center mx-auto py-10 px-4 sm:px-10 text-customBlack  ">
            <div className="">
              <h1>{res.template}</h1>
              <div dangerouslySetInnerHTML={{ __html: res.fields }}></div>
              <a href={`https://ipfs.io/ipfs/${ack}`} target="_blank">
                <RaisedButton buttonName="View On IPFS" />
              </a>
            </div>
            <div>
              <img
                src="/Approved_Dasthavej.png"
                className="h-40 -rotate-[15deg]"
              />
            </div>
          </div>
        </>
      }
    />
  );
}

export default ViewAcknowledgement;

export const getServerSideProps = async (ctx) => {
  console.log(ctx.query.ack);
  const ack = ctx.query.ack;

  if (ack == undefined || ack == "") {
    return {
      notFound: true,
    };
  }

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    cid: ack,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  let res;
  await fetch("https://rgu-hub1.herokuapp.com/ipfsGet", requestOptions)
    .then((response) => response.text())
    .then((result) => (res = result))
    .catch((error) => {
      console.log(error);
      return {
        notFound: true,
      };
    });

  if (res.includes("invalid CID")) {
    return {
      notFound: true,
    };
  }
  console.log(res);
  res = JSON.parse(res);
  console.log(ack);
  return {
    props: {
      res,
      ack,
    },
  };
};
