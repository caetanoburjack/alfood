import { Button, TextField } from "@mui/material"
import axios from "axios"
import { useState } from "react"

const FormularioRestaurante = () => {

    const [nomeRestaurante, setNomeRestaurante] = useState('')

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        console.log('Enviando dados para a API: ')
        console.log(nomeRestaurante)
        axios.post('http://localhost:8000/api/v2/restaurantes/', {
            nome: nomeRestaurante
        }).then(() => {
            console.log("Restaurante Cadastrado com Sucesso!")
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <TextField value={nomeRestaurante}
                onChange={event => setNomeRestaurante(event.target.value)}
                label="Nome do Restaurante"
                variant="standard">
            </TextField>
            <Button type="submit" variant="outlined">Salvar</Button>
        </form>
    )
}

export default FormularioRestaurante