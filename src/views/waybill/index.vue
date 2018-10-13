<template>
  <div class="main">
    <WaybillDialog ref="formDialog" class="right-btn blue-btn" @add-success="showWaybills"/>
    <el-row>
      <el-button type="success" icon="el-icon-plus" size="small" @click="showModal">新建运单</el-button>
    </el-row>
    <el-row class="table">
      <el-table :data="items" size="small" bwaybill stripe highlight-current-row>
        <el-table-column prop="id" label="ID" sortable width="100" />
        <el-table-column prop="driverName" sortable label="司机姓名" />
        <el-table-column prop="driverPhone" label="司机手机" />
        <el-table-column prop="plateNumber" label="车牌号" />
        <el-table-column prop="startTime" sortable label="起始时间" />
        <el-table-column prop="startLocation" sortable label="起始地点" />
        <el-table-column prop="endTime" sortable label="到达时间" />
        <el-table-column prop="endLocation" sortable label="到达地点" />
        <el-table-column prop="orderId" sortable label="订单号" />
      </el-table>
    </el-row>
    <el-dialog :visible.sync="imageDialogVisible" center>
      <img :src="selectedImage" width="100%" height="100%">
    </el-dialog>
  </div>
</template>

<script>
import { getAllWaybill } from '@/api/waybill'
import WaybillDialog from './WaybillDialog'

export default {
  name: 'Waybill',
  components: {
    WaybillDialog
  },
  data() {
    return {
      items: [],
      dialogVisible: false,
      imageDialogVisible: false,
      selectedImage: null
    }
  },
  created() {
    this.showWaybills()
  },
  methods: {
    showModal() {
      this.$refs['formDialog'].show()
    },
    handleView(index, row) {
      console.log(index, row)
    },
    showWaybills() {
      getAllWaybill().then(response => {
        this.items = response.data.data
      })
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
</style>
