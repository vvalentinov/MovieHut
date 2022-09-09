import { useParams } from "react-router-dom"
import { useActor } from "../../hooks/useActor";
import { ActorDetailsCard } from "./ActorDetailsCard/ActorDetailsCard";

export const ActorDetails = () => {
    const { actorId } = useParams();
    const { actor, setActor } = useActor(actorId);
    console.log(actor);
    return (
        <div className="container my-4">
            <div className={'card'}>
                <div className='card-body'>
                    <div className="row">
                        <div className="col-md-2">
                            <img className="img-fluid" src={actor?.imageUrl} alt="photo" />
                        </div>
                        <div className="col">
                            <h1>{actor?.name}</h1>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                        </div>
                        <div className="row my-3">
                            <div className="col-md-2">

                            </div>
                            <div className="col">
                                <h3>Films</h3>
                                <div className="container my-5">
                                    <div className="row justify-content-center gy-5">
                                        <ActorDetailsCard title = "Bullet Train" posterUrl = 'https://www.filmibeat.com/img/320x100x392/popcorn/trending_news/brad-pitts-bullet-train-gets-a-release-date-6092-20220602121819.jpg'/>
                                        <ActorDetailsCard title = "Bullet Train" posterUrl = 'https://www.filmibeat.com/img/320x100x392/popcorn/trending_news/brad-pitts-bullet-train-gets-a-release-date-6092-20220602121819.jpg'/>
                                        <ActorDetailsCard title = "Bullet Train" posterUrl = 'https://www.filmibeat.com/img/320x100x392/popcorn/trending_news/brad-pitts-bullet-train-gets-a-release-date-6092-20220602121819.jpg'/>
                                        <ActorDetailsCard title = "Bullet Train" posterUrl = 'https://www.filmibeat.com/img/320x100x392/popcorn/trending_news/brad-pitts-bullet-train-gets-a-release-date-6092-20220602121819.jpg'/>
                                        <ActorDetailsCard title = "Bullet Train" posterUrl = 'https://www.filmibeat.com/img/320x100x392/popcorn/trending_news/brad-pitts-bullet-train-gets-a-release-date-6092-20220602121819.jpg'/>
                                        <ActorDetailsCard title = "Bullet Train" posterUrl = 'https://www.filmibeat.com/img/320x100x392/popcorn/trending_news/brad-pitts-bullet-train-gets-a-release-date-6092-20220602121819.jpg'/>
                                        <ActorDetailsCard title = "Bullet Train" posterUrl = 'https://www.filmibeat.com/img/320x100x392/popcorn/trending_news/brad-pitts-bullet-train-gets-a-release-date-6092-20220602121819.jpg'/>
                                        <ActorDetailsCard title = "Bullet Train" posterUrl = 'https://www.filmibeat.com/img/320x100x392/popcorn/trending_news/brad-pitts-bullet-train-gets-a-release-date-6092-20220602121819.jpg'/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}