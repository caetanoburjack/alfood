import { Box, Button, Card, CardActions, CardContent, CardMedia, TextField, Typography } from "@mui/material"
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
        <Box sx={{ display: 'flex', flexDirection: "column", alignItems: "center" }}>
            <Box component="form" onSubmit={handleSubmit}>
                <Card sx={{ marginTop: 3 }} >
                    <CardMedia
                        component="img"
                        height="140"
                        image="https://mui.com/static/images/cards/paella.jpg"
                        alt="green iguana"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Cadastro de Restaurante
                        </Typography>
                        <TextField value={nomeRestaurante} autoComplete="false"
                            onChange={event => setNomeRestaurante(event.target.value)}
                            label="Nome do Restaurante"
                            variant="standard"
                            fullWidth
                            required
                        >
                        </TextField>
                    </CardContent>
                    <CardActions>
                        <Button sx={{ marginTop: 2 }} type="submit" fullWidth variant="outlined">Salvar</Button>
                    </CardActions>

                </Card>
            </Box>
        </Box>
    )
}

export default FormularioRestaurante