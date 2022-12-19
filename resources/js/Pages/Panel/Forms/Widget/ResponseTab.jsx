import React, {Component, useState} from 'react';
import ResponseFields from "../ResponseFields/ResponseFields";

function ResponseTab({responseFields}) {
    return (

        <div className="bg-white shadow-xl sm:rounded-lg py-4">
            <ResponseFields responseFields={responseFields}/>
            <div className="py-3 px-6 bg-gray-200 border-t-1 border-gray-300">
                <div className="mt-2">Standar Response</div>
                <button
                    className="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline mt-1 mr-1 bg-gray-600 text-white hover:bg-gray-700">text
                </button>
                <button
                    className="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline mt-1 mr-1 bg-gray-600 text-white hover:bg-gray-700">countdown
                </button>
                <button
                    className="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline mt-1 mr-1 bg-gray-600 text-white hover:bg-gray-700">konten
                    terkunci
                </button>
                <button
                    className="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline mt-1 mr-1 bg-gray-600 text-white hover:bg-gray-700">text
                    by status
                </button>
                <div className="mt-2">Viral Response</div>
                <button
                    className="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline mt-1 mr-1 bg-gray-600 text-white hover:bg-gray-700">share
                </button>
                <button
                    className="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline mt-1 mr-1 bg-gray-600 text-white hover:bg-gray-700">click
                </button>
                <button
                    className="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline mt-1 mr-1 bg-gray-600 text-white hover:bg-gray-700">link
                    rotator
                </button>
                <button
                    className="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline mt-1 mr-1 bg-gray-600 text-white hover:bg-gray-700">point
                </button>
                <button
                    className="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline mt-1 mr-1 bg-gray-600 text-white hover:bg-gray-700">leaderboard
                </button>
            </div>
        </div>
    );

}

export default ResponseTab;