import React from "react"

const AccountInfo = (props) => {
    return (
        <div className="grid grid-cols-2 w-full max-w-[90%] gap-2 m-auto items-center">
            <div className="text-md text-left truncate text-ebony-600 font-semibold">{props.title}</div>
            <div className="text-md text-right truncate text-rose-600 font-medium">{props.text}</div>
        </div>
    )
}
export default AccountInfo