import { FaPlus } from "react-icons/fa"

function TableRow(props){
    return (
        <tr className="bg-white border-b hover:bg-gray-50">
            {props.patientName && (<th
                scope="row"
                className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap"
            >
                {props.patientName}
            </th>)}
            <td className="py-4 px-6">{props.date}</td>
            <td className="py-4 px-6">{props.time}</td>
            <td className="py-4 px-6">{props.appointmentType}</td>
            <td className="py-4 px-6">{props.likelyDiagnosis}</td>
            {props.onClick && (
                <td className="py-4 px-6">
                <button
                    onClick={()=>props.onClick(props)}
                    className="font-medium text-blue-600 hover:underline"
                >
                    Edit
                </button>
            </td>
            )}
        </tr>
    )
}

export default function Table(props) {
    return (
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
            <div className="pb-4 px-2 pt-2 bg-white flex justify-between">
                <label htmlFor="table-search" className="sr-only">
                    Search
                </label>
                <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none">
                            <path
                                d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                                stroke="currentColor"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </span>
                    <input
                        type="text"
                        className="w-72 py-[0.35rem] pl-10 pr-4 text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                        placeholder="Search"
                    />
                </div>
                {props.editable && (
                    <div>
                        <button className="flex items-center px-3 py-[0.35rem] font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
                            <FaPlus />
                            <span className="mx-2">Add</span>
                        </button>
                    </div>
                )}
                
            </div>
            <table className="w-full text-sm text-left text-gray-500 mt-4">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        {props.head && props.head.map((headField) => (
                            <th scope="col" className="py-3 px-6">
                            {headField}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {props.data && props.data.map((item) => (
                        <TableRow patientName={item.patientName} date={item.date} time={item.time} appointmentType={item.appointmentType} likelyDiagnosis={item.likelyDiagnosis} onClick={props.onClick} />
                    ))}
                </tbody>
            </table>
        </div>

    )
}