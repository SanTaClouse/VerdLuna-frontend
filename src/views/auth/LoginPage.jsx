import { Helmet } from 'react-helmet-async';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        usuario: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [cargando, setCargando] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setCargando(true);
        setError('');

        try {
            // TODO: Conectar con backend real
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Simulación de login
            if (formData.usuario === 'admin' && formData.password === 'admin123') {
                console.log('Login exitoso');
                // TODO: Guardar token/sesión
                navigate('/ventas');
            } else {
                setError('Usuario o contraseña incorrectos');
            }
        } catch (err) {
            setError('Error al iniciar sesión. Intenta nuevamente.');
        } finally {
            setCargando(false);
        }
    };

    return (
        <>
            <Helmet>
                <title>Acceso Administradores | Verdulería La Luna</title>
                <meta name="robots" content="noindex, nofollow" />
            </Helmet>

            <div
                className="min-vh-100 d-flex align-items-center"
                style={{
                    background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)'
                }}
            >
                <Container>
                    <Row className="justify-content-center">
                        <Col xs={12} sm={10} md={8} lg={5}>
                            <Card className="shadow-lg border-0">
                                <Card.Body className="p-5">
                                    <div className="text-center mb-4">
                                        <h2 className="fw-bold mb-2">🌙 La Luna</h2>
                                        <p className="text-muted">Acceso al Sistema Administrativo</p>
                                    </div>

                                    {error && (
                                        <Alert variant="danger" dismissible onClose={() => setError('')}>
                                            {error}
                                        </Alert>
                                    )}

                                    <Form onSubmit={handleSubmit}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Usuario</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="usuario"
                                                value={formData.usuario}
                                                onChange={handleChange}
                                                placeholder="Ingresá tu usuario"
                                                required
                                                autoComplete="username"
                                            />
                                        </Form.Group>

                                        <Form.Group className="mb-4">
                                            <Form.Label>Contraseña</Form.Label>
                                            <Form.Control
                                                type="password"
                                                name="password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                placeholder="Ingresá tu contraseña"
                                                required
                                                autoComplete="current-password"
                                            />
                                        </Form.Group>

                                        <div className="d-grid mb-3">
                                            <Button
                                                type="submit"
                                                variant="success"
                                                size="lg"
                                                disabled={cargando}
                                            >
                                                {cargando ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                                            </Button>
                                        </div>

                                        <div className="text-center">
                                            <small className="text-muted">
                                                Credenciales de prueba:<br />
                                                Usuario: <code>admin</code> | Contraseña: <code>admin123</code>
                                            </small>
                                        </div>
                                    </Form>

                                    <hr className="my-4" />

                                    <div className="text-center">
                                        <Button
                                            variant="link"
                                            onClick={() => navigate('/')}
                                            className="text-decoration-none"
                                        >
                                            ← Volver al sitio público
                                        </Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
};

export default LoginPage;