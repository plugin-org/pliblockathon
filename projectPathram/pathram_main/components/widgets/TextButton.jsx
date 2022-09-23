import Link from "next/link";

function TextButton({ buttonName, onClickFunction, link }) {
  return link ? (
    <Link href={link}>
      <button
        onClick={onClickFunction}
        className="pt-1 text-customWhite underline border-b-primary hover:font-semibold duration-200 font-primaryTypefaceJosefin"
      >
        {buttonName}
      </button>
    </Link>
  ) : (
    <button
      onClick={onClickFunction}
      className="pt-1 text-customWhite underline border-b-primary hover:font-semibold duration-200 font-primaryTypefaceJosefin"
    >
      {buttonName}
    </button>
  );
}

export default TextButton;
