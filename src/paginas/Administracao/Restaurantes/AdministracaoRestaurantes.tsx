import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import IRestaurante from "../../../interfaces/IRestaurante"

const AdministracaoRestaurantes = () => {
    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])

    useEffect(() => {
        axios.get<IRestaurante[]>('http://localhost:8000/api/v2/restaurantes/')
            .then(resposta => setRestaurantes(resposta.data))
    })

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            Nome
                        </TableCell>
                        <TableCell>
                            Edição
                        </TableCell>
                    </TableRow>
                    <TableBody>
                        {restaurantes.map(restaurante =>
                            <TableRow key={restaurante.id}>
                                <TableCell>
                                    {restaurante.nome}
                                </TableCell>
                                <TableCell>
                                    <Link to={`/admin/restaurantes/${restaurante.id}`}>Editar</Link>
                                </TableCell>
                            </TableRow>)
                        }
                    </TableBody>
                </TableHead>
            </Table>

        </TableContainer>
    )
}

export default AdministracaoRestaurantes