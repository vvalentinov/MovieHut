import { useContext } from 'react'
import { DirectorContext } from '../../contexts/DirectorContext'
import { Missing } from '../Missing/Missing'
import { DirectorCard } from './DirectorCard/DirectorCard'
import styles from './Directors.module.css'

export const Directors = () => {
    const {directors} = useContext(DirectorContext);
    return (
        <div className="container">
            <div className="row gy-3 my-2 justify-content-center">
                <div className="col-md-6">
                    <div className={`card ${styles.gradLeft}`}>
                        <div className='card-body'>
                            <p className='display-6'>Directors</p>
                            <div className='container'>
                                {directors.length > 0 ? directors.map(x => <DirectorCard key = {x.id} {...x}/>) : <Missing message = "No Directors yet."/>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}