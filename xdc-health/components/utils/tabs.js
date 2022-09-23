function Tab(props) {
    return (
        <button className={props.current ? "h-10 px-4 py-2 -mb-px text-sm text-center text-blue-600 bg-transparent border-b-2 border-blue-500 sm:text-base whitespace-nowrap focus:outline-none" :
            "h-10 px-4 py-2 -mb-px text-sm text-center text-gray-700 bg-transparent border-b-2 border-transparent sm:text-base whitespace-nowrap cursor-base focus:outline-none hover:border-gray-400"
        }
            onClick={props.onClick}
        >
            <span className="mx-1 text-sm sm:text-base">{props.text}</span>
        </button>
    )
}

export default function Tabs(props) {
    return (
        <div className="inline-flex">
            {props.tabs && props.tabs.map((value, index) => (
                <Tab onClick={() => props.onClick(value)} text={value} current={props.current == value} />
            ))}
        </div>
    )
}