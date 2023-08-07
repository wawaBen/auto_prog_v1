
import { Container } from "@mui/material"
import { useUserAuth } from "../../contexts/AuthContext"



export const Dashboard = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { logOut } = useUserAuth()
    return (
        <Container>
            <h1>Tableau de bord</h1>
            <button onClick={logOut}>Déconnexion</button>
        </Container>
    )
}