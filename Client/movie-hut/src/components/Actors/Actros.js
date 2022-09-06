import { ActroCard } from './ActorCard/ActorCard'
import styles from './Actors.module.css'

export const Actors = () => {
    return (
        <div className="container">
            <div className="row gy-3 my-2 justify-content-center">
                <div className="col-md-6">
                    <div className={`card ${styles.gradLeft}`}>
                        <div className='card-body'>
                            <p className='display-6'>Actors</p>
                            <div className='container'>
                                <ActroCard/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}