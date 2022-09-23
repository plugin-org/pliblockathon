export default function Field(props){
    return (
      <div className="mt-3">
        <label
          className="text-gray-700 text-sm font-semibold mb-2"
          htmlFor={props.label.replace(" ", "_")}
        >
          {props.label}
        </label>
        <input
          id={props.label.replace(" ", "_")}
          type={props.type}
          onChange={props.onChange}
          pattern={props.pattern}
          className="block w-full md:max-w-[500px] px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
          required
          multiple
        />
      </div>

    )
}