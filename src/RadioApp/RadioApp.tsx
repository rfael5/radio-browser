import React, { useState, useEffect, ChangeEvent } from 'react'
import RadioRow from './RadioRow/RadioRow.tsx'

const RadioApp:React.FC = () => {

    const [filtroRadios, setFiltroRadios] = useState([])
    const [radioPlaying, setRadioPlaying] = useState([])
    const [favoritos, setFavoritos] = useState([])
    const [filtroFavoritos, setFiltroFavoritos] = useState([])
    const [currentPage, setCurrentPage] = useState(0)
    const [searchValue, setSearchValue] = useState('')
    const [searchType, setSearchType] = useState('name')
    const [url, setUrl] = useState('https://de1.api.radio-browser.info/json/stations/search?')

    useEffect(() => {
        getRadios(url)
    }, [url, currentPage])

    useEffect(() => {
        console.log(radioPlaying)
    }, [radioPlaying])

    useEffect(() => {
        const favoritosSalvos = localStorage.getItem('favoritos')
        if(favoritosSalvos){
            setFavoritos(JSON.parse(favoritosSalvos))
            setFiltroFavoritos(JSON.parse(favoritosSalvos))
        }
    }, [])

    const goToNextPage = () => {
        setCurrentPage(currentPage + 1)
    }

    const goToPreviousPage = () => {
        if(currentPage > 0){
            setCurrentPage(currentPage - 1)
        }
    } 

    const getRadios = async (route) => {
        try{
            let fetchPageResults = 0
            if(currentPage > 0){
                fetchPageResults = currentPage * 10
            }

            const response = await fetch(`${route}&offset=${fetchPageResults}&limit=10&hidebroken=true`,
                {method:'GET'});
            if(response.ok){
                const data = await response.json()
                setFiltroRadios(data)
                console.log(response.status)
            }
        }catch(error){
            console.error(error)
        }
        
    }

    const adicionarListaFavoritos = (_radio) => {
        const exists = favoritos.some((fav:any) => fav.changeuuid === _radio.changeuuid);
        if (!exists) {
            const listaFavoritos:any = [...favoritos, _radio];
            setFavoritos(listaFavoritos);
            setFiltroFavoritos(listaFavoritos)
            localStorage.setItem('favoritos', JSON.stringify(listaFavoritos));
        } else {
            console.log('Esta rádio já está na lista de favoritos');
            alert('Esta rádio já está na lista de favoritos');
        }
    };

    const handleInputChange = (e) => {
        const valor = e.target.value
        console.log(valor)
        setSearchValue(valor)

    }

    const pesquisarRadio = async (e) => {
        e.preventDefault()
        setCurrentPage(0)
        setUrl(`https://de1.api.radio-browser.info/json/stations/search?${searchType}=${searchValue}`)
    }

    const pesquisarMinhasRadios = (e) => {
        const valor = e.target.value
        const filtro = favoritos.filter((r:any) => r.name.toLowerCase().includes(valor))
        setFiltroFavoritos(filtro)
    }

    return (
        <div className='flex flex-col md:flex-row'>
            <div className='bg-gray-800 col-span-4 md:w-1/3'>
                <div className='p-4'>
                    <div className='mr-4'>
                        <label className='m-3 text-white'>Selecione o tipo de filtro</label>
                        <select className='m-3 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' onChange={(e) => {setSearchType(e.target.value)}}>
                            <option value='name'>Nome da rádio</option>
                            <option value='country'>País</option>
                            <option value='language'>Lingua</option>
                        </select>
                    </div>
                    <div className='mr-4'>
                        <label className='m-3 text-white'>Pesquisar radio</label>
                        <input className='m-3 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' onChange={handleInputChange} type="text" />
                        <button className='bg-blue-500 hover:bg-blue-700 py-3 px-6 text-white font-bold rounded' onClick={(e) => pesquisarRadio(e)}>Buscar</button>
                    </div>
                </div>
                

                {
                    filtroRadios.map((radio:any, index:number) => (
                        <div className='p-4 m-4 rounded bg-gray-500 cursor-pointer' key={index}>
                            <div onClick={() => adicionarListaFavoritos(radio)}>
                                <span className='text-white'>{radio.name}</span>
                            </div>
                            
                            {/* <RadioRow radio={radio} adicionarListaFavoritos={adicionarListaFavoritos} /> */}
                        </div>
                    ))
                }

                <div className='flex justify-around pb-8'>
                    <button className="bg-blue-500 hover:bg-blue-700 w-36 h-10 rounded text-white font-bold" onClick={goToPreviousPage}>Previous</button>
                    <button className="bg-blue-500 hover:bg-blue-700 w-36 h-10 rounded text-white font-bold" onClick={goToNextPage}>Next</button>
                </div>
            </div>

            <div className='bg-gray-600 col-span-8 md:w-2/3'>
                <div>
                    <div className='bg-gray-300 py-8 mb-6 h-10'>
                        <span className='font-bold'>
                            Radio atual: {radioPlaying}
                        </span>
                    </div>
                </div>

                <div className='md:px-60'>
                    <label className='mr-2'>Pesquisar em minhas radios:</label>
                    <input className='m-3 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' type="text" onChange={pesquisarMinhasRadios} />
                </div>

                {
                    filtroFavoritos.map((r:any) => (
                        <div className='bg-gray-300 m-4 p-4'>
                            <RadioRow 
                                radio={r} 
                                favoritos={favoritos} 
                                setFavoritos={setFavoritos}
                                setFiltroFavoritos={setFiltroFavoritos}
                                setRadioPlaying={setRadioPlaying} />
                            
                        </div>
                        
                    ))
                }
            </div>
        </div>
    )
    
}

export default RadioApp