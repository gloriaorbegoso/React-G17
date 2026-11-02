import {createContext, useEffect, useReducer, type ReactNode} from "react";
import type { Producto } from "../dominio/tipos";
import { reducirFavoritos } from "../dominio/favorito";

interface ValorFavoritos {
    favoritos: Producto[];
    agregar: (producto: Producto) => void;
    quitar: (id: number) => void;
    esFavorito: (id: number) => boolean;
    vaciar: () => void;
}

const CLAVE_FAVORITOS = "tienda_favoritos";
export const FavoritosContext = createContext<ValorFavoritos | null>(null);

function leerFavoritos() : Producto[] {
    try {
        const crudo: unknown = JSON.parse(localStorage.getItem(CLAVE_FAVORITOS) ?? "[]");
        return Array.isArray(crudo) ? (crudo as Producto[]) : [];
    } catch (error) {
        return [];
    }
}

export function FavoritosProvider({children}: {children: ReactNode}) {
    const [favoritos, despachar] = useReducer(reducirFavoritos,[],leerFavoritos);
    useEffect(() => {
        try {
            localStorage.setItem(CLAVE_FAVORITOS,JSON.stringify(favoritos));
        } catch (error) {
            console.warn("No se pudieron guardar los favoritos", error instanceof Error ? error.message : error);
        }
    }, [favoritos]);

    function agregar(producto: Producto) {
        despachar({ tipo: "agregar", producto });
    }
    function quitar(id: number) {
        despachar({ tipo: "quitar", id });
    }
    function esFavorito(id: number) : boolean {
        return favoritos.find((p) => p.id === id) !== undefined;
    }
    function vaciar() {
        despachar({ tipo: "vaciar" });
    }

    return (
        <FavoritosContext.Provider value={{ favoritos, agregar, quitar, esFavorito, vaciar }}>
            {children}
        </FavoritosContext.Provider>
    );
}