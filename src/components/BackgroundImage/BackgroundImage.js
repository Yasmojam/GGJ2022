
import './BackgroundImage.scss';
import LazyLoad from 'react-lazyload';

const BackgroundImage = ({ src }) => {
    return (
        <div className="BackgroundImage">
            <LazyLoad height={500} style={{
                display: 'flex',
                justifyContent: 'center'
            }}>
                <img src={src} />
            </LazyLoad>
        </div>
    );
};


export default BackgroundImage;
