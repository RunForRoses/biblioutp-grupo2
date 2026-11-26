<script setup>
import CeldaHorario from './CeldaHorario.vue';

defineProps({
  horas: { type: Array, required: true },
  filas: { type: Array, required: true },
});

const emit = defineEmits(['seleccionar']);
</script>

<template>
  <div class="tabla-contenedor">
    <table class="grilla">
      <thead>
        <tr>
          <th class="col-libro">Libro (Sede)</th>
          <th v-for="hora in horas" :key="hora">{{ hora }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="fila in filas" :key="fila.libro.id">
          <td class="col-libro">
            <strong>{{ fila.libro.nombre }}</strong>
            <small>{{ fila.libro.sede }}</small>
          </td>
          <CeldaHorario
            v-for="celda in fila.celdas"
            :key="celda.hora"
            :celda="celda"
            @seleccionar="emit('seleccionar', $event)"
          />
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.tabla-contenedor {
  overflow-x: auto;
  background: var(--bg-card);
  border-radius: 14px;
  border: 1px solid var(--border-color);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
}
.grilla {
  width: 100%;
  border-collapse: collapse;
  min-width: 1100px;
}
th {
  background: var(--th-bg);
  color: #fff;
  font-size: 13px;
  padding: 14px 8px;
  text-align: center;
}
.col-libro {
  text-align: left;
  padding: 12px 14px;
  min-width: 245px;
  border: 1px solid var(--border-color);
  background: var(--bg-col);
}
.col-libro strong {
  display: block;
  font-size: 14.5px;
  color: var(--text-main);
}
.col-libro small {
  color: var(--text-muted);
  font-size: 12.5px;
}
</style>
