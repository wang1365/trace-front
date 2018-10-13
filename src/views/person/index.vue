<template>
  <el-tabs v-model="activeName" tab-position="top" class="tab" type="border-card" @tab-click="handleClick">
    <el-tab-pane label="种植户" name="first"><PersonPage person-type="1"/></el-tab-pane>
    <el-tab-pane label="采购商" name="second"><PersonPage person-type="2"/></el-tab-pane>
    <el-tab-pane label="运输司机" name="third"><PersonPage person-type="3"/></el-tab-pane>
    <el-tab-pane label="其他" name="other"><PersonPage person-type="10"/></el-tab-pane>
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
  .main {
    padding: 20px
  }
  .el-row {
    margin-bottom: 20px;
  }
  .el-col {
    border-radius: 4px;
  }
  .time {
    font-size: 13px;
    color: #999;
  }
  .card {
    width: 300px;
    height: 370px;
    margin-bottom: 10px;
    background-color: #d3dce6;
  }
  .card:hover {
    width: 330px;
  }
  .bottom {
    bottom: 15px;
    line-height: 12px;
  }
  .button {
    /*padding: 0;*/
    float: right;
  }
  .image {
    width: 100%;
    display: block;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
  .gender-m {
    color: #1478F0;
  }
  .gender-f {
    color: #a13e0d;
  }

  .cell-hover:hover {
    color: blue;
    font-size: large;
  }
  .tab {
    margin-left: 1%;
    margin-top: 1%;
  }
</style>
