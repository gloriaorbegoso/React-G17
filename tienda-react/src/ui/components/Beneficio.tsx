interface Props {
    titulo : string;
    detalle? : string;
}

export default function Beneficio({titulo, detalle = "Conoce todos nuestros beneficios"} : Props) {
    return (
        <article className="rounded-xl border bg-white p-5">
            <h3 className="text-lg font-bold text-gray-800 text-center">{titulo}</h3>
            <h1 className="mt-2 text-md text-gray-600 text-center">{detalle}</h1>
        </article>
    );
}