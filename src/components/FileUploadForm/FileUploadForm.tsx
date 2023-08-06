import { useState } from 'react';
import axios from 'axios';
// import { Link } from '@mui/material';
import { saveAs } from 'file-saver';
import api from "../../../api.json"

const FileUploadForm = () => {
    const [file, setFile] = useState(null);
    // const [downloadLink, setDownloadLink] = useState('');

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
    };

    // const handleSubmit = async (event) => {
    //     event.preventDefault();
    //     const formData = new FormData();
    //     formData.append('file', file);

    //     try {
    //         const response = await axios.post('http://localhost:3000/upload', formData, {
    //             headers: {
    //                 'Content-Type': 'multipart/form-data'
    //             }
    //         });
    //         console.log(response.data)

    //         const fileURL = URL.createObjectURL(new Blob([response.data]));

    //         // Définir le lien de téléchargement
    //         setDownloadLink(fileURL);
    //     } catch (error) {
    //         console.error('Une erreur s\'est produite lors de l\'envoi du fichier :', error);
    //     }
    // };

    // const handleSubmit = async (event) => {
    //     event.preventDefault();
    //     const formData = new FormData();
    //     formData.append('file', file);

    //     try {
    //         const response = await axios.post('http://localhost:3000/upload', formData, {
    //             headers: {
    //                 'Content-Type': 'multipart/form-data'
    //             },
    //             responseType: 'blob' // Indiquer que la réponse est de type blob
    //         });

    //         // Enregistrer le fichier côté client
    //         saveAs(response.data, 'modified_file.bin');
    //     } catch (error) {
    //         console.error('Une erreur s\'est produite lors de l\'envoi du fichier :', error);
    //     }
    // };


    // const handleSubmit = async (event) => {
    //     event.preventDefault();
    //     const formData = new FormData();
    //     formData.append('file', file);

    //     try {
    //         const response = await axios.post('https://auto-programming-proto.ey.r.appspot.com/upload?type=“DCU102”', formData, {
    //             headers: {
    //                 'Content-Type': 'multipart/form-data'
    //             },
    //             responseType: 'arraybuffer' // Modifier le type de réponse en arraybuffer
    //         });

    //         // Enregistrer le fichier côté client
    //         console.log(response)
    //         const blob = new Blob([response.data], { type: 'application/zip' });
    //         saveAs(blob, 'modified_file.zip');
    //     } catch (error) {
    //         console.error('Une erreur s\'est produite lors de l\'envoi du fichier :', error);
    //     }
    // };


    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('fileEEPROM', file);
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
