<template>
  <DxPieChart
    id="pie"
    :data-source="adaptedSource"
    palette="Bright"
    title="Группы"
  >
    <DxSeries
      argument-field="name"
      value-field="part"
    >
      <DxLabel :visible="true">
        <DxConnector
          :visible="true"
          :width="1"
        />
      </DxLabel>
    </DxSeries>
    <DxExport :enabled="true"/>
  </DxPieChart>
</template>

<script>
import DxPieChart, {
  DxSeries,
  DxLabel,
  DxConnector,
  DxExport
} from 'devextreme-vue/pie-chart';

export default {
  name: 'Pie',
  components: {
    DxPieChart,
    DxSeries,
    DxLabel,
    DxConnector,
    DxExport
  },
  props: {
    source: {
      type: Array,
      required: true
    }
  },
  computed: {
    adaptedSource() {
      return this.source.map(item => {
        return { name: item['Группа'], part: item['Доля'] }
      })
    }
  }
}
</script>

<style scoped>

</style>