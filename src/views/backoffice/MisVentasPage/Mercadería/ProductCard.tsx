import { Button } from "react-bootstrap";

const ProductCard = () => {
    return (
        <div className="container-fluid border rounded p-1 d-flex gap-3">
            <Button variant="light">Producto</Button>
            <Button variant="light">Cantidad</Button>
            <Button variant="success">+</Button>
        </div>
    );
};

export default ProductCard;