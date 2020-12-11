import React, {Component} from 'react';


class ImageUpload extends Component {

    state = {
        file: '',
        imagePreviewUrl: ''
    };


    _handleImageChange = e =>{
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
            this.setState({ file: file, imagePreviewUrl: reader.result });
        }
        reader.readAsDataURL(file)
    }

    render() {
        let {imagePreviewUrl} = this.state;
        let $imagePreview = null;

        return (
            <div>
                <input type="file" onChange={this._handleImageChange} />
                {!$imagePreview && <img src={imagePreviewUrl} alt={''}/>}
            </div>
        )
    }

}


export default ImageUpload;