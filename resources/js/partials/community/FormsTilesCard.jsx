import React from 'react';
import {Link} from 'react-router-dom';
import EditMenu from '../../components/DropdownEditMenu';

function FormsTilesCard(props) {
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
                                    <Link className="inline-flex text-slate-800 hover:text-slate-900" target="_blank" to={props.link}>
                                        <h2 className="text-xl leading-snug justify-center font-semibold">{props.name}</h2>
                                    </Link>
                                    <div className="flex items-center">

                                        <span>
                                         <Link className="text-gray-500 mt-1 text-sm flex"
                                               target="_blank"
                                               to={props.link}>
                                             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5"
                                                  viewBox="0 0 20 20" fill="currentColor">
                                        <path
                                            d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path>
                                        <path
                                            d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path>
                                    </svg>
                                             {props.linkLabel}
                                    </Link>
                                    </span></div>
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
                                        <div className="font-medium text-slate-800">Hari ini</div>
                                        <div className="text-gray-500 mt-2 text-sm flex">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5"
                                                 viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd"
                                                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                                                      clipRule="evenodd"></path>
                                            </svg>
                                            <div className="ml-2">{props.today_leads + ' lead'}</div>
                                        </div>
                                        <div className="text-gray-500 mt-2 text-sm flex">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5"
                                                 viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd"
                                                      d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                                                      clipRule="evenodd"></path>
                                            </svg>
                                            <div
                                                className="ml-2">{props.today_click} klik
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-medium text-slate-800">Total lead</div>

                                        <div className="text-gray-500 mt-2 text-sm flex">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5"
                                                 viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd"
                                                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                                                      clipRule="evenodd"></path>
                                            </svg>
                                            <div className="ml-2">{props.total_leads + ' lead'}</div>
                                        </div>
                                        <div className="text-gray-500 mt-2 text-sm flex">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5"
                                                 viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd"
                                                      d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                                                      clipRule="evenodd"></path>
                                            </svg>
                                            <div
                                                className="ml-2">{props.click} klik
                                            </div>
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
                            href={props.leadLink}>
                            <div className="flex items-center justify-center">
                                <svg className="w-4 h-4 fill-current shrink-0 mr-2" viewBox="0 0 16 16">
                                    <path
                                        d="M8 0C3.6 0 0 3.1 0 7s3.6 7 8 7h.6l5.4 2v-4.4c1.2-1.2 2-2.8 2-4.6 0-3.9-3.6-7-8-7zm4 10.8v2.3L8.9 12H8c-3.3 0-6-2.2-6-5s2.7-5 6-5 6 2.2 6 5c0 2.2-2 3.8-2 3.8z"/>
                                </svg>
                                <span>Laporan</span>
                            </div>
                        </a>
                        <a
                            target={'_self'}
                            className="block flex-1 text-center text-sm text-slate-600 hover:text-slate-800 font-medium px-3 py-4 group"
                            href={props.editLink}>
                            <div className="flex items-center justify-center">
                                <svg
                                    className="w-4 h-4 fill-current text-slate-400 group-hover:text-slate-500 shrink-0 mr-2"
                                    viewBox="0 0 16 16">
                                    <path
                                        d="M11.7.3c-.4-.4-1-.4-1.4 0l-10 10c-.2.2-.3.4-.3.7v4c0 .6.4 1 1 1h4c.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4l-4-4zM4.6 14H2v-2.6l6-6L10.6 8l-6 6zM12 6.6L9.4 4 11 2.4 13.6 5 12 6.6z"/>
                                </svg>
                                <span>Edit</span>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FormsTilesCard;
