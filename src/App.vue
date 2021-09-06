<template>
  <div id="app">
    <h1>VUE-HOTZONE</h1>
    <hr>
    <h2>Try drag red area or drag create a new area</h2>
    <h2>👇</h2>
    <hotzone
      :image="image"
      :zonesInit="zones"
      :zoneStyle="{ background: 'rgb(0,0,0)'}"
      @add="handleAdd"
      @remove="handleRemove"
      @change="handleChange"
    ></hotzone>
    <button @click="handleAddZone">添加热区</button>
    <h2>Try click your areas</h2>
    <h2>👇</h2>
    <div class="wrap">
      <img :src="image" alt="cover">
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
import hotzone from '../lib'

export default {
  name: 'app',
  data: function () {
    return {
      image: 'https://img95.699pic.com/photo/50046/5562.jpg_wh300.jpg',
      zones: [{
        heightPer: 0.2,
        leftPer: 0,
        topPer: 0,
        widthPer: 0.2,
        url: '',
        // 添加方式：1-绘制 | 2-点击按钮
        addType: 1
      }]
    }
  },
  methods: {
    handleAdd (zone) {
      this.zones.push(zone)
    },
    handleAddZone() {
      const zone = {
        heightPer: 0.2,
        leftPer: 0,
        topPer: 0,
        widthPer: 0.2,
        addType: 2
      }
      this.zones.push(zone)
    },
    handleRemove (index) {
      this.zones.splice(index, 1)
    },
    handleChange () {
      // eslint-disable-next-line
      // console.log('Zones data updated')
    },
    getZoneStyle (val) {
      return `${(val || 0) * 100}%`
    },
    handleZoneClick (url) {
      url && window.open(url)
    }
  },
  components: {
    hotzone
  }
}
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
