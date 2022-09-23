import Link from "next/link";

function RaisedButtonSecondary({ buttonName, onClickFunction ,width="w-auto",link}) {
  return link ? (
    <Link href={link}>
      <button
        onClick={onClickFunction}
        className={`bg-secondary px-4 pt-2 text-customWhite  rounded-sm duration-200 hover:bg-primary hover:text-secondary border border-primary font-primaryTypefaceJosefin pb-1 sm:pb-0 ${width}`}
      >
        {buttonName}
      </button>
    </Link>
  ) : (
    <button
      onClick={onClickFunction}
      className={`bg-secondary px-4 pt-2  text-customWhite rounded-sm duration-200 hover:bg-primary hover:text-secondary border border-primary font-primaryTypefaceJosefin pb-1 sm:pb-0 ${width}`}
    >
      {buttonName}
    </button>
  );
}

export default RaisedButtonSecondary