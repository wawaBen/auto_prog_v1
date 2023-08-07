import { Container } from "@mui/material"
import { SetStateAction, useState } from "react";
import BasicButtons from "../../components/BasicButton/BasicButton";
import BasicModal from "../../components/BasicModal/BasicModal";


export const Programmation = () => {
    const [open, setOpen] = useState(false);
    const [typeForm, setTypeForm] = useState("DCU102")
    const handleOpen = (typeForm: SetStateAction<string>) => {
        setOpen(true)
        setTypeForm(typeForm)
    };
    const handleClose = () => setOpen(false);


    return (
        <Container>
            <h1>Programmation</h1>
            {/* <div className='group-button'>
                <BasicButtons color={"error"} text={"DCU102"} handleOpen={() => handleOpen('DCU102')} />
                <BasicButtons text={"SID208"} handleOpen={() => handleOpen('SID208')} />
            </div>
            <BasicModal open={open} handleClose={handleClose} typeForm={typeForm} /> */}
        </Container >
    )
}