import { Link, NavLink } from "react-router-dom";
import formatearPrecio from "../formato";
import { useCart } from "../../aplicacion/useCart";
import { useSesion } from "../../aplicacion/useSesion";
interface Props {
    nombre : string;
    eslogan?: string;
}
export default function Header ( {nombre , eslogan = "Tecnologia para todos"} : Props) {
    const {unidades, total} = useCart();
    const  {usuario, salir} = useSesion();
    return(
        <header className="mb-8 border-b border-gray-200 pb-5">
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">{nombre}</h1>
                    <p className="mt-1 text-sm text-gray-500">{eslogan}</p>
                </div>
                
                <nav className="flex items-center gap-5 text-sm">
                    <NavLink to="/" className={({isActive}) => (isActive ? 'border-blue-600 font-semibold text-blue-700' : 'text-gray-600  hover:text-blue-600')}>Catalogo</NavLink>
                    <NavLink to="/checkout" className={({isActive}) => (isActive ? 'border-blue-600 font-semibold text-blue-700' : 'text-gray-600 hover:text-blue-600')}>Checkout</NavLink>
                    <NavLink to="/favorito" className={({ isActive }) => (isActive ? 'border-blue-600 font-semibold text-blue-700' : 'text-gray-600 hover:text-blue-600')}>Favoritos</NavLink>
                </nav>
            
                <div className="flex flex-wrap items-center gap-4 text-sm">
                    <div className="rounded-lg bg-blue-50 px-3 py-2 font-medium text-blue-700">
                        Carrito: {unidades} productos
                        <span className="ml-2 font-bold">{formatearPrecio(total)}</span>
                    </div>
                    {
                        usuario ? (
                            <div className="flex items-center gap-2">
                                <span className="text-gray-700">Hola, {usuario.nombre}</span>
                                <button className="text-blue-700 underline hover:text-blue-900" onClick={salir}>Salir</button>
                            </div>
                        ) : (
                            <div className="flex flex-wrap items-center gap-3">
                                <Link to="/login" className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700">
                                    Iniciar sesión
                                </Link>
                                <Link to="/register" className="rounded-lg border border-blue-600 px-4 py-2 font-medium text-blue-700 hover:bg-blue-50">
                                    Registrarse
                                </Link>
                            </div>
                        )
                    }
                </div>
            </div>
        </header>
    )
}