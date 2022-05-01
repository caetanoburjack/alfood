import { Box, Button, Card, CardActions, CardContent, CardMedia, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"
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

    const [imagem, setImagem] = useState<File | null>(null)

    const selecionarArquivo = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files?.length) {
            setImagem(event.target.files[0])
        } else {
            setImagem(null)
        }
    }

    useEffect(() => {
        http.get<{ tags: ITag[] }>('tags/')
            .then(resposta => setTags(resposta.data.tags))
        http.get<IRestaurante[]>('restaurantes/')
            .then(resposta => setRestaurantes(resposta.data))
    },[])

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const formData = new FormData()

        formData.append('nome', nomePrato)
        formData.append('descricao', descricaoPrato)

        formData.append('tag', tag)
        formData.append('restaurante', restaurante)

        if (imagem) {
            formData.append('imagem', imagem)
        }

        http.request(
            {
                url: 'pratos/',
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                data: formData
            })
            .then(() => console.log('Prato Cadastrado com Sucesso!'))
            .catch(erro => console.log(erro))
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: "column", alignItems: "center", flexGrow: 1 }}>
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
                            label="Nome"
                            variant="standard"
                            fullWidth
                            required
                        >
                        </TextField>
                        <TextField value={descricaoPrato} autoComplete="false"
                            onChange={event => setDescricaoPrato(event.target.value)}
                            label="Descricao"
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

                        <input type="file" onChange={selecionarArquivo} />

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