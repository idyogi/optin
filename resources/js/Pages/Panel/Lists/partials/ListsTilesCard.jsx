import React from 'react';
import {Link} from 'react-router-dom';

function ListsTilesCard(props) {
    const handleDelete = () => {
        window.location.href = props.deleteLink;

    };
    return (
        <div
            className="col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-lg rounded-sm border border-slate-200">
            <div className="flex flex-col h-full">
                {/* Card top */}
                <div className="grow p-5">
                    <div className="flex justify-between items-start">
                        {/* Image + name */}
                        <header>
                            <div className="flex mb-2">
                                <div className="mt-1 pr-1">
                                    <Link className="inline-flex text-slate-800 hover:text-slate-900" target="_blank"
                                          to={props.link}>
                                        <h2 className="text-xl leading-snug justify-center font-semibold">{props.name}</h2>
                                    </Link>
                                </div>
                            </div>
                        </header>
                    </div>
                    {/* Bio */}
                    <div className="mt-2">
                        <div className="text-sm">
                            <div className="flex-1 truncate">
                                <div className="sm:flex sm:items-center sm:justify-between">
                                    <div>
                                        <div className="font-medium text-slate-800">Kontak</div>

                                        <div className="text-gray-500 mt-2 text-sm flex">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5"
                                                 viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd"
                                                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                                                      clipRule="evenodd"></path>
                                            </svg>
                                            <div className="ml-2">{props.total + ' kontak'}</div>
                                        </div>
                                    </div>

                                </div>

                            </div>
                            {props.content}
                        </div>
                    </div>
                </div>
                {/* Card footer */}
                <div className="border-t border-slate-200">
                    <div className="flex divide-x divide-slate-200r">
                        <a
                            className="block flex-1 text-center text-sm text-indigo-500 hover:text-indigo-600 font-medium px-3 py-4"
                            href={props.link}>
                            <div className="flex items-center justify-center">
                                <svg className="w-4 h-4 fill-current shrink-0 mr-2" viewBox="0 0 16 16">
                                    <path
                                        d="M8 0C3.6 0 0 3.1 0 7s3.6 7 8 7h.6l5.4 2v-4.4c1.2-1.2 2-2.8 2-4.6 0-3.9-3.6-7-8-7zm4 10.8v2.3L8.9 12H8c-3.3 0-6-2.2-6-5s2.7-5 6-5 6 2.2 6 5c0 2.2-2 3.8-2 3.8z"/>
                                </svg>
                                <span>Kontak List</span>
                            </div>
                        </a>
                        <span
                            className="block flex-1 text-center text-sm text-danger-600 hover:text-danger-800 font-medium px-3 py-4 group cursor-pointer"
                            onClick={() => {

                                if (window.confirm('Are you sure you wish to delete this item?')) handleDelete()
                            }}
                        >
                            <div className="flex items-center justify-center">
                                <i className="fas fa-trash-alt text-danger-600 hover:text-danger-800 mr-1"></i>
                                <span>Delete</span>
                            </div>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ListsTilesCard;
