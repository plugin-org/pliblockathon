import Link from "next/link";

function RaisedButton({link, buttonName, onClickFunction,width='w-auto',disabled=false }) {
  return link ? (
    <Link href={link}>
      <button
        disabled={disabled}
        onClick={onClickFunction}
        className={`bg-primary px-4 ${width} text-customWhite rounded-sm duration-200 hover:bg-secondary hover:text-customBlack font-primaryTypefaceJosefin leading-4 pt-2 pb-1 `}
      >
        {buttonName}
      </button>
    </Link>
  ) : (
    <button
      onClick={onClickFunction}
      className={`bg-primary px-4 ${width} text-customWhite rounded-sm duration-200 hover:bg-secondary hover:text-customBlack font-primaryTypefaceJosefin leading-4 pt-2 pb-1 `}
    >
      {buttonName}
    </button>
  );
    
}

export default RaisedButton;
