import './UploadImage.css'
import React, { useState, useEffect } from "react"
import placeholder from '../assets/upload-image-placeholder.png'

const UploadImage = (props) => {
    const [image, setImage] = useState(placeholder);

    // change image path when user uploads one
    const handleChange = (event) => {
        setImage(URL.createObjectURL(event.target.files[0]));
    }

    // set default image when user hasn't uploaded one
    useEffect(() => {
        setImage(placeholder)
    }, [])

    return (
        <div className="upload-image">
            <div className="image-display">
                <p className="image-title">{props.image}</p>
                <img src={image} alt={props.image} />
            </div>
            <input type="file" onChange={handleChange} />
        </div>
    );
}

export default UploadImage