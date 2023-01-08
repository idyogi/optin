import React from 'react';
import RightMenu from "../../../Components/RightMenu";
import PanelLayout from "../../../Layouts/PloiTheme/PanelLayout";
import UsersTilesCard from "../../../partials/community/UsersTilesCard";
import FormsTilesCard from "../../../partials/community/FormsTilesCard";

function IndexForm({forms, config}) {

    return (
        <PanelLayout title={'List Form'} subTitle={''} trailing={(
            <a className="inline-flex items-center justify-center text-sm font-medium transition-all ease-in-out duration-100 focus:outline-none focus:ring border rounded-md border-primary-500 bg-primary-500 text-white shadow hover:bg-primary-400 hover:border-primary-400 focus:border-primary-700 focus:bg-primary-600 px-3 py-2 text-sm"
               target="_self"
               href="/panel/forms/create"> Create Form </a>)}>
            <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
                <div className="grid grid-cols-12 gap-6">
                    {
                        forms.map(item => {
                            return (
                                <FormsTilesCard
                                    key={item.id}
                                    id={item.id}
                                    name={item.title}
                                    today_leads={item.today_leads}
                                    total_leads={item.total_leads}
                                    today_click={item.today_views}
                                    click={item.total_views}
                                    link={item.slug}
                                    linkLabel={config.app.url+'/'+item.slug}
                                    location={item.location}
                                    editLink={'/panel/forms/' + item.uuid + '/edit'}
                                    leadLink={'/panel/forms/' + item.uuid + '/leads'}
                                />
                            )
                        })
                    }
                </div>
            </div>
            {forms.length === 0 && (
                <div className="p-8">
                    <div
                        className="text-left relative mx-auto flex max-w-md flex-col items-center justify-center space-y-6 rounded-lg border p-6 dark:border-gray-600">
                        <div
                            className="absolute top-0 right-0 -mt-5 -mr-5 flex h-12 w-12 items-center justify-center rounded-lg bg-white shadow dark:bg-gray-500">
                            <i className="fa text-primary-500 text-xl dark:text-gray-300 fa-globe"></i></div>
                        <header className="max-w-xs space-y-2"><h2
                            className="text-xl font-semibold tracking-tight dark:text-gray-400">You don't have any forms
                            yet</h2><p className="text-md font-medium text-gray-500 dark:text-gray-400">Currently you do
                            not own
                            any form. Luckily AdminSelvi makes this real easy for you to do.</p></header>
                        <a disabled="false"
                           className="inline-flex items-center justify-center text-sm font-medium transition-all ease-in-out duration-100 focus:outline-none focus:ring border rounded-md border-primary-500 bg-primary-500 text-white shadow hover:bg-primary-400 hover:border-primary-400 focus:border-primary-700 focus:bg-primary-600 px-3 py-2 text-sm"
                           target="_self" href="/panel/forms/create">Create form</a></div>
                </div>)}

        </PanelLayout>
    );
}

export default IndexForm;
