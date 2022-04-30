import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { useEffect, useState } from "react"
import { Link as RouterLink } from "react-router-dom"
import http from "../../../http"
import IPrato from "../../../interfaces/IPrato"

const AdministracaoPratos = () => {
    const [pratos, setPratos] = useState<IPrato[]>([])

    useEffect(() => {
        http.get<IPrato[]>('pratos/')
            .then(resposta => setPratos(resposta.data))
    })

    const excluirPrato = (pratoAExcluir: IPrato) => {
        http.delete(`pratos/${pratoAExcluir.id}/`)
            .then(() => {
                const listaPratosAtualizada = pratos.filter(prato => prato.id !== pratoAExcluir.id)
                setPratos(listaPratosAtualizada);
                console.log("Prato Removido com Sucesso!")
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
                            Tag
                        </TableCell>
                        <TableCell>
                            Imagem
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
                    {pratos.map(prato =>
                        <TableRow key={prato.id}>
                            <TableCell>
                                {prato.nome}
                            </TableCell>
                            <TableCell>
                                {prato.tag}
                            </TableCell>
                            <TableCell>
                                <a href={prato.imagem} target="_blank" rel="noreferrer">Ver Imagem</a>
                            </TableCell>
                            <TableCell>
                                <RouterLink to={`/admin/pratos/${prato.id}`}>Editar</RouterLink>
                            </TableCell>
                            <TableCell>
                                <Button variant="outlined" color="error" onClick={() => excluirPrato(prato)}>
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

export default AdministracaoPratos