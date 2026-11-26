//Conteo de prestamos agrupados por estado usando reduce
export const contarPrestamosPorEstado = (prestamos) => {
  return prestamos.reduce(
    (acumulador, prestamo) => {
      const estado = prestamo.estado;
      acumulador[estado] = (acumulador[estado] || 0) + 1;
      return acumulador;
    },
    { pendiente: 0, aprobada: 0, rechazada: 0 },
  );
};

//Conteo de préstamos por libro usando la estructura map
export const calcularOcupacionPorLibro = (prestamos) => {
  const mapa = new Map();
  for (const prestamo of prestamos) {
    const actual = mapa.get(prestamo.libroId) || 0;
    mapa.set(prestamo.libroId, actual + 1);
  }
  return mapa;
};

//Obtener la lista de sedes sin repetidos usando Set
export const obtenerSedesUnicas = (libros) => {
  const sedesSet = new Set(libros.map((libro) => libro.sede));
  return Array.from(sedesSet);
};

//Ranking de libros mas prestados
export const rankingLibrosMasPrestados = (prestamos, libros) => {
  const conteos = calcularOcupacionPorLibro(prestamos);

  return [...libros]
    .map((libro) => ({
      id: libro.id,
      nombre: libro.nombre,
      totalPrestamos: conteos.get(libro.id) || 0,
    }))
    .sort((a, b) => b.totalPrestamos - a.totalPrestamos);
};

//Generador de codigos usando closure y padStart
export const crearGeneradorCodigo = (prefijo = "PRE", inicio = 1) => {
  let contador = inicio;
  return () => {
    const numeroFormateado = String(contador).padStart(4, "0");
    const codigoGenerado = `${prefijo}-${numeroFormateado}`;
    contador += 1;
    return codigoGenerado;
  };
};

// Genera los encabezados de hora
export const obtenerHorasGrilla = (horaInicio = 7, horaFin = 22) => {
  const horas = [];
  for (let h = horaInicio; h < horaFin; h++) {
    horas.push(`${String(h).padStart(2, "0")}:00`);
  }
  return horas;
};

const aMinutos = (hhmm) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

// Construye la matriz libro x hora (libre | pendiente | ocupada)
export const construirGrillaDisponibilidad = (libros, prestamos, fecha, horaInicio = 7, horaFin = 22) => {
  const horas = obtenerHorasGrilla(horaInicio, horaFin);

  return libros.map((libro) => {
    const celdas = horas.map((horaStr, idx) => {
      const slotInicio = (horaInicio + idx) * 60;
      const slotFin = slotInicio + 60;

      const cruce = prestamos.find((p) => {
        if (p.libroId !== libro.id || p.fecha !== fecha) return false;
        if (p.estado === "rechazada" || p.estado === "devuelto") return false;
        return aMinutos(p.horaInicio) < slotFin && slotInicio < aMinutos(p.horaFin);
      });

      let estado = "libre";
      if (cruce?.estado === "aprobada") estado = "ocupada";
      else if (cruce?.estado === "pendiente") estado = "pendiente";

      return { hora: horaStr, estado, prestamo: cruce || null, libro };
    });

    return { libro, celdas };
  });
};
