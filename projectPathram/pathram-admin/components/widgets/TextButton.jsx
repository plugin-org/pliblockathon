
function TextButton({ buttonName, onClickFunction }) {
  return <button onClick={onClickFunction} className="pt-1 text-primary underline border-b-primary hover:font-semibold duration-200 font-primaryTypefaceJosefin">{buttonName}</button>;
}

export default TextButton