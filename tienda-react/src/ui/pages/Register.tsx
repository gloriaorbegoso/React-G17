import { Link } from "react-router-dom";
import { useState, type ChangeEvent, type FormEvent } from "react";
import type { RegistroUsuario } from "../../dominio/tipos";
import { registrarUsuario } from "../../infraestructura/registro";

type Errores = Partial<Record<keyof RegistroUsuario, string>>;

function validar(form : RegistroUsuario): Errores {
    const errores: Errores = {};
    if (form.nombre.trim().length < 3) errores.nombre = "Escribe al menos 3 caracteres.";
    if (form.apellidos.trim().length < 3) errores.apellidos = "Escribe al menos 3 caracteres.";
    if (!Number.isInteger(Number(form.edad)) || Number(form.edad) <= 0) errores.edad = "Ingresa una edad válida.";
    if(!/^\S+@\S+\.\S+$/.test(form.correo)) errores.correo = "Escribe un correo electrónico válido.";
    if (form.usuario.trim().length < 3) errores.usuario = "El usuario debe tener al menos 3 caracteres.";
    if (form.contraseña.length < 6) errores.contraseña = "La contraseña debe tener al menos 6 caracteres.";
    if (form.confirmarContraseña !== form.contraseña) errores.confirmarContraseña = "Las contraseñas deben coincidir.";
    return errores;
}
export default function Register() {
    const [form, setForm] = useState<RegistroUsuario>({nombre: "",apellidos: "",edad: "",correo: "",usuario: "",contraseña: "",confirmarContraseña: ""});
    type TocadoType = Partial<Record<keyof RegistroUsuario, boolean>>;
    const [tocados, setTocados] = useState<TocadoType>({});
    const [enviando, setEnviando] = useState(false);
    const [errorApi, setErrorApi] = useState("");
    const [mensaje, setMensaje] = useState("");
    const errores = validar(form);
    const hayErrores = Object.keys(errores).length > 0;
    const cambiar = (campo : keyof RegistroUsuario) => (e : ChangeEvent<HTMLInputElement>) =>
        setForm((f) => ({...f, [campo] : e.target.value}));
    const marcar = (campo : keyof RegistroUsuario ) => () => 
        setTocados((tocados) => ({...tocados , [campo] : true}));
    async function enviar(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setMensaje("");
        setErrorApi("");
        setTocados({nombre: true,apellidos: true,edad: true,correo: true,usuario: true,contraseña: true,confirmarContraseña: true});
        if (hayErrores) return;
        setEnviando(true);
        try {
            const resultado = await registrarUsuario(form);
            setMensaje(`¡Registro completado! Tu código de usuario es ${resultado.id}.`);
            setForm({nombre: "",apellidos: "",edad: "",correo: "",usuario: "",contraseña: "",confirmarContraseña: ""});
            setTocados({});
        } catch (error) {
            setErrorApi(
                error instanceof Error ? error.message : "No se pudo procesar el registro."
            );
        } finally {
            setEnviando(false);
        }
    }

    return (
        <form onSubmit={enviar} className="mx-auto flex w-full max-w-md flex-col gap-3 rounded-xl border p-6 shadow-sm">
            <h1 className="text-2xl font-bold">Crear cuenta</h1>
            <p className="text-sm text-gray-500">Completa tus datos para registrarte.</p>
            <label className="flex flex-col text-sm">Nombre
            <input type="text" className="rounded border px-3 py-2" value={form.nombre} onChange={cambiar("nombre")} onBlur={marcar("nombre")}/>
                {tocados.nombre && errores.nombre && (
                    <span className="text-xs text-red-600">
                        {errores.nombre}
                    </span>
                )}
            </label>
            <label className="flex flex-col text-sm">Apellidos
            <input type="text" className="rounded border px-3 py-2" value={form.apellidos} onChange={cambiar("apellidos")} onBlur={marcar("apellidos")}/>
                {tocados.apellidos && errores.apellidos && (
                    <span className="text-xs text-red-600">
                        {errores.apellidos}
                    </span>
                )}
            </label>
            <label className="flex flex-col text-sm">Edad
            <input type="number" min="1" className="rounded border px-3 py-2" value={form.edad} onChange={cambiar("edad")} onBlur={marcar("edad")}/>
                {tocados.edad && errores.edad && (
                    <span className="text-xs text-red-600">
                        {errores.edad}
                    </span>
                )}
            </label>
            <label className="flex flex-col text-sm">Correo electrónico
            <input type="email" className="rounded border px-3 py-2" value={form.correo} onChange={cambiar("correo")} onBlur={marcar("correo")}/>
                {tocados.correo && errores.correo && (
                    <span className="text-xs text-red-600">
                        {errores.correo}
                    </span>
                )}
            </label>
            <label className="flex flex-col text-sm">Nombre de usuario
            <input type="text" className="rounded border px-3 py-2" value={form.usuario} onChange={cambiar("usuario")} onBlur={marcar("usuario")}/>
                {tocados.usuario && errores.usuario && (
                    <span className="text-xs text-red-600">
                        {errores.usuario}
                    </span>
                )}
            </label>
            <label className="flex flex-col text-sm">Contraseña
            <input type="password" className="rounded border px-3 py-2" value={form.contraseña} onChange={cambiar("contraseña")} onBlur={marcar("contraseña")}/>
                {tocados.contraseña && errores.contraseña && (
                    <span className="text-xs text-red-600">
                        {errores.contraseña}
                    </span>
                )}
            </label>
            <label className="flex flex-col text-sm">Confirmar contraseña
            <input type="password" className="rounded border px-3 py-2" value={form.confirmarContraseña} onChange={cambiar("confirmarContraseña")} onBlur={marcar("confirmarContraseña")}/>
                {tocados.confirmarContraseña && errores.confirmarContraseña && (
                    <span className="text-xs text-red-600">
                        {errores.confirmarContraseña}
                    </span>
                )}
            </label>
            {errorApi && (
                <p className="text-sm text-red-600">
                    {errorApi}
                </p>
            )}
            {mensaje && (
                <p className="text-sm text-green-700">
                    {mensaje}
                </p>
            )}

            <button type="submit" disabled={enviando} className="mt-2 rounded-full border px-4 py-2 disabled:opacity-50">
                {enviando ? "Registrando..." : "Registrarme"}
            </button>
            <p className="text-center text-sm"> ¿Ya tienes una cuenta?{" "}
                <Link to="/login" className="underline">
                    Inicia sesión
                </Link>
            </p>
        </form>
    );
}