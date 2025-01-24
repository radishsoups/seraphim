import React from 'react'
import TitleAndDescriptionBox from '../components/TitleAndDescriptionBox'

const Privacy = () => {
    return (
        <div className="w-[100%] m-[auto] flex flex-col justify-center items-center p-8 md:w-[80%] lg:w-[60%]">
            <h1 className="text-xl text-ebony-700 text-center font-bold mb-5">Privacy</h1>

            <TitleAndDescriptionBox
                link={"/blocked-users"}
                title={"Blocked Users"}
                description={"When you block someone, that user won't be able to follow your account, and you won't see their blogs."}
            />
            <TitleAndDescriptionBox
                link={"/blocked-communities"}
                title={"Blocked Communities"}
                description={"When you block a community, you won't see their blogs in your Home page."}
            />
            <TitleAndDescriptionBox
                link={"/muted-words"}
                title={"Muted Words"}
                description={"When you mute words, you won't see posts with those words in your Home page."}
            />
        </div>
    )
}

export default Privacy