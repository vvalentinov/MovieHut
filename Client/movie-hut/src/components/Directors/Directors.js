import { useContext } from 'react'
import { useSearchParams } from 'react-router-dom'
import { DirectorContext } from '../../contexts/DirectorContext'
import { Missing } from '../Missing/Missing'
import { DirectorCard } from './DirectorCard/DirectorCard'
import styles from './Directors.module.css'

export const Directors = () => {
    const {directors} = useContext(DirectorContext);
    const [searchParams, setSearchParams] = useSearchParams();
    return (
        <div className="container">
            <div className="row gy-3 my-2 justify-content-center">
                <div className="col-md-6">
                    <div className={`card ${styles.gradLeft}`}>
                        <div className='card-body'>
                            <p className='display-6'>Directors</p>
                            <div className='container'>
                            {directors.length > 0 
                                    ? directors?.map(x => {
                                        if(searchParams.get('search')){
                                            let searchQuery = (searchParams.get('search')).toLowerCase();
                                            if (x?.name?.toLowerCase().includes(searchQuery)){
                                                return <DirectorCard key={x.id} {...x} />
                                            }else{
                                                return null;
                                            }
                                        }
                                        else {
                                            return <DirectorCard key={x.id} {...x} />
                                        }

                                    })
                                    : <Missing message = "No Direcotrs yet."/>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}