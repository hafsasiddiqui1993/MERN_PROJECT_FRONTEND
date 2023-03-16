import Carousel from 'react-bootstrap/Carousel';

function Slider() {
  return (
    <Carousel>
      {/* <Carousel.Item interval={1000}>
        <img
          className="d-block w-100"
          src="../src/assets/photos/Slider4.jpg"
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item> */}
      <Carousel.Item interval={500}>
        <img
          className="d-block w-100"
          src="https://cdn.shopify.com/s/files/1/1153/7200/articles/Benefits_of_resistance_training-squashed.jpg?v=1611347378"
        />
        <Carousel.Caption>
         
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://www.cedars-sinai.org/content/dam/cedars-sinai/blog/2021/7/exercise-caution.jpg"
          
        />
        
        <Carousel.Caption>
          
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Slider;