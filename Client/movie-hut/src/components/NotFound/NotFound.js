import groguImage from '../../images/grogu.jpg'
import lightsabesImage from '../../images/lightsabers.jpg'

export const NotFound = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-6 mt-5">
                    <p className='display-1 font-weight-bold'>404 Not Found</p>
                    <p className='display-5 font-weight-light'>Oh snap! Grogu ate your file again.</p>
                    <div>
                        <img className='img-fluid w-50 h-50' src={lightsabesImage} alt="lightsabers" />
                    </div>
                </div>
                <div className="col-6">
                    <img className='img-fluid' src={groguImage} alt="Grogu eating" />
                </div>
            </div>
        </div>
    )
}