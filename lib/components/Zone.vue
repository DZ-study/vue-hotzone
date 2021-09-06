<template>
  <li
    v-drag-item
    :style="{top: zoneTop, left: zoneLeft, width: zoneWidth, height: zoneHeight}"
  >
    <ul
      v-change-size
      class="hz-m-box"
      :class="{
        'hz-z-hidden': tooSmall,
        'hz-m-hoverbox': !hideZone
      }"
      :style="zoneStyle"
    >
      <li class="hz-u-index" :title="`热区${index + 1}`">{{ index + 1 }}</li>
      <li class="hz-u-url">{{ setting.url }}</li>
      <li
        title="删除该热区"
        v-show="!hideZone"
        class="hz-u-close hz-icon hz-icon-trash"
        @click.stop="delItem(index)"
      ></li>
      <li class="hz-u-edit-button"><span @click="isEditUrl=true">{{ url ? '修改链接' : '添加链接' }}</span></li>
      <li class="hz-u-square hz-u-square-tl" data-pointer="dealTL"></li>
      <li class="hz-u-square hz-u-square-tc" data-pointer="dealTC"></li>
      <li class="hz-u-square hz-u-square-tr" data-pointer="dealTR"></li>
      <li class="hz-u-square hz-u-square-cl" data-pointer="dealCL"></li>
      <li class="hz-u-square hz-u-square-cr" data-pointer="dealCR"></li>
      <li class="hz-u-square hz-u-square-bl" data-pointer="dealBL"></li>
      <li class="hz-u-square hz-u-square-bc" data-pointer="dealBC"></li>
      <li class="hz-u-square hz-u-square-br" data-pointer="dealBR"></li>
    </ul>
    <el-dialog v-model="isEditUrl" title="编辑链接" width="500px" :append-to-body="true" top="20vh">
      <div :style="{display: 'flex', alignItems: 'center'}">
        <span :style="{whiteSpace: 'noWrap'}">链接地址：</span>
        <el-input v-model="url" size="small" :clearable="true" />
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button size="mini" @click="isEditUrl=false; url = setting.url">取消</el-button>
          <el-button size="mini" type="primary" @click="handleSave">保存</el-button>
        </span>
      </template>
    </el-dialog>
  </li>
</template>

<script>
import changeSize from '../directives/changeSize'
import dragItem from '../directives/dragItem'
import { ElDialog, ElButton, ElInput } from 'element-plus'

export default {
  name: 'Zone',
  components: {
    ElDialog,
    ElInput,
    ElButton
  },
  data () {
    return {
      zoneTop: '',
      zoneLeft: '',
      zoneWidth: '',
      zoneHeight: '',
      hideZone: false,
      tooSmall: false,
      url: '',
      isEditUrl: false
    }
  },
  props: [
    'index',
    'setting',
    'zoneStyle'
  ],
  mounted () {
    this.setZoneInfo(this.setting)
  },
  methods: {
    setZoneInfo (val) {
      this.zoneTop = this.getZoneStyle(val.topPer)
      this.zoneLeft = this.getZoneStyle(val.leftPer)
      this.zoneWidth = this.getZoneStyle(val.widthPer)
      this.zoneHeight = this.getZoneStyle(val.heightPer)
      this.tooSmall = val.widthPer < 0.01 && val.heightPer < 0.01
      this.url = val.url
    },
    handlehideZone (isHide = true) {
      if (this.hideZone === isHide) {
        return
      }
      this.hideZone = isHide
    },
    changeInfo (info = {}) {
      console.log('changeInfo...');
      const { index } = this
      this.$emit('changeInfo', {
        info,
        index
      })
    },
    delItem (index) {
      this.$emit('delItem', index)
    },
    getZoneStyle (val) {
      return `${(val || 0) * 100}%`
    },
    handleSave() {
      this.changeInfo({...this.setting, url: this.url})
      this.isEditUrl = false
    }
  },
  watch: {
    setting: {
      handler: function (val) {
        this.setZoneInfo(val)
      },
      deep: true
    }
  },
  directives: {
    changeSize,
    dragItem
  }
}
</script>
