import type { Producto } from "../../dominio/tipos";
import { useFavoritos } from "../../aplicacion/useFavoritos";

interface Props {
    producto: Producto;
}

export default function BotonFavorito({ producto }: Props) {
    const { agregar, quitar, esFavorito } = useFavoritos();

    const marcado = esFavorito(producto.id);

    function manejarClick() {
        if (marcado) {
            quitar(producto.id);
        } else {
            agregar(producto);
        }
    }

    return (
        <button type="button" onClick={manejarClick} aria-label={marcado ? "Quitar de favoritos" : "Agregar a favoritos"}
            aria-pressed={marcado} className={`rounded-full border px-3 py-1 text-sm ${
                marcado ? "border-red-300 bg-red-50 text-red-600" : "border-gray-300 text-gray-600 hover:bg-gray-100"
            }`}>
            {marcado ? "♥" : "♡"}
        </button>
    );
}