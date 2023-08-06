import axios from 'axios';
import { useState } from 'react';
import api from "../../../api.json"
import { saveAs } from 'file-saver';



const MultifilesUpload = () => {
    const [file1, setFile1] = useState(null);
    const [file2, setFile2] = useState(null);
    // const [downloadLink1, setDownloadLink1] = useState('');
    // const [downloadLink2, setDownloadLink2] = useState('');

    const handleFile1Change = (event) => {
        const selectedFile = event.target.files[0];
        setFile1(selectedFile);
    };

    const handleFile2Change = (event) => {
        const selectedFile = event.target.files[0];
        setFile2(selectedFile);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('files', file1);
        formData.append('files', file2);
        const type = "SID208"


        try {
            const response = await axios.post(`${api.url}/upload?type=${type}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            // Enregistrer le fichier côté client
            console.log(response);
            const blob = new Blob([response.data], { type: 'application/zip' });
            saveAs(blob, 'modified_file.zip');
        } catch (error) {
            console.error('Une erreur s\'est produite lors de l\'envoi du fichier :', error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="file1">Fichier 1 :</label>
                    <input type="file" id="file1" onChange={handleFile1Change} />
                </div>
                <div>
                    <label htmlFor="file2">Fichier 2 :</label>
                    <input type="file" id="file2" onChange={handleFile2Change} />
                </div>
                <button type="submit">Submit</button>
            </form>

            {/* {downloadLink1 && (
                <p>
                    Téléchargez le fichier 1 ici : <a href={downloadLink1} download>Download</a>
                </p>
            )}

            {downloadLink2 && (
                <p>
                    Téléchargez le fichier 2 ici : <a href={downloadLink2} download>Download</a>
                </p>
            )} */}
        </div>
    );
};

export default MultifilesUpload;
