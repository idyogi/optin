import React, {Component} from 'react';
import PanelLayout from "../../../Layouts/PloiTheme/PanelLayout";
import TableData from "../../../Components/TableData";
import {InputGroup} from "reactstrap";
import {Link} from "@inertiajs/inertia-react";
import moment from "moment";
import {toast} from "react-toastify";
import Paginate from "../../../Components/Paginate";

function Campaigns({campaigns, list_count, sender_count}) {
    return (
        <div>
            <PanelLayout title={'Broadcast campaign'} trailing={(
                <a className="inline-flex items-center justify-center text-sm font-medium transition-all ease-in-out duration-100 focus:outline-none focus:ring border rounded-md border-primary-500 bg-primary-500 text-white shadow hover:bg-primary-400 hover:border-primary-400 focus:border-primary-700 focus:bg-primary-600 px-3 py-2 text-sm"
                   target="_self"
                   href="/panel/campaigns/create"> Create Campaign </a>)}>
                <div className="py-6">
                    <div className="mx-auto w-full px-8 max-w-5xl space-y-6">
                        <div
                            className="divide-y divide-gray-200 rounded-lg bg-white shadow dark:divide-gray-800 dark:bg-gray-700 dark:text-gray-300">
                            <div
                                className="grid grid-cols-1 gap-px rounded-lg bg-gray-200 dark:bg-gray-800 md:grid-cols-3">
                                <div
                                    className="rounded-tl-lg bg-white p-6 dark:bg-gray-700 dark:text-white rounded-bl-lg">
                                    <p
                                        className="text-sm text-gray-500 dark:text-gray-200">Lists</p><p
                                    className="text-xl">{list_count}</p><p
                                    className="mt-4 text-sm"><a
                                    className="text-primary-600 dark:text-primary-400 border-primary-200 border-b border-dotted font-medium"
                                    href="/panel/lists">View lists</a></p></div>
                                <div className="bg-white p-6 dark:bg-gray-700 dark:text-white"><p
                                    className="text-sm text-gray-500 dark:text-gray-200">Campaigns</p><p
                                    className="text-xl">{campaigns.data.length}</p><p
                                    className="mt-4 text-sm"><a
                                    className="text-primary-600 dark:text-primary-400 border-primary-200 border-b border-dotted font-medium"
                                    href="/panel/campaigns">View campaigns</a></p></div>
                                <div
                                    className="rounded-tr-lg bg-white p-6 dark:bg-gray-700 dark:text-white rounded-br-lg">
                                    <p
                                        className="text-sm text-gray-500 dark:text-gray-200">Devices</p><p
                                    className="text-xl">{sender_count}</p><p className="mt-4 text-sm"><a
                                    className="text-primary-600 dark:text-primary-400 border-primary-200 border-b border-dotted font-medium"
                                    href="/panel/devices">View devices</a></p></div>
                            </div>
                        </div>


                        {campaigns.data.length === 0 && (
                            <div className="p-8">

                                <div
                                    className="text-left relative mx-auto flex max-w-md flex-col items-center justify-center space-y-6 rounded-lg border p-6 dark:border-gray-600">
                                    <div
                                        className="absolute top-0 right-0 -mt-5 -mr-5 flex h-12 w-12 items-center justify-center rounded-lg bg-white shadow dark:bg-gray-500">
                                        <i className="fa text-primary-500 text-xl dark:text-gray-300 fa-globe"></i>
                                    </div>
                                    <header className="max-w-xs space-y-2"><h2
                                        className="text-xl font-semibold tracking-tight dark:text-gray-400">You don't
                                        have
                                        any
                                        campaigns
                                        yet</h2><p
                                        className="text-md font-medium text-gray-500 dark:text-gray-400">Currently
                                        you do
                                        not own
                                        any campaigns. Luckily AdminSelvi makes this real easy for you to do.</p>
                                    </header>
                                    <a disabled="false"
                                       className="inline-flex items-center justify-center text-sm font-medium transition-all ease-in-out duration-100 focus:outline-none focus:ring border rounded-md border-primary-500 bg-primary-500 text-white shadow hover:bg-primary-400 hover:border-primary-400 focus:border-primary-700 focus:bg-primary-600 px-3 py-2 text-sm"
                                       target="_self" href="/panel/campaigns/create">Create campaign</a></div>
                            </div>)}
                        <TableData
                            title={'Campaigns'}
                            headers={['Title', 'Status', '', 'Updated at']}
                        >
                            {campaigns.data.map((item, index) => {
                                const campaign = item.data;
                                return (<tr key={index}>
                                        <td className="px-4 py-2">
                                            <a className="text-primary-600 dark:text-primary-400 border-primary-200 border-b border-dotted font-medium"
                                               href={`/panel/campaigns/${campaign.uuid}/edit`}>
                                                {campaign.name}
                                            </a>
                                            {(campaign.status !== 'done') && (

                                                <div>
							<span className="text-semibold tooltipstered" data-popup="tooltip">
								{campaign.SubscriberCount} contacts
							</span><br/>

                                                    {(campaign.status !== 'new') && (
                                                        <span
                                                            className="text-muted2 d-block">
                                                        Scheduled at: {moment(campaign.scheduled_at).format('DD/MM/YYYY HH:mm')}
                                                            <br/>{moment(campaign.scheduled_at).fromNow()}
                                                    </span>)}
                                                </div>)}
                                        </td>
                                        <td className="px-4 py-2">
                                            {campaign.status}
                                        </td>
                                        <td className="px-4 py-2">
                                            {campaign.status === 'done' && (<div className="stat-fix-size-sm">
                                                <div className="single-stat-box pull-left ml-20">
                                                    <span
                                                        className="no-margin text-primary stat-num">{campaign.log_failed_percentage}</span>
                                                    <div className="progress progress-xxs">
                                                        <div className="progress-bar progress-bar-info">
                                                        </div>
                                                    </div>
                                                    <span
                                                        className="text-semibold text-nowrap">{campaign.log_sent} / {campaign.log_count}</span>
                                                    <br/>
                                                    <span className="text-muted">Sent</span>
                                                </div>
                                            </div>)}
                                        </td>
                                        <td className="px-4 py-2">
                                            {moment(campaign.updated_at).format('DD/MM/YYYY HH:mm')}
                                        </td>
                                    </tr>
                                )
                            })}
                        </TableData>
                        <div className="mt-8">
                            <Paginate pagination={campaigns.links} from={campaigns.from} to={campaigns.to}
                                      total={campaigns.total}/>
                        </div>
                    </div>
                </div>
            </PanelLayout>
        </div>
    )
        ;
}

export default Campaigns;