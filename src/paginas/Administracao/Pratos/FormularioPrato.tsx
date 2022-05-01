import { Box, Button, Card, CardActions, CardContent, CardMedia, FormControl, InputLabel, MenuItem, Paper, Select, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import http from "../../../http"
import IRestaurante from "../../../interfaces/IRestaurante"
import ITag from "../../../interfaces/ITag"

const FormularioPrato = () => {

    const [nomePrato, setNomePrato] = useState('')
    const [descricaoPrato, setDescricaoPrato] = useState('')

    const [tag, setTag] = useState('')
    const [restaurante, setRestaurante] = useState('')
    
    const [tags, setTags] = useState<ITag[]>([])
    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])

    useEffect(() => {
        http.get<{ tags: ITag[] }>('tags/')
            .then(resposta => setTags(resposta.data.tags))
        http.get<IRestaurante[]>('restaurantes/')
            .then(resposta => setRestaurantes(resposta.data))
    })

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

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
                        <TextField value={descricaoPrato} autoComplete="false"
                            onChange={event => setDescricaoPrato(event.target.value)}
                            label="Descricao do Prato"
                            variant="standard"
                            fullWidth
                            margin="dense"
                            required
                        >
                        </TextField>

                        <FormControl margin="dense" fullWidth>
                            <InputLabel id="select-tag">Tag</InputLabel>
                            <Select labelId="select-tag" value={tag} onChange={event => setTag(event.target.value)}>
                                {
                                    tags.map(tag =>
                                        <MenuItem key={tag.id} value={tag.id}>
                                            {tag.value}
                                        </MenuItem>)
                                }
                            </Select>
                        </FormControl>
                        <FormControl margin="dense" fullWidth>
                            <InputLabel id="select-restaurante">Restaurante</InputLabel>
                            <Select labelId="select-restaurante" value={restaurante} onChange={event => setRestaurante(event.target.value)}>
                                {
                                    restaurantes.map(restaurante =>
                                        <MenuItem key={restaurante.id} value={restaurante.id}>
                                            {restaurante.nome}
                                        </MenuItem>)
                                }
                            </Select>
                        </FormControl>

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