import React, { useState } from 'react';
import axios from 'axios';

export default function UploadImage() {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) return alert("Please select a file");

        const formData = new FormData();
        formData.append('myfile', file);

        try {
            const response = await axios.post('http://localhost:9000/api/uploadimg', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert('Upload successful!');
            console.log(response.data);
        } catch (error) {
            alert('Upload failed!');
            console.error(error);
        }
    };

    return (
        <div>
            <input id='myfile' type='file' name='myfile' onChange={handleFileChange} />
            <button onClick={handleUpload}>Submit</button>
        </div>
    );
}
