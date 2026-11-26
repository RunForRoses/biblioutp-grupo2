<script setup>
const props = defineProps({
  celda: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['seleccionar']);
</script>

<template>
  <td
    class="celda"
    :class="`estado-${celda.estado}`"
    :title="`${celda.libro.nombre} · ${celda.hora} (${celda.estado})`"
    @click="emit('seleccionar', props.celda)"
  >
    <span v-if="celda.estado === 'libre'">Libre</span>
    <span v-else-if="celda.estado === 'pendiente'">Pend.</span>
    <span v-else>Ocup.</span>
  </td>
</template>

<style scoped>
.celda {
  text-align: center;
  font-size: 13px;
  font-weight: 700;
  padding: 13px 8px;
  min-width: 64px;
  border: 1px solid var(--border-color);
  cursor: pointer;
  transition: transform 0.1s;
}
.celda:hover {
  transform: scale(1.04);
}
.estado-libre {
  background-color: var(--celda-libre-bg);
  color: var(--celda-libre-tx);
}
.estado-pendiente {
  background-color: var(--celda-pend-bg);
  color: var(--celda-pend-tx);
}
.estado-ocupada {
  background-color: var(--celda-ocup-bg);
  color: var(--celda-ocup-tx);
}
</style>
