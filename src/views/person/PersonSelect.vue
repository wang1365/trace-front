<template>
  <div class="main">
    <div class="label">{{ label + '：' }}</div>
    <el-select v-model="currentPersonId" size="small" placeholder="请选择">
      <el-option v-for="item in data" :key="item.id" :label="item.name" :value="item.value"/>
    </el-select>
  </div>
</template>

<script>
import * as api from '@/api/person'
export default {
  name: 'PersonSelect',
  model: {
    prop: 'personId',
    event: 'change'
  },
  props: {
    value: {
      type: Number,
      default: null
    },
    personId: {
      type: Number,
      default: null
    },
    label: {
      type: String,
      default: '人员'
    }
  },
  data() {
    return {
      data: [],
      currentPersonId: null
    }
  },
  watch: {
    currentPersonId(newVal) {
      this.$emit('change', newVal)
    }
  },
  mounted() {
    api.getFarmerList().then((res) => {
      this.data = res.data.data
    })
  }
}

</script>

<style scoped>
.label {
  display: inline;
  color: #5a5e66;
  font-size: 13px;
}
.main {
  display: inline;
}
</style>
