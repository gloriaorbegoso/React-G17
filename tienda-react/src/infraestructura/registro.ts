import type { RegistroUsuario, RespuestaRegistro } from "../dominio/tipos";

const BASE = import.meta.env.VITE_API_URL;

export async function registrarUsuario(datos: RegistroUsuario): Promise<RespuestaRegistro> {

    const r = await fetch(`${BASE}/users/add`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({firstName: datos.nombre.trim(),lastName: datos.apellidos.trim(),age: Number(datos.edad),email: datos.correo.trim(),username: datos.usuario.trim(),password: datos.contraseña})
    });

    if (!r.ok) {throw new Error("No se pudo procesar el registro.");}

    const data = (await r.json()) as RespuestaRegistro;

    return {
        id: data.id,
        nombre: data.nombre,
        apellidos: data.apellidos,
        edad: data.edad,
        correo: data.correo,
        usuario: data.usuario
    };
}