import React, { useState } from 'react'
import './RadioRow.css'
import EditRadioName from './EditRadioName.tsx'

const RadioRow = ({ radio, favoritos, setFavoritos, setFiltroFavoritos, setRadioPlaying }) => {

    const [currentRadio, setCurrentRadio] = useState(new Audio())

    const playSong = (audioFile) => {
        if (currentRadio) {
            currentRadio.pause()
        }
        setRadioPlaying(radio.name)
        const song = new Audio(audioFile)
        setCurrentRadio(song)
        song.play()
    }

    const stopSong = () => {
        if (currentRadio) {
            currentRadio.pause()
        }
    }

    const removerRadio = (idRadio) => {
        const filteredFavorites = favoritos.filter(radio => radio.changeuuid !== idRadio)
        setFavoritos(filteredFavorites)
        setFiltroFavoritos(filteredFavorites)
        localStorage.setItem('favoritos', JSON.stringify(filteredFavorites))
    }

    function toggleAccordion(idRadio: string) {
        const content: any = document.getElementById(`content-${idRadio}`);

        if (content?.style.maxHeight && content?.style.maxHeight !== '0px') {
            content.style.maxHeight = '0';
        } else {
            content.style.maxHeight = content?.scrollHeight + 'px';
        }
    }


    return (
        <>
            <div className="radio-row flex items-center justify-between p-2">
                <div className='mr-4 pt-2 flex items-center'>
                    <button className='bg-gray-600 mr-3 rounded' onClick={() => playSong(radio.url)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
                        </svg>
                    </button>

                    <button className='bg-gray-600 rounded' onClick={stopSong}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
                    </svg>
                    </button>

                </div>
                <div className='pt-2 flex-1 flex items-center'>
                    <span className='mr-4'>{radio.name}</span>
                    <span className='mr-10'>{radio.country} - {radio.countrycode}</span>
                </div>
                <div className='flex items-center'>
                    <button className='bg-gray-600 rounded p-2 mr-3' onClick={() => toggleAccordion(radio.changeuuid)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                        </svg>
                    </button>
                    <button className='bg-gray-600 rounded p-2 mr-3' onClick={() => removerRadio(radio.changeuuid)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>

                    </button>
                </div>
            </div>

            <div>
                <div id={`content-${radio.changeuuid}`} className="max-h-0 overflow-hidden transition-all duration-300 ease-in-out">
                    <EditRadioName radio={radio} setFavoritos={setFavoritos} setFiltroFavoritos={setFiltroFavoritos} />
                </div>
            </div>
        </>

    )
}

export default RadioRow