export default function Card(props) {
    return (
        <div className="bg-transparent mt-14 m-12">
            <h1 className="text-2xl font-semibold text-gray-700 mb-3">{props.title}</h1>
            <div className="max-w-sm overflow-hidden bg-white rounded-lg shadow-lg min-w-full">
                {props.children}
            </div>
        </div>
    )
}