<template>
  <div id="app">
    <div class="selects">
      <div class="select">
        <label>Тип графика</label>
        <select v-model="type">
          <option :key="item" v-for="item in types">{{item}}</option>
        </select>
      </div>
      <div class="select">
        <label>Выберите источник данных</label>
        <select v-model="activeSource">
          <option :key="item.name" v-for="item in sources" :value="item.data">{{item.name}}</option>
        </select>
      </div>
    </div>
    <div class="components" v-if="activeSource">
      <keep-alive>
        <component :is="type" :source="activeSource"></component>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import LineChart from './components/Line'
import { mapActions, mapGetters } from 'vuex'
import Pie from './components/Pie'
import DxSelectBox from 'devextreme-vue/select-box'

export default {
  name: 'App',
  components: { Pie, LineChart, DxSelectBox },
  data: () => ({
    types: ['line-chart', 'pie'],
    type: 'line-chart',
    activeSource: null
  }),
  computed: {
    ...mapGetters(['sources'])
  },
  beforeMount() {
    this.PREPARE_DATA()
  },
  methods: {
    ...mapActions({ PREPARE_DATA: 'PREPARE_DATA' })
  }
}
</script>

<style>
.components {
  width: 100%;
}
.selects {
  display: flex;
  flex-direction: column;
  align-self: flex-start;
}

.select {
  margin-bottom: 20px;
  width: 400px;
  display: flex;
  flex-direction: column;
}
.select select {
  height: 30px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #2c3e50;
  padding: 60px 30px;
  box-sizing: border-box;
}
</style>
