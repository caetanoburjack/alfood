import { Button, TextField } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import IRestaurante from "../../../interfaces/IRestaurante"

const FormularioRestaurante = () => {

    const parametros = useParams()

    useEffect(() => {
        if (parametros.id) {
            axios.get<IRestaurante>(`http://localhost:8000/api/v2/restaurantes/${parametros.id}/`)
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
            axios.put(`http://localhost:8000/api/v2/restaurantes/${parametros.id}/`, {
                nome: nomeRestaurante
            }).then(() => {
                console.log("Restaurante Atualizado com Sucesso!")
            })
        } else {
            axios.post('http://localhost:8000/api/v2/restaurantes/', {
                nome: nomeRestaurante
            }).then(() => {
                console.log("Restaurante Cadastrado com Sucesso!")
            })
        }
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