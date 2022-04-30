import { Box, Button, Card, CardActions, CardContent, CardMedia, Paper, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import http from "../../../http"
import IPrato from "../../../interfaces/IPrato"

const FormularioPrato = () => {

    const parametros = useParams()

    useEffect(() => {
        if (parametros.id) {
            http.get<IPrato>(`pratos/${parametros.id}/`)
                .then(resposta => {
                    setNomePrato(resposta.data.nome)
                });
        }
    }, [parametros])

    const [nomePrato, setNomePrato] = useState('')

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        console.log('Enviando dados para a API: ')
        console.log(nomePrato)
        if (parametros.id) {
            http.put(`pratos/${parametros.id}/`, {
                nome: nomePrato
            }).then(() => {
                console.log("Prato Atualizado com Sucesso!")
            })
        } else {
            http.post('pratos/', {
                nome: nomePrato
            }).then(() => {
                console.log("Prato Cadastrado com Sucesso!")
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
                            Cadastro de Prato
                        </Typography>
                        <TextField value={nomePrato} autoComplete="false"
                            onChange={event => setNomePrato(event.target.value)}
                            label="Nome do Prato"
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

export default FormularioPrato