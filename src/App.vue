<template>
  <div id="app">
    <h1>VUE-HOTZONE</h1>
    <hr>
    <h2>Try drag red area or drag create a new area</h2>
    <h2>👇</h2>
    <div :style="{padding: '20px 0', display: 'flex', justifyContent: 'space-between'}">
      <el-button type="primary" size="mini" @click="handleAddZone">添加热区</el-button>
      <el-button type="primary" size="mini" @click="handleSave">保存</el-button>
      <el-button type="primary" size="mini" @click="handleClear">清空</el-button>
    </div>
    <hotzone
      ref="hotzoneRef"
      :image="image"
      :zonesInit="zones"
      :zoneStyle="{ background: 'rgb(0,0,0)'}"
      @add="handleAdd"
      @remove="handleRemove"
      @change="handleChange"
    ></hotzone>
    
    <h2>Try click your areas</h2>
    <h2>👇</h2>
    <div class="wrap">
      <img src="https://img95.699pic.com/photo/50046/5562.jpg_wh300.jpg" alt="cover">
      <div
        class="zone"
        v-for="(zone, index) in zones"
        :key="index"
        :style="{
          width: getZoneStyle(zone.widthPer),
          height: getZoneStyle(zone.heightPer),
          top: getZoneStyle(zone.topPer),
          left: getZoneStyle(zone.leftPer)
        }"
        @click="handleZoneClick(zone.url)"
      ></div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, toRefs, reactive } from 'vue'
import hotzone from '../lib'
import { ElButton } from 'element-plus'
export default defineComponent({
  components: {
    ElButton,
    hotzone
  },
  setup() {
    const state = reactive({
      image: 'https://img95.699pic.com/photo/50046/5562.jpg_wh300.jpg',
      zones: [{
        heightPer: 0.2,
        leftPer: 0,
        topPer: 0,
        widthPer: 0.2,
      }],
    })

    const hotzoneRef =  ref(null) 

    const handleAdd = (zone) => {
      state.zones.push(zone)
    }
    const handleAddZone = () => {
      console.log(hotzoneRef)
      const zone = {
        heightPer: 0.2,
        leftPer: 0,
        topPer: 0,
        widthPer: 0.2,
      }
      hotzoneRef.value.addItem(zone)
    }
    const handleRemove = (index) => {
      console.log(index, state.zones)
      state.zones.splice(index, 1)
    }
    const handleChange = () => {
      // eslint-disable-next-line
      // console.log('Zones data updated')
    }
    const getZoneStyle = (val) => {
      return `${(val || 0) * 100}%`
    }
    const handleZoneClick = (url) => {
      url && window.open(url)
    }
    const handleSave = () => {
      console.log(state.zones)
    }

    const handleClear = () => {
      state.zones.length = 0
      hotzoneRef.value.onClear()
    }

    return {
      ...toRefs(state),
      handleAdd,
      handleAddZone,
      handleRemove,
      handleChange,
      getZoneStyle,
      handleZoneClick,
      handleSave,
      handleClear,
      hotzoneRef
    }
  }
});
</script>

<style>
#app {
  width: 980px;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0 auto;
}

.wrap {
  position: relative;
}

.wrap img {
  width: 100%;
  user-select: none;
  -webkit-user-drag: none;
  -webkit-touch-callout: none;
}

.wrap .zone {
  position: absolute;
  cursor: pointer;

  border: 2px dashed red;
}



input:focus {
  /* box-shadow: 0 0 5px #43D1AF; */
  border: 1px solid #409eff;
}
</style>
