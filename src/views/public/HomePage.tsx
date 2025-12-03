import { Helmet } from 'react-helmet-async';
import { Container, Row, Col } from 'react-bootstrap';
import HeroCarousel from '../../components/public/HeroCarousel';
import SucursalesPreview from '../../components/public/SucursalesPreview';
import MayoristaSection from '../../components/public/MayoristaSection';
import { motion } from 'framer-motion';

const HomePage = () => {
  return (
    <>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>Verdulería La Luna | Maciel, Santa Fe - Venta por Mayor y Menor</title>
        <meta
          name="description"
          content="Verdulería La Luna en Maciel, Santa Fe. 3 sucursales con productos frescos. Venta mayorista de frutas y verduras para comercios. Envíos en toda la zona."
        />
        <meta
          name="keywords"
          content="verdulería, Maciel, Santa Fe, mayorista frutas, mayorista verduras, verduras frescas, envíos verduras"
        />
        <meta property="og:title" content="Verdulería La Luna - Maciel, Santa Fe" />
        <meta property="og:description" content="3 sucursales con productos frescos y venta mayorista" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://laluna123.vercel.app"/>
      </Helmet>

      {/* Hero / Carrusel */}
      <HeroCarousel />

      {/* Sección de Presentación */}
      <section className="py-5 overflow-hidden">
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="mb-4 mb-lg-0">
              <motion.div
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                <h2 className="display-5 fw-bold mb-4">
                  Verdulería La Luna
                </h2>
                <p className="lead mb-4">
                  Somos una empresa familiar con más de 15 años de trayectoria en Maciel, Santa Fe.
                  Nos especializamos en ofrecer productos frescos de la mejor calidad tanto para
                  consumo minorista como mayorista.
                </p>
                <p className="text-muted">
                  Con <strong>4 sucursales estratégicamente ubicadas</strong> en Maciel y Oliveros,
                  estamos siempre cerca para brindarte el mejor servicio. Trabajamos día a día
                  para llevar frescura a tu mesa y a tu negocio.
                </p>
              </motion.div>
            </Col>
            <Col lg={6}>
              <motion.div
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                <img
                  src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&h=400&fit=crop"
                  alt="Verduras frescas"
                  className="img-fluid rounded shadow"
                />
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Sección Mayorista */}
      <MayoristaSection />

      {/* Preview de Sucursales */}
      <SucursalesPreview />

      {/* Sección de Valores */}
      <section className="py-5 bg-white">
        <Container>
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-5">
              <h2 className="display-6 fw-bold mb-3">¿Por qué elegirnos?</h2>
            </div>
          </motion.div>

          <Row className="g-4 text-center">
            <Col md={4}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                <div className="p-4">
                  <div className="display-3 mb-3">🌿</div>
                  <h4 className="fw-bold mb-3">Productos Frescos</h4>
                  <p className="text-muted">
                    Renovamos nuestro stock diariamente para garantizar
                    la frescura de todos nuestros productos.
                  </p>
                </div>
              </motion.div>
            </Col>

            <Col md={4}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                <div className="p-4">
                  <div className="display-3 mb-3">🚚</div>
                  <h4 className="fw-bold mb-3">Envíos a Domicilio</h4>
                  <p className="text-muted">
                    Realizamos entregas en toda la zona de Maciel y alrededores
                    para tu comodidad.
                  </p>
                </div>
              </motion.div>
            </Col>

            <Col md={4}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                <div className="p-4">
                  <div className="display-3 mb-3">💰</div>
                  <h4 className="fw-bold mb-3">Mejores Precios</h4>
                  <p className="text-muted">
                    Precios competitivos tanto para venta minorista como mayorista.
                    Consultá nuestras ofertas semanales.
                  </p>
                </div>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default HomePage;
