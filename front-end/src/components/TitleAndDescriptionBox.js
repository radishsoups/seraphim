
import { Link } from 'react-router-dom'

const TitleAndDescriptionBox = (props) => {
    return (
        <div className="w-[85%] m-[auto] flex flex-col justify-center p-4 bg-lavender_blush-900 rounded-md my-2 grow shadow-md shadow-ebony-900">
            <Link to={props.link}><p className="text-md text-ebony-600 font-semibold hover:text-rose">{props.title}</p></Link>
            <p className="text-ebony-700 text-md">{props.description}</p>
        </div>
    )
}

export default TitleAndDescriptionBox
