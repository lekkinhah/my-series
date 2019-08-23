import React, {useState} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';

const NewSerie = () => {

    const [serie, setSerie] = useState('');
    const [sucess, setSucess] = useState(false);
    const onChange = evt => {
        setSerie(evt.target.value);
    }

    const save = () => {
        axios.post('/api/series', {
            name: serie,
        }).then(res => {
            setSucess(true);
        })
    }

    if(sucess === true){
        return <Redirect to='/series/'></Redirect>
    }

    return (
        <div className='container'>
            <h1>Nova Série</h1>
            <form>
                <div className="form-group">
                    <label htmlFor="name">Nome da Série</label>
                    <input type="name" value={serie} onChange={onChange} className="form-control" id="name" placeholder="Nome do gênero" />
                </div>
                <button type="button" onClick={save} className="btn btn-primary">Salvar</button>
            </form>
        </div>
    );
}

export default NewSerie;