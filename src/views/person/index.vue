<template>
  <el-tabs v-model="activeName" tab-position="top" class="tab" type="border-card" @tab-click="handleClick">
    <el-tab-pane label="种植户" name="first"><PersonPage :person-type="1"/></el-tab-pane>
    <el-tab-pane label="采购商" name="second"><PersonPage :person-type="2"/></el-tab-pane>
    <el-tab-pane label="运输司机" name="third"><PersonPage :person-type="3"/></el-tab-pane>
    <el-tab-pane label="其他" name="other"><PersonPage :person-type="10"/></el-tab-pane>
  </el-tabs>
</template>

<script>
import PersonPage from './PersonPage'

export default {
  name: 'Person',
  components: {
    PersonPage
  },
  data() {
    return {
      activeName: 'first'
    }
  },
  created() {
  },
  methods: {
    handleClick() {

    }
  }
}
</script>

<style scoped>
  .tab {
    margin-left: 1%;
    margin-top: 1%;
  }
</style>
