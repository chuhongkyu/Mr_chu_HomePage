import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

interface ImageDimmerProps {
  imageUrl: string;
  alt: string;
}

const ImgContainer = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    &:hover{
        .__dim{
            /* display: none; */
            opacity: 0;
            transition: 0.5s ease-in-out;
        }
    }
    .__dim{
        z-index: 1;
        position: absolute; 
        top: 0; 
        left: 0; 
        width: 100%; 
        height: 100%;
        display: block;
        opacity: 1;
        transition: 0.5s ease-in-out;
    }
    img{
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    @media ${(props) => props.theme.device.mac} {
    }
    @media ${(props) => props.theme.device.mobile} {

    }
`;


function ImageDimmer({ imageUrl, alt }: ImageDimmerProps) {
  const [imageColor, setImageColor] = useState<string>('');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    const image = new Image();
    image.crossOrigin = 'anonymous';
    image.src = imageUrl;

    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;
      context?.drawImage(image, 0, 0, image.width, image.height);

      const imageData = context?.getImageData(0, 0, image.width, image.height)?.data;
      if (!imageData) return
      let red = 0;
      let green = 0;
      let blue = 0;

      for (let i = 0; i < imageData.length; i += 4) {
        red += imageData[i];
        green += imageData[i + 1];
        blue += imageData[i + 2];
      }

      red /= imageData.length / 4;
      green /= imageData.length / 4;
      blue /= imageData.length / 4;

      setImageColor(`rgba(${red}, ${green}, ${blue}, 1) 20%, rgba(${red}, ${green}, ${blue}, 0.4) 100%`);

    };

  }, [imageUrl]);

  return (
    <ImgContainer>
      <img src={imageUrl} alt={alt} />
      <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
      <div className="__dim" style={{ background: `linear-gradient(40deg, ${imageColor})` }}></div>
    </ImgContainer>
  );
}

export default ImageDimmer;