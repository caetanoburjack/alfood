import { AppBar, Box, Button, Container, Link, Paper, Toolbar, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { Link as RouterLink, Outlet, useParams } from "react-router-dom"
import http from "../../http"
import IRestaurante from "../../interfaces/IRestaurante"

const PaginaBaseAdmin = () => {

    const parametros = useParams()

    useEffect(() => {
        if (parametros.id) {
            http.get<IRestaurante>(`restaurantes/${parametros.id}/`)
                .then(resposta => {
                    setNomeRestaurante(resposta.data.nome)
                });
        }
    }, [parametros])

    const [nomeRestaurante, setNomeRestaurante] = useState('')

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        console.log('Enviando dados para a API: ')
        console.log(nomeRestaurante)
        if (parametros.id) {
            http.put(`restaurantes/${parametros.id}/`, {
                nome: nomeRestaurante
            }).then(() => {
                console.log("Restaurante Atualizado com Sucesso!")
            })
        } else {
            http.post('restaurantes/', {
                nome: nomeRestaurante
            }).then(() => {
                console.log("Restaurante Cadastrado com Sucesso!")
            })
        }
    }

    return (
        <>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar>
                        <Typography>
                            Administração
                        </Typography>
                        <Box sx={{ display: 'flex', flexGrow: 1 }}>
                            <Link component={RouterLink} to="/admin/restaurantes">
                                <Button sx={{ my: 2, color: 'white' }}>
                                    Restaurantes
                                </Button>
                            </Link>
                            <Link component={RouterLink} to="/admin/restaurantes/novo">
                                <Button sx={{ my: 2, color: 'white' }}>
                                    Novo Restaurante
                                </Button>
                            </Link>
                        </Box>
                    </Toolbar>

                </Container>
            </AppBar>
            <Box>
                <Container maxWidth="lg" sx={{ mt: 1 }}>
                    <Paper sx={{ p: 2 }}>
                        <Outlet />
                    </Paper>
                </Container>
            </Box>
        </>
    )
}

export default PaginaBaseAdmin