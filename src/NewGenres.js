import React, {useState} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';

const NewGenres = () => {

    const [genre, setGenre] = useState('');
    const [sucess, setSucess] = useState(false);
    const onChange = evt => {
        setGenre(evt.target.value);
    }

    const save = () => {
        axios.post('/api/genres', {
            name: genre,
        }).then(res => {
            setSucess(true);
        })
    }

    if(sucess === true){
        return <Redirect to='/generos/'></Redirect>
    }

    return (
        <div className='container'>
            <h1>Novo Gênero</h1>
            <form>
                <div className="form-group">
                    <label htmlFor="name">Nome do Gênero</label>
                    <input type="name" value={genre} onChange={onChange} className="form-control" id="name" placeholder="Nome do gênero" />
                </div>
                <button type="button" onClick={save} className="btn btn-primary">Salvar</button>
            </form>
        </div>
    );
}

export default NewGenres;