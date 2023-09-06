import { useState } from 'react';
import axios from 'axios';
// import { Link } from '@mui/material';
import { saveAs } from 'file-saver';
import api from "../../../api.json"

const FileUploadForm = ({ typeForm }) => {
    const [file, setFile] = useState(null);
    // const [downloadLink, setDownloadLink] = useState('');

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('fileDCU102', file);
        // const type = "SID208"

        try {
            const response = await axios.post(`${api.url}uploadDCU102/IMMOOFF/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            // Enregistrer le fichier côté client
            console.log("Response ===> ", response);
            // const blob = new Blob([response.data], { type: 'application/zip' });
            // saveAs(blob, 'modified_file.zip');
        } catch (error) {
            console.error('Une erreur s\'est produite lors de l\'envoi du fichier :', error);
        }
    };



    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleFileChange} />
                <button type="submit">Submit</button>
            </form>

            {/* {downloadLink && (
                <p>
                    Téléchargez le fichier ici : <Link href={downloadLink} download>Download</Link>
                </p>
            )} */}
        </div>
    );
};

export default FileUploadForm;
