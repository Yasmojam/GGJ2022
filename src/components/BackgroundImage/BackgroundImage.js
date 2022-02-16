import "./BackgroundImage.scss";
import LazyLoad from "react-lazyload";

const BackgroundImage = ({ src, height }) => {
  return (
    <div className="BackgroundImage">
      <LazyLoad
        height={height}
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <img src={src} />
      </LazyLoad>
    </div>
  );
};

export default BackgroundImage;
