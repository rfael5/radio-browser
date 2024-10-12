import React, { useState } from 'react'

const EditRadioName = ({ radio, setFavoritos, setFiltroFavoritos }) => {

    const [inputValue, setInputValue] = useState('')

    const handleChange = (e: any) => {
        const value = (e.target as HTMLInputElement).value
        setInputValue(value)
    }

    const editarRadio = () => {
        const favoritosString: any = localStorage.getItem('favoritos')
        console.log(favoritosString)
        let _favoritos = JSON.parse(favoritosString)
        _favoritos.map((r) => {
            if (r.changeuuid === radio.changeuuid) {
                r.name = inputValue
            }
        })
        localStorage.setItem('favoritos', JSON.stringify(_favoritos))
        const attFavoritos = JSON.parse(localStorage.getItem('favoritos') || '[]')
        setFavoritos(attFavoritos)
        setFiltroFavoritos(attFavoritos)
    }

    return (
        <div className='pt-4 md:mx-40'>
            <label>Editar nome da rádio</label>
            <input className='mb-3 shadow appearance-none border rounded w-full py-2 px-3 w-30 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' onChange={handleChange} type='text' />
            <button className='bg-blue-500 hover:bg-blue-700 px-10 h-10 rounded text-white font-bold' onClick={editarRadio}>
                Editar
            </button>
        </div>

    )
}

export default EditRadioName