<template>
  <div class="main">
    <el-row class="table">
      <el-table :data="items" size="small" bwaybill stripe highlight-current-row>
        <el-table-column prop="id" label="ID" width="100" />
        <el-table-column prop="driverName" label="司机姓名" />
        <el-table-column prop="driverPhone" label="司机手机" />
        <el-table-column prop="plateNumber" label="车牌号" />
        <el-table-column prop="startTime" label="起始时间" />
        <el-table-column prop="startLocation" label="起始地点" />
        <el-table-column prop="endTime" label="到达时间" />
        <el-table-column prop="endLocation" label="到达地点" />
        <el-table-column prop="orderId" label="订单号" />
      </el-table>
    </el-row>
    <el-dialog :visible.sync="imageDialogVisible" center>
      <img :src="selectedImage" width="100%" height="100%">
    </el-dialog>
  </div>
</template>

<script>
import { getAllWaybill } from '@/api/waybill'

export default {
  name: 'Waybill',
  components: {
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
