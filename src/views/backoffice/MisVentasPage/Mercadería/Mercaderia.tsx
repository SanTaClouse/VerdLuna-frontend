import ProductCard from "./ProductCard";

const Mercaderia = () => {
    return (
        <div className="container-fluid p-3">
            <h4 className="fw-bold mb-1">👥 Mercadería</h4>
            <p>Acá iría implementada la sección ver el stock de mercadería por verdulería </p>

            <p className="small">Ejemplo: </p>
            <div className="d-flex flex-column gap-1 p-2 ">
                <ProductCard />
            </div>
        </div>
    );
};

export default Mercaderia;