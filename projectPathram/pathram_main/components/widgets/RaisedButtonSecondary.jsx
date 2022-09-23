import Link from "next/link";

function RaisedButtonSecondary({
  buttonName,
  onClickFunction,
  width = "w-auto",
  link,
}) {
  return link ? (
    <Link href={link}>
      <button
        onClick={onClickFunction}
        className={`bg-secondary px-4 pt-2 text-primary rounded-sm duration-200 hover:bg-primary hover:text-customWhite border border-primary font-primaryTypefaceJosefin ${width}`}
      >
        {buttonName}
      </button>
    </Link>
  ) : (
    <button
      onClick={onClickFunction}
      className={`bg-secondary px-4 pt-2 text-primary rounded-sm duration-200 hover:bg-primary hover:text-customWhite border border-primary font-primaryTypefaceJosefin ${width}`}
    >
      {buttonName}
    </button>
  );
}

export default RaisedButtonSecondary;
