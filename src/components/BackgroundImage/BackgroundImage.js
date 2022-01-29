
import './BackgroundImage.scss';
import CrossfadeImage from 'react-crossfade-image';

const BackgroundImage = ({ src }) => {

    return (
        <div className="BackgroundImage">
            <CrossfadeImage duration={1000} src={src} alt="" />
        </div>
    );
};


export default BackgroundImage;
