import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import http from "../../../http"
import IRestaurante from "../../../interfaces/IRestaurante"

const AdministracaoRestaurantes = () => {
    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])

    useEffect(() => {
        http.get<IRestaurante[]>('restaurantes/')
            .then(resposta => setRestaurantes(resposta.data))
    })

    const excluirRestaurante = (restauranteAExcluir: IRestaurante) => {
        http.delete(`restaurantes/${restauranteAExcluir.id}/`)
            .then(() => {
                const listaRestaurantesAtualizada = restaurantes.filter(restaurante => restaurante.id !== restauranteAExcluir.id)
                setRestaurantes(listaRestaurantesAtualizada);
                console.log("Restaurante Removido com Sucesso!")
            })
    }

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
                        <TableCell>
                            Exclusão
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {restaurantes.map(restaurante =>
                        <TableRow key={restaurante.id}>
                            <TableCell>
                                {restaurante.nome}
                            </TableCell>
                            <TableCell>
                                <Link to={`/admin/restaurantes/${restaurante.id}`}>Editar</Link>
                            </TableCell>
                            <TableCell>
                                <Button variant="outlined" color="error" onClick={() => excluirRestaurante(restaurante)}>
                                    Excluir
                                </Button>
                            </TableCell>
                        </TableRow>)
                    }
                </TableBody>
            </Table>

        </TableContainer>
    )
}

export default AdministracaoRestaurantes