import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import {Badge} from 'reactstrap';

const InfoSerie = ({match}) => {

    const [serie, setSerie] = useState({
        name: ''
    });
    const [sucess, setSucess] = useState(false);
    const [mode, setMode] = useState('info');
    const [genre, setGenre] = useState([]);
    const [genreId, setGenreId] = useState('')

    const [data, setData] = useState({});

    useEffect (() => {
        axios
        .get('/api/series/' + match.params.id)
        .then(res => {
            setData(res.data);
            setSerie(res.data);
        })
    }, [match.params.id]);

    useEffect(()=>{
        axios
        .get('/api/genres')
        .then(res=>{
            setGenre(res.data.data)
            const found = res.data.data.find(value => data.genre === value.name)
            if(found){
               setGenreId(found.id)
            }
        })
    }, [data]);

    //CustomHeader
    const masterHeader ={
        height:'50vh',
        minHeight: '500px',
        backgroundImage: `url("${data.background}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepet: 'no-repeat'
    }

    const onChangeGenre = evt => {
        setGenreId(evt.target.value);
    }
    const onChange = field => evt => {
       setSerie({
           ...serie,
           [field]: evt.target.value
        });
    }

    const seleciona = value => () => {
        setSerie({
            ...serie,
            status: value,
        })
    }

    const save = () => {
        axios.put('/api/series/' + match.params.id, {
            ...serie,
            genre_id:genreId,
        })
        .then(res => {
            setSucess(true);
        })
    }

    if(sucess === true){
        return <Redirect to='/series/'></Redirect>
    }

    return (
        <div>
            <header style={masterHeader} >
                <div className='h-100' style={{background:'rgba(0,0,0,0.7'}}>
                    <div className='h-100 container'>
                        <div className='row h-100 align-items-center'>
                            <div className='col-3'>
                                <img className='img-fluid img-thumbnail' alt={data.name} src={data.poster} />
                            </div>
                            <div className='col-8'>
                                <h1 className='font-weight-light text-white'>{data.name}</h1>
                                <div className='lead text-white'>
                                    {data.status === "ASSISTIDO" && <Badge color='success'>Assistido</Badge> }
                                    {data.status === "PARAASSISTIR" && <Badge color='warning'>Para assistir</Badge>}
                                    Gênero: {data.genre}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <div className='container'>
                <button onClick={()=>{setMode('EDIT')}} className="btn btn-primary">Editar</button>
            </div>
            {
                mode === 'EDIT' &&
            
            <div className='container'>
                <h1>Editar Série</h1>
                <pre>{JSON.stringify(serie)}</pre>
                <button onClick={()=>{setMode('INFO')}} className="btn btn-primary">Cancelar edição</button>
                <form>
                    <div className="form-group">
                        <label htmlFor="name">Nome da Série</label>
                        <input type="name" value={serie.name} onChange={onChange('name')} className="form-control" id="name" placeholder="Nome da Série" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="comments">Comentários</label>
                        <input type="comments" value={serie.comments} onChange={onChange('comments')} className="form-control" id="comments" placeholder="Escreva seu comentário" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">Gênero</label>
                        <select className='form-control' onChange={onChangeGenre} value={genreId}>
                          {genre.map(genres => <option key={genres.id} value={genres.id}>{genres.name}</option>  )}  
                        </select>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" checked={serie.status === "ASSISTIDO"} name="status" id="assistido" value="ASSISTIDO" onChange={seleciona('ASSISTIDO')} />
                        <label className="form-check-label" htmlFor="assistido">Assistido</label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" checked={serie.status === "PARAASSISTIR"}name="status" id="paraAssistir" value="PARAASSISTIR" onChange={seleciona('PARAASSISTIR')}/>
                        <label className="form-check-label" htmlFor="paraAssistir">Para assistir</label>
                    </div>
                    <button type="button" onClick={save} className="btn btn-primary">Salvar</button>
                </form>
            </div>
            }
        </div>
    );
}

export default InfoSerie;