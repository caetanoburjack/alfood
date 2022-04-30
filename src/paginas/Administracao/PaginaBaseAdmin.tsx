import { AppBar, Box, Button, Card, CardActions, CardContent, CardMedia, Container, Paper, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import http from "../../../http"
import IRestaurante from "../../../interfaces/IRestaurante"

const FormularioRestaurante = () => {

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
        <AppBar position="static">
            <Container maxWidth="xl">


            </Container>
        </AppBar>
    )
}

export default FormularioRestaurante