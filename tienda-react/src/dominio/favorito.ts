import type { Producto } from "./tipos";

export function agregarFavorito(producto: Producto, favoritos: Producto[]): Producto[] {
    const existe = favoritos.find((p) => p.id === producto.id);
    if (existe) return favoritos;
    return [...favoritos, producto];
}

export function quitarFavorito(favoritos: Producto[], id: number): Producto[] {
    return favoritos.filter((p) => p.id !== id);
}

export type AccionFavorito =
    | { tipo: "agregar"; producto: Producto }
    | { tipo: "quitar"; id: number }
    | { tipo: "vaciar" };

export function reducirFavoritos(favoritos: Producto[], accion: AccionFavorito): Producto[] {
    switch (accion.tipo) {
        case "agregar":
            return agregarFavorito(accion.producto, favoritos);
        case "quitar":
            return quitarFavorito(favoritos, accion.id);
        case "vaciar":
            return [];
    }
}