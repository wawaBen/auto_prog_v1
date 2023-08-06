import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import "./BasicButton.css"

// eslint-disable-next-line react/prop-types
export default function BasicButtons({ text, color, handleOpen }) {
    return (
        <Stack spacing={2} direction="row">
            <Button className='button' variant="contained" color={color} onClick={handleOpen}>{text}</Button>
        </Stack >
    );
}