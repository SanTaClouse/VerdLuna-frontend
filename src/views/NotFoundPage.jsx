import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const NotFoundPage = () => {
    return (
        <>
            <Helmet>
                <title>Página no encontrada | Verdulería La Luna</title>
                <meta name="robots" content="noindex, nofollow" />
            </Helmet>

            <Container
                className="text-center py-5"
                style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
            >
                <div className="display-1 mb-4">🌙</div>
                <h1 className="display-4 fw-bold mb-3">404</h1>
                <h2 className="text-muted mb-4">Página no encontrada</h2>
                <p className="lead mb-5">
                    Lo sentimos, la página que buscás no existe o fue movida.
                </p>

                <div className="d-flex justify-content-center gap-3 flex-wrap">
                    <Button
                        as={Link}
                        to="/"
                        variant="success"
                        size="lg"
                    >
                        <i className="bi bi-house-door me-2"></i>
                        Ir al inicio
                    </Button>
                    <Button
                        as={Link}
                        to="/contacto"
                        variant="outline-success"
                        size="lg"
                    >
                        <i className="bi bi-envelope me-2"></i>
                        Contactanos
                    </Button>
                </div>
            </Container>
        </>
    );
};

export default NotFoundPage;