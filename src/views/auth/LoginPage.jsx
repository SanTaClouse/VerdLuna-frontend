import { Helmet } from 'react-helmet-async';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const LoginPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { login, loading: authLoading } = useAuth();

    const [formData, setFormData] = useState({
        usuario: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [cargando, setCargando] = useState(false);

    // Determinar a dónde redirigir después del login
    const from = location.state?.from?.pathname || '/ventas';

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
            const result = await login(formData.usuario, formData.password);

            if (result.success) {
                // Redirigir al destino original o al backoffice
                navigate(from, { replace: true });
            } else {
                setError(result.error || 'Usuario o contraseña incorrectos');
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
                                            <i className="bi bi-exclamation-circle me-2"></i>
                                            {error}
                                        </Alert>
                                    )}

                                    <Form onSubmit={handleSubmit}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>
                                                <i className="bi bi-person me-2"></i>
                                                Usuario
                                            </Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="usuario"
                                                value={formData.usuario}
                                                onChange={handleChange}
                                                placeholder="Ingresá tu usuario"
                                                required
                                                autoComplete="username"
                                                disabled={cargando}
                                            />
                                        </Form.Group>

                                        <Form.Group className="mb-4">
                                            <Form.Label>
                                                <i className="bi bi-lock me-2"></i>
                                                Contraseña
                                            </Form.Label>
                                            <Form.Control
                                                type="password"
                                                name="password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                placeholder="Ingresá tu contraseña"
                                                required
                                                autoComplete="current-password"
                                                disabled={cargando}
                                            />
                                        </Form.Group>

                                        <div className="d-grid mb-3">
                                            <Button
                                                type="submit"
                                                variant="success"
                                                size="lg"
                                                disabled={cargando || authLoading}
                                            >
                                                {cargando ? (
                                                    <>
                                                        <span className="spinner-border spinner-border-sm me-2" />
                                                        Iniciando sesión...
                                                    </>
                                                ) : (
                                                    <>
                                                        <i className="bi bi-box-arrow-in-right me-2"></i>
                                                        Iniciar Sesión
                                                    </>
                                                )}
                                            </Button>
                                        </div>

                                        {/* Credenciales de prueba - ELIMINAR EN PRODUCCIÓN */}
                                        {import.meta.env.DEV && (
                                            <div className="text-center">
                                                <small className="text-muted">
                                                    <strong>Credenciales de prueba:</strong><br />
                                                    Usuario: <code>admin</code> | Contraseña: <code>admin123</code>
                                                </small>
                                            </div>
                                        )}
                                    </Form>

                                    <hr className="my-4" />

                                    <div className="text-center">
                                        <Button
                                            variant="link"
                                            onClick={() => navigate('/')}
                                            className="text-decoration-none"
                                        >
                                            <i className="bi bi-arrow-left me-2"></i>
                                            Volver al sitio público
                                        </Button>
                                    </div>
                                </Card.Body>
                            </Card>

                            {/* Indicador de redirección */}
                            {from !== '/ventas' && (
                                <p className="text-center text-white mt-3 small">
                                    <i className="bi bi-info-circle me-1"></i>
                                    Después del login serás redirigido a: {from}
                                </p>
                            )}
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
};

export default LoginPage;