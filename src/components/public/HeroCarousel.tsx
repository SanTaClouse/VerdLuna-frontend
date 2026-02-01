import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  cta: {
    text: string;
    link: string;
  };
}

const HeroCarousel = () => {
  const slides: Slide[] = [
    {
      id: 1,
      title: "Verdulería La Luna",
      subtitle: "Frescura y calidad en Maciel, Santa Fe",
      description: "4 sucursales en servicio ",
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&h=600&fit=crop",
      // image: "https://res.cloudinary.com/dlw9ocu3b/image/upload/v1769925170/Cajones_de_frutas_de_lejos_cjolkx.jpg",
      cta: { text: "Ver sucursales", link: "/sucursales" }
    },
    {
      id: 2,
      title: "Venta Mayorista",
      subtitle: "Proveedores de verdulerías y comercios",
      description: "Más de 10 clientes mayoristas en la zona confían en nosotros",
      image: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=1200&h=600&fit=crop",
      cta: { text: "Conocer más", link: "/mayorista" }
    },
    {
      id: 3,
      title: "¿Querés abrir tu verdulería?",
      subtitle: "Te ayudamos a comenzar",
      description: "Pedidos mayoristas con la mejor calidad y precio",
      image: "https://images.unsplash.com/photo-1610348725531-843dff563e2c?w=1200&h=600&fit=crop",
      cta: { text: "Hacer pedido", link: "/mayorista" }
    }
  ];

  return (
    <Carousel fade interval={5000} className="hero-carousel">
      {slides.map((slide) => (
        <Carousel.Item key={slide.id}>
          <div
            className="carousel-image-wrapper"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${slide.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              height: '500px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Carousel.Caption className="text-center">
              <h1 className="display-4 fw-bold text-white mb-3">
                {slide.title}
              </h1>
              <h3 className="text-white mb-3">
                {slide.subtitle}
              </h3>
              <p className="lead text-white mb-4">
                {slide.description}
              </p>
              <Link
                to={slide.cta.link}
                className="btn btn-success btn-lg px-5 py-3"
              >
                {slide.cta.text}
              </Link>
            </Carousel.Caption>
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default HeroCarousel;
