import Link from "next/link"

const Sidelinks = (props) => {
    return (
        <Link href={props.href}>
            <div className={props.current ? "flex items-center px-4 py-2 text-gray-700 bg-gray-100 rounded-md mt-5" : "flex items-center px-4 py-2 mt-5 text-gray-200 transition-colors duration-300 transform rounded-md hover:bg-white hover:bg-opacity-30 hover:text-gray-700"}>
                <img className="object-cover h-7 w-7 drop-shadow-sm" src={props.image} alt="nav link img" />
                <span className="mx-2 font-medium">{props.name}</span>
            </div>
        </Link>
    )
}



export default function Sidebar(props) {
    return (
        <div className="flex flex-col w-64 h-screen px-4 py-8 border-r bg-teal-700">
            <h2 className="text-3xl font-semibold text-white">XDC Health</h2>

            <div className="relative mt-6">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none">
                        <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                </span>

                <input type="text" className="w-full py-2 pl-10 pr-4 text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring" placeholder="Search" />
            </div>

            <div className="flex flex-col justify-between flex-1 mt-3">
                <nav>
                    {props.links && props.links.map((value, index) => (
                        <Sidelinks
                            // key={index}
                            name={value.name}
                            image={value.image}
                            current={props.page == value.name ? true : false}
                            href={value.link}
                        />
                    ))}
                </nav>

                <div className="flex items-center px-4 -mx-2">
                    <img className="object-cover mx-2 rounded-full h-9 w-9" src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80" alt="avatar" />
                    <h4 className="mx-2 font-medium text-gray-200 hover:underline">Org Admin</h4>
                </div>
            </div>
        </div>
    )
}