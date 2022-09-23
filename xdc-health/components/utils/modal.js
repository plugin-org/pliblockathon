export default function Modal(props) {
    return (
        <>
            <div className="relative flex justify-center">
                {
                    props.isOpen &&
                    (
                        <div
                            className="fixed inset-0 z-10 overflow-y-auto"
                            ariaLabelledby="modal-title" role="dialog" ariaModal="true"
                        >
                            <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0 bg-gray-500 bg-opacity-10 backdrop-blur-md">
                                <span
                                    className="hidden sm:inline-block sm:align-middle sm:h-screen"
                                    aria-hidden="true"
                                >
                                </span>
                                <div className="relative inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl rtl:text-right sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
                                    {props.children}
                                <div className="mt-5 sm:flex sm:items-center sm:justify-end">
                                <div className="sm:flex sm:items-center ">
                                    <button onClick={props.onCancel} className="w-full px-4 py-2 mt-2 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:mt-0 sm:w-auto sm:mx-2 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40">
                                        Cancel
                                    </button>

                                    <button onClick={props.onSubmit} className="w-full px-4 py-2 mt-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md sm:w-auto sm:mt-0 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40">
                                        Submit
                                    </button>
                                </div>
                            </div>
                                </div>
                            </div>
                        </div>
                    )
                }

            </div></>
    )
}