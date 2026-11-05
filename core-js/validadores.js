const patronCorreoUTP = /^[a-z0-9._%+-]+@utp\.edu\.pe$/i;

export function esCorreoUTP(correo) {
    if (typeof correo !== 'string') return false;
    return patronCorreoUTP.test(correo.trim());
}

const patronCodigoAlumno = /^U\d{8}$/;

export function esCodigoAlumno(codigo) {
    if (typeof codigo !== 'string') return false;
    return patronCodigoAlumno.test(codigo.trim());
}

/**
 * 3. Validador de Hora
 * Regla: Desde 00:00 hasta 23:59
 * Explicación del patrón:
 *   ([01]\d|2[0-3]) -> Horas: 00 a 19, o 20 a 23
 *   :               -> Los dos puntos obligatorios
 *   [0-5]\d         -> Minutos: 00 a 59
 */
const patronHora = /^([01]\d|2[0-3]):[0-5]\d$/;

export function esHoraValida(hora) {
    if (typeof hora !== 'string') return false;
    return patronHora.test(hora.trim());
}

/**
 * 4. Validador de Fecha (AAAA-MM-DD)
 * Regla: Año de 4 dígitos, mes de 01 a 12, día de 01 a 31
 */
const patronFecha = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

export function esFechaValida(fecha) {
    if (typeof fecha !== 'string') return false;
    return patronFecha.test(fecha.trim());
}

export function validarDatosPrestamo(datos) {
    const listaErrores = [];

    // Validar correo
    if (!esCorreoUTP(datos.correo)) {
        listaErrores.push(`El correo "${datos.correo}" no es válido. Debe ser institucional (@utp.edu.pe).`);
    }

    // Validar codigo
    if (!esCodigoAlumno(datos.codigo)) {
        listaErrores.push(`El código "${datos.codigo}" es inválido. Debe iniciar con U y tener 8 dígitos numéricos.`);
    }

    // Validar fecha
    if (!esFechaValida(datos.fecha)) {
        listaErrores.push(`La fecha "${datos.fecha}" no cumple el formato requerido AAAA-MM-DD.`);
    }

    // Validar horas
    if (!esHoraValida(datos.horaInicio)) {
        listaErrores.push(`La hora de inicio "${datos.horaInicio}" debe tener formato HH:mm (ejemplo: 08:30).`);
    }

    if (!esHoraValida(datos.horaFin)) {
        listaErrores.push(`La hora de fin "${datos.horaFin}" debe tener formato HH:mm (ejemplo: 10:30).`);
    }

    return {
        esValido: listaErrores.length === 0,
        errores: listaErrores
    };
}