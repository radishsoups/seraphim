const TitleAndDescription = (props) => {
    return (
        <div className="flex flex-col justify-center items-center">
            <h1 className="text-xl text-ebony-700 text-center font-bold mb-5">{props.title}</h1>
            <p className="text-center text-sm text-ebony dark:text-ebony-700 font-light">{props.description}</p>
        </div>
    )
}

export default TitleAndDescription