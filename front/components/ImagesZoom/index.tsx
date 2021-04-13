import React, { useState } from 'react';
import Slick from 'react-slick';
import {
  Global,
  Overlay,
  SlickWrapper,
  ImageWrapper,
  Indicator,
  CloseButton,
} from './styled';

interface ImagesZoomProps {
  images: { src: string }[];
  onClose: () => void;
}

function ImagesZoom({ images, onClose }: ImagesZoomProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <Overlay>
      <Global />
      <header>
        <h1>상세 이미지</h1>
        <CloseButton onClick={onClose} />
      </header>
      <SlickWrapper>
        <div>
          <Slick
            initialSlide={0}
            afterChange={slide => setCurrentSlide(slide)}
            infinite
            arrows={false}
            slidesToShow={1}
            slidesToScroll={1}
          >
            {images.map(v => (
              <ImageWrapper key={v.src}>
                <img src={`http://localhost:3065/${v.src}`} alt={v.src} />
              </ImageWrapper>
            ))}
          </Slick>
          <Indicator>
            <div>
              {currentSlide + 1} / {images.length}
            </div>
          </Indicator>
        </div>
      </SlickWrapper>
    </Overlay>
  );
}

export default ImagesZoom;
