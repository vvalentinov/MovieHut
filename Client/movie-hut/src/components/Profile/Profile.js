import styles from './Profile.module.css';
import background from '../../images/profile_background.jpg'
import { Card } from './Card/Card';

export const Profile = () => {
    return (
        <>
            <img className={`${styles.bannerImg} shadow-lg`} src={background} alt="Card img" />
            <div className="container my-3">
                <div className="row">
                    <div className="col-md-4">
                        <div className="card" style={{ width: "18rem", borderRadius: 0 }}>
                            <img className="card-img-top" src="https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg" alt="Card img cap" style={{ borderRadius: 0 }} />
                            <div className="card-body">
                                <h3 className="card-title">RadinTiholov</h3>
                                <p className="card-text">
                                    Some quick example text to build on the card title and make up the bulk of
                                    the card's content.
                                </p>
                                <p>Created movies: 4</p>
                                <p>Created tv-shows: 19</p>
                                <p>User rating: 4.6</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg" style={{ marginTop: '300px' }}>
                        <div className='card' style={{ borderRadius: 0 }}>
                            <div className='card-body'>
                                <h3>Created movies</h3>
                                <div className="container mt-3">
                                    <div className="row justify-content-center gy-5">
                                        <Card style = {{width: '50%', height: '50%'}} title = "Jaws" posterUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgF2v9aJyhpN88rs9pGpjAu2htkrp_Vdrn0w&usqp=CAU"/>
                                        <Card style = {{width: '50%', height: '50%'}} title = "Jaws 2" posterUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgF2v9aJyhpN88rs9pGpjAu2htkrp_Vdrn0w&usqp=CAU"/>
                                        <Card style = {{width: '50%', height: '50%'}} title = "Jaws 3" posterUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgF2v9aJyhpN88rs9pGpjAu2htkrp_Vdrn0w&usqp=CAU"/>
                                    </div>
                                </div>
                                <h3 className='mt-3'>Created Tv-shows</h3>
                                <div className="container mt-3">
                                    <div className="row justify-content-center gy-5">
                                        <Card style = {{width: '50%', height: '50%'}} title = "Loki" posterUrl="https://cdn.shopify.com/s/files/1/0581/5012/5749/products/loki_poster_goldposter_com_3_0565a49a-eae3-49f4-a3bc-af44a2b28dc1_473x700.jpg?v=1639346714"/>
                                        <Card style = {{width: '50%', height: '50%'}} title = "Loki" posterUrl="https://cdn.shopify.com/s/files/1/0581/5012/5749/products/loki_poster_goldposter_com_3_0565a49a-eae3-49f4-a3bc-af44a2b28dc1_473x700.jpg?v=1639346714"/>
                                        <Card style = {{width: '50%', height: '50%'}} title = "Loki" posterUrl="https://cdn.shopify.com/s/files/1/0581/5012/5749/products/loki_poster_goldposter_com_3_0565a49a-eae3-49f4-a3bc-af44a2b28dc1_473x700.jpg?v=1639346714"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}