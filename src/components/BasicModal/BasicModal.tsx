import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import FileUploadForm from '../FileUploadForm/FileUploadForm';
import MultifilesUpload from '../MultiFilesUploadForm/MultiFilesUploadForm';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

// eslint-disable-next-line react/prop-types
export default function BasicModal({ open, handleClose, typeForm }) {

    const Form = () => {
        switch (typeForm) {
            case 'DCU102':
                return <FileUploadForm />
            case 'SID208':
                return <MultifilesUpload />
            default:
                return null
        }
    }

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Chargez votre fichier
                    </Typography>
                    <Form />
                </Box>
            </Modal>
        </div>
    );
}