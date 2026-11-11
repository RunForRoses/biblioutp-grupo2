export const LIBROS_INICIALES = [
    {
        id: 1,
        nombre: "JavaScript: La Guía Definitiva",
        sede: "Lima Centro",
        capacidad: 15,
        formatos: ["Físico", "E-book", "Audiolibro"],
        estado: "disponible"
    },
    {
        id: 2,
        nombre: "Código Limpio: Manual de Estilo Ágil",
        sede: "Lima Centro",
        capacidad: 20,
        formatos: ["Físico", "E-book"],
        estado: "disponible"
    },
    {
        id: 3,
        nombre: "Estructuras de Datos y Algoritmos en JavaScript",
        sede: "Lima Sur",
        capacidad: 10,
        formatos: ["Físico"],
        estado: "disponible"
    },
    {
        id: 4,
        nombre: "Patrones de Diseño de Software",
        sede: "Lima Norte",
        capacidad: 25,
        formatos: ["Físico", "E-book"],
        estado: "disponible"
    },
    {
        id: 5,
        nombre: "Introducción a la Arquitectura de Software",
        sede: "San Juan de Lurigancho",
        capacidad: 8,
        formatos: ["Físico"],
        estado: "agotado"
    },
    {
        id: 6,
        nombre: "Aprende React: De Cero a Producción",
        sede: "Lima Centro",
        capacidad: 18,
        formatos: ["Físico", "E-book"],
        estado: "disponible"
    },
    {
        id: 7,
        nombre: "Desarrollo Web Moderno con Vue.js 3",
        sede: "Arequipa",
        capacidad: 12,
        formatos: ["Físico"],
        estado: "disponible"
    },
    {
        id: 8,
        nombre: "Fundamentos y Diseño de Bases de Datos",
        sede: "Lima Sur",
        capacidad: 5,
        formatos: ["Físico", "E-book"],
        estado: "agotado"
    }
];

export const PRESTAMOS_INICIALES = [
    {
        id: 1,
        codigo: "PRE-0001",
        libroId: 1,
        usuarioId: 3,
        nombreUsuario: "Luis Quispe",
        libro: "JavaScript: La Guía Definitiva",
        formato: "Físico",
        fecha: "2026-11-20",
        horaInicio: "08:00",
        horaFin: "10:00",
        motivo: "Estudio de fundamentos ES6+",
        estado: "aprobada"
    },
    {
        id: 2,
        codigo: "PRE-0002",
        libroId: 2,
        usuarioId: 3,
        nombreUsuario: "Luis Quispe",
        libro: "Código Limpio: Manual de Estilo Ágil",
        formato: "E-book",
        fecha: "2026-11-22",
        horaInicio: "10:00",
        horaFin: "12:00",
        motivo: "Buenas prácticas de programación",
        estado: "pendiente"
    }
];

export const USUARIOS_INICIALES = [
    {
        id: 3,
        nombre: "Luis Quispe",
        correo: "u20231234@utp.edu.pe",
        codigo: "U20231234",
        rol: "estudiante",
        password: "est123"
    },
    {
        id: 4,
        nombre: "Valeria Ramos",
        correo: "u20224567@utp.edu.pe",
        codigo: "U20224567",
        rol: "estudiante",
        password: "est123"
    }
];