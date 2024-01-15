import { CarouselItemStyled } from './CarouselItem.styles';

// code
function CarouselItem({ item }) {
  return (
    <CarouselItemStyled>
      <div className="text-area">
        <div className="text-content">
          <h1>{item.title}</h1>
          <h2>{item.description}</h2>
        </div>
      </div>
      <div className="image-area">
        <img src={item.image} alt={item.title} />
      </div>
    </CarouselItemStyled>
  );
}

export default CarouselItem;
