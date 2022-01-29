
import './BackgroundImage.scss';

const BackgroundImage = ({ src }) => {

    return (
        <div className="BackgroundImage">
            <img src={src} alt="" height="100%" width="100%" />
        </div>
    );
};


export default BackgroundImage;
