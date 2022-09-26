import { useContext } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ActorContext } from '../../contexts/ActorContext'
import { Missing } from '../Missing/Missing'
import { ActorCard } from './ActorCard/ActorCard'
import styles from './Actors.module.css'

export const Actors = () => {
    const {actors} = useContext(ActorContext);
    const [searchParams, setSearchParams] = useSearchParams();
    return (
        <div className="container">
            <div className="row gy-3 my-2 justify-content-center">
                <div className="col-md-6">
                    <div className={`card ${styles.gradLeft}`}>
                        <div className='card-body'>
                            <p className='display-6'>Actors</p>
                            <div className='container'>
                                {actors.length > 0 
                                    ? actors?.map(x => {
                                        if(searchParams.get('search')){
                                            let searchQuery = (searchParams.get('search')).toLowerCase();
                                            if (x?.name?.toLowerCase().includes(searchQuery)){
                                                return <ActorCard key={x.id} {...x} />
                                            }else{
                                                return null;
                                            }
                                        }
                                        else {
                                            return <ActorCard key={x.id} {...x} />
                                        }

                                    })
                                    : <Missing message = "No Actors yet."/>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}