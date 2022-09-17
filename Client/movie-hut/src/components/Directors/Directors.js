import { useContext } from 'react'
import { Missing } from '../Missing/Missing'
import { DirectorCard } from './DirectorCard/DirectorCard'
import styles from './Directors.module.css'

export const Directors = () => {
    return (
        <div className="container">
            <div className="row gy-3 my-2 justify-content-center">
                <div className="col-md-6">
                    <div className={`card ${styles.gradLeft}`}>
                        <div className='card-body'>
                            <p className='display-6'>Directors</p>
                            <div className='container'>
                                <DirectorCard name = 'Gosho' imageUrl = 'https://images.mubicdn.net/images/cast_member/36059/cache-162453-1470666886/image-w856.jpg?size=800x'/>
                                {/* {actors.length > 0 ? actors.map(x => <ActorCard key = {x.id} {...x}/>) : <Missing message = "No Actors yet."/>} */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}