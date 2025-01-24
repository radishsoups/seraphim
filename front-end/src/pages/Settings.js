import React from "react"
import TitleAndDescriptionBox from '../components/TitleAndDescriptionBox'
import './Settings.css'

const Settings = () => {
    return (
        <div className="w-[90%] flex flex-col justify-center items-center gap-6 p-8 m-[auto] lg:w-[70%]">
            <h1 className="text-xl text-ebony-700 text-center font-bold">Settings</h1>

            <section className="flex flex-col justify-center w-[100%] gap-0">
                <TitleAndDescriptionBox
                    link={"/account-settings"}
                    title={"Account Settings"}
                    description={"See information about your account and learn about your deactivation settings."}
                />
                <TitleAndDescriptionBox
                    link={"/privacy"}
                    title={"Privacy"}
                    description={"Manage the accounts, communities, and words that you've muted or blocked."}
                />
                <TitleAndDescriptionBox
                    link={"/accessibility"}
                    title={"Accessibility"}
                    description={"Manage how Seraphim content is displayed to you."}
                />
            </section>
        </div>
    )
}

export default Settings