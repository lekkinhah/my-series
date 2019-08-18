import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';

const EditGenres = ({match}) => {

    const [genre, setGenre] = useState('');
    const [sucess, setSucess] = useState(false);
    
    useEffect(()=>{
        axios
            .get("/api/genres/" + match.params.id)
            .then(res=>{
                setGenre(res.data.name);
            })
    }, [match.params.id])
    
    const onChange = evt => {
        setGenre(evt.target.value);
    }

    const save = () => {
        axios.put('/api/genres/' + match.params.id, {
            name: genre,
        }).then(res => {
            setSucess(true);
        })
    }

    if(sucess){
        return <Redirect to='/generos'></Redirect>
    }

    return (
        <div className='container'>
            <h1>Editar Gênero</h1>
            <form>
                <div className="form-group">
                    <label htmlFor="name">Editar do Gênero </label>
                    <input type="name" value={genre} onChange={onChange} className="form-control" id="name" placeholder="Nome do gênero" />
                </div>
                <button type="button" onClick={save} className="btn btn-primary">Salvar</button>
            </form>
        </div>
    );
}

export default EditGenres;