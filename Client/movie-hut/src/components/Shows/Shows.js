import { useContext } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { ShowContext } from '../../contexts/ShowContext'
import { Missing } from '../Missing/Missing'
import { Genres } from './Genres/Genres'
import { ShowCard } from './ShowCard/ShowCard'
import styles from './Shows.module.css'

export const Shows = () => {
    const params = useParams();
    const { shows } = useContext(ShowContext);
    const [searchParams, setSearchParams] = useSearchParams();
    return (
        <div className="container">
            <div className="row gy-3 my-2">
                <div className="col-md-8">
                    <div className={`card ${styles.gradLeft}`}>
                        <div className='card-body'>
                            <p className='display-6'>Shows {params.genre ? '/ ' + params.genre[0].toUpperCase() + params.genre.slice(1, params.genre.length) : null}</p>
                            <div className='container'>
                                {shows.length > 0
                                    ? shows?.map(x => {
                                        if (params.genre) {
                                            if (x.genres?.some(y => y.toLowerCase() === params.genre)) {
                                                return <ShowCard key={x.id} {...x} />
                                            }else{
                                                return null;
                                            }
                                        } 
                                        else if(searchParams.get('search')){
                                            let searchQuery = (searchParams.get('search')).toLowerCase();
                                            if (x?.title?.toLowerCase().includes(searchQuery)){
                                                return <ShowCard key={x.id} {...x} />
                                            }else{
                                                return null;
                                            }
                                        }
                                        else {
                                            return <ShowCard key={x.id} {...x} />
                                        }

                                    })
                                    : <Missing message={`No shows yet.`} />}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className={`card ${styles.gradRight}`}>
                        <div className="card-body">
                            <Genres />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}