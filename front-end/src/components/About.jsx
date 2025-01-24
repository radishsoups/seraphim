import React, { useState, useEffect } from "react"

// profile page about component
const About = ({ User }) => {

    const [user, setUser] = useState({})

    // set the user as soon as this is loaded
    useEffect(() => {
        setUser(User)
    }, [])

    return (
        <div>
            <h1>{user.name}'s About Me</h1>
            <div>
                {user.aboutMe}
            </div>  
        </div>
    )
}

// export about page
export default About