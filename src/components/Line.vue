<template>
  <DxChart
    id="chart"
    :data-source="adaptedSource"
    palette="Violet"
  >
    <DxCommonSeriesSettings
      type="line"
      argument-field="date"
    />
    <DxSeries
      value-field="percent"
      name="Процент"
    />
    <DxMargin :bottom="20" />
    <DxValueAxis>
      <DxGrid :visible="true" />
    </DxValueAxis>
    <DxLegend
      vertical-alignment="bottom"
      horizontal-alignment="center"
      item-text-position="bottom"
    />
    <DxExport :enabled="true" />
  </DxChart>
</template>

<script>
import {
  DxChart,
  DxSeries,
  DxCommonSeriesSettings,
  DxExport,
  DxGrid,
  DxMargin,
  DxLegend,
  DxValueAxis
} from 'devextreme-vue/chart'
import Moment from 'moment'

export default {
  name: 'LineChart',
  components: {
    DxChart,
    DxSeries,
    DxValueAxis,
    DxCommonSeriesSettings,
    DxExport,
    DxGrid,
    DxMargin,
    DxLegend,
  },
  props: {
    source: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      type: 'line'
    }
  },
  computed: {
    adaptedSource() {
      return this.source.map(item => {
        return { date: new Moment(item['Дата']).format('DD.MM.YY'), percent: item['Процент'] }
      })
    }
  }
}
</script>

<style scoped>

</style>