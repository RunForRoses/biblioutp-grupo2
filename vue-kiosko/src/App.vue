<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import GrillaDisponibilidad from './components/GrillaDisponibilidad.vue';
import {
  obtenerHorasGrilla,
  construirGrillaDisponibilidad,
  obtenerSedesUnicas,
} from '../../core-js/estadisticas.js';

const API_URL = 'http://localhost:3000';
const libros = ref([]);
const prestamos = ref([]);
const cargando = ref(true);
const error = ref('');

const sedeSeleccionada = ref('todas');
const fechaSeleccionada = ref(new Date().toISOString().split('T')[0]);
const celdaSeleccionada = ref(null);
const esOscuro = ref(localStorage.getItem('kiosko_oscuro') === 'true');
let intervaloId = null;

const horas = obtenerHorasGrilla(7, 22);

const aplicarTema = () => {
  document.body.classList.toggle('tema-oscuro', esOscuro.value);
};

const toggleOscuro = () => {
  esOscuro.value = !esOscuro.value;
  localStorage.setItem('kiosko_oscuro', String(esOscuro.value));
  aplicarTema();
};

const cargarDatos = async (silencioso = false) => {
  if (!silencioso) cargando.value = true;
  error.value = '';
  try {
    const [resLibros, resPrestamos] = await Promise.all([
      fetch(`${API_URL}/libros`),
      fetch(`${API_URL}/prestamos`),
    ]);
    if (!resLibros.ok || !resPrestamos.ok) {
      throw new Error('Error al consultar el API de BiblioUTP.');
    }
    libros.value = await resLibros.json();
    prestamos.value = await resPrestamos.json();
  } catch (err) {
    error.value = err.message || 'No se pudo conectar con api-mock (puerto 3000).';
  } finally {
    cargando.value = false;
  }
};

onMounted(() => {
  aplicarTema();
  cargarDatos(false);
  intervaloId = setInterval(() => cargarDatos(true), 30000);
});

onUnmounted(() => {
  if (intervaloId) clearInterval(intervaloId);
});

const sedes = computed(() => ['todas', ...obtenerSedesUnicas(libros.value)]);

const librosFiltrados = computed(() => {
  if (sedeSeleccionada.value === 'todas') return libros.value;
  return libros.value.filter((l) => l.sede === sedeSeleccionada.value);
});

const filasGrilla = computed(() =>
  construirGrillaDisponibilidad(librosFiltrados.value, prestamos.value, fechaSeleccionada.value, 7, 22)
);

const verDetalle = (celda) => {
  celdaSeleccionada.value = celda;
};
</script>

<template>
  <main class="kiosko">
    <header class="cabecera">
      <div>
        <span class="badge-utp">UTP · KIOSKO EN VIVO</span>
        <h1>Disponibilidad Diaria de Libros</h1>
        <p>Consulta horarios libres y ocupados (actualización automática cada 30 s).</p>
      </div>
      <div class="controles">
        <label>
          <span>Sede:</span>
          <select v-model="sedeSeleccionada">
            <option v-for="sede in sedes" :key="sede" :value="sede">
              {{ sede === 'todas' ? 'Todas las sedes' : sede }}
            </option>
          </select>
        </label>
        <label>
          <span>Fecha:</span>
          <input type="date" v-model="fechaSeleccionada" />
        </label>
        <button type="button" class="btn-tema" @click="toggleOscuro">
          {{ esOscuro ? '☀️ Modo Claro' : '🌙 Modo Oscuro' }}
        </button>
      </div>
    </header>

    <section class="leyenda">
      <span>🟩 Libre</span>
      <span>🟨 Pendiente</span>
      <span>🟥 Ocupada (Aprobada)</span>
    </section>

    <div v-if="cargando" class="estado-msg">Cargando grilla de disponibilidad...</div>
    <div v-else-if="error" class="estado-msg error">{{ error }}</div>
    <div v-else-if="filasGrilla.length === 0" class="estado-msg">No hay libros para la sede seleccionada.</div>
    <GrillaDisponibilidad
      v-else
      :horas="horas"
      :filas="filasGrilla"
      @seleccionar="verDetalle"
    />

    <section v-if="celdaSeleccionada" class="detalle-celda">
      <div>
        <strong>{{ celdaSeleccionada.libro.nombre }}</strong> ({{ celdaSeleccionada.libro.sede }}) ·
        Franja: <strong>{{ celdaSeleccionada.hora }}</strong>
        <p v-if="celdaSeleccionada.prestamo" class="detalle-info">
          Código: <code>{{ celdaSeleccionada.prestamo.codigo }}</code> ·
          Estado: <strong>{{ celdaSeleccionada.prestamo.estado }}</strong> ·
          Horario: {{ celdaSeleccionada.prestamo.horaInicio }} - {{ celdaSeleccionada.prestamo.horaFin }} ·
          Motivo: {{ celdaSeleccionada.prestamo.motivo }}
        </p>
        <p v-else class="detalle-info">
          Este libro se encuentra disponible en esta hora para solicitar préstamo.
        </p>
      </div>
      <button type="button" @click="celdaSeleccionada = null">Cerrar</button>
    </section>
  </main>
</template>

<style scoped>
.kiosko { max-width: 1480px; margin: 0 auto; padding: 28px; }
.cabecera { display: flex; justify-content: space-between; align-items: flex-end; flex-wrap: wrap; gap: 16px; margin-bottom: 18px; }
.badge-utp { background: #b91c1c; color: #fff; font-size: 12px; font-weight: 700; padding: 4px 12px; border-radius: 99px; }
h1 { margin: 8px 0 4px; font-size: 30px; color: var(--text-main); }
.cabecera p { margin: 0; color: var(--text-muted); font-size: 15px; }
.controles { display: flex; gap: 12px; flex-wrap: wrap; align-items: flex-end; }
.controles label { display: flex; flex-direction: column; font-size: 13px; font-weight: 600; color: var(--text-main); gap: 4px; }
.controles select, .controles input { padding: 9px 12px; border: 1px solid var(--border-color); border-radius: 8px; font-size: 14px; background: var(--bg-card); color: var(--text-main); }
.btn-tema { padding: 9px 14px; border: 1px solid var(--border-color); border-radius: 8px; background: var(--bg-card); color: var(--text-main); font-size: 14px; font-weight: 600; cursor: pointer; }
.leyenda { display: flex; gap: 18px; margin-bottom: 16px; font-size: 14px; font-weight: 600; color: var(--text-main); }
.estado-msg { background: var(--bg-card); padding: 36px; text-align: center; border-radius: 12px; border: 1px solid var(--border-color); color: var(--text-muted); font-size: 15px; }
.estado-msg.error { color: #ef4444; border-color: #fca5a5; }
.detalle-celda { margin-top: 18px; background: var(--bg-card); border: 1px solid var(--border-color); border-left: 5px solid #b91c1c; border-radius: 10px; padding: 16px 20px; display: flex; justify-content: space-between; align-items: center; gap: 12px; font-size: 15px; }
.detalle-info { margin: 6px 0 0; font-size: 14px; color: var(--text-muted); }
.detalle-celda button { padding: 8px 14px; border: 1px solid var(--border-color); background: var(--bg-col); color: var(--text-main); border-radius: 6px; cursor: pointer; font-weight: 600; }
</style>
