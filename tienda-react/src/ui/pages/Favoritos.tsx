import { Link } from "react-router-dom";
import { useFavoritos } from "../../aplicacion/useFavoritos";
import { useCart } from "../../aplicacion/useCart";
import formatearPrecio from "../formato";
import BotonFavorito from "../components/BotonFavorito";

export default function Favoritos() {
    const { favoritos } = useFavoritos();
    const { agregar } = useCart();

    return (
        <section>
            <h1 className="mb-2 text-2xl font-bold">Mis favoritos</h1>
            <p className="mb-6 text-sm text-gray-500">Productos que has guardado en tu lista.</p>
            {favoritos.length === 0 ? (
                <div className="rounded-lg border p-6 text-center">
                    <p className="mb-3 text-gray-600">Todavía no tienes productos favoritos.</p>
                    <Link to="/" className="text-blue-600 underline">
                        Explorar productos
                    </Link>
                </div>
            ) : (
                <div className="flex flex-wrap gap-4">
                    {favoritos.map((producto) => (
                        <article key={producto.id} className="w-64 rounded-xl border p-4">
                            <Link to={`/producto/${producto.id}`}>
                                <img src={producto.imagen} alt={producto.nombre} className="mb-3 aspect-square w-full object-contain"/>
                                <h2 className="font-semibold">
                                    {producto.nombre}
                                </h2>
                            </Link>
                            <p className="my-2 text-sm text-gray-500">
                                {producto.marca}
                            </p>
                            <p className="mb-3 font-medium">
                                {formatearPrecio(producto.precio)}
                            </p>
                            <div className="flex flex-wrap gap-2">
                                <BotonFavorito producto={producto} />
                                <button type="button" onClick={() => agregar(producto)} disabled={producto.stock === 0} className="rounded-full border px-3 py-1 text-sm disabled:opacity-50">
                                    Agregar al carrito
                                </button>
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </section>
    );
}