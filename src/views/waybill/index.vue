<template>
  <div class="main">
    <WaybillDialog ref="formDialog" @add-success="showWaybills"/>
    <el-row>
      <el-button type="success" icon="el-icon-plus" size="small" class="right-btn blue-btn" @click="showModal">新建运单</el-button>
    </el-row>
    <el-row class="table">
      <el-table :data="items" size="small" border stripe highlight-current-row>
        <el-table-column prop="id" label="ID" sortable width="100"/>
        <el-table-column prop="driverName" sortable label="司机姓名" />
        <el-table-column prop="driverPhone" label="司机手机" />
        <el-table-column prop="plateNumber" label="车牌号" />
        <el-table-column prop="startTime" sortable label="起始时间" />
        <el-table-column prop="startLocation" sortable label="起始地点" />
        <el-table-column prop="endTime" sortable label="到达时间" />
        <el-table-column prop="endLocation" sortable label="到达地点" />
        <el-table-column prop="orderId" sortable label="订单号" />
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="showModal('modify', scope.row)">修改</el-button>
            <el-button size="mini" type="warning" @click="onWaybillDelete(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-dialog :visible.sync="imageDialogVisible" center>
      <img :src="selectedImage" width="100%" height="100%">
    </el-dialog>
  </div>
</template>

<script>
import { getAllWaybill, deleteWaybill } from '@/api/waybill'
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
    showModal(action, waybill) {
      this.$refs['formDialog'].show(action, waybill)
    },
    handleView(index, row) {
      console.log(index, row)
    },
    showWaybills() {
      getAllWaybill().then(response => {
        this.items = response.data.data
      })
    },
    onWaybillDelete(id) {
      this.$confirm('是否确认要删除该运单?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteWaybill(id)
          .then(response => {
            this.$message({ type: 'success', message: '删除成功!' })
            this.showWaybills()
          })
          .catch(err => {
            this.$message({ type: 'error', message: '删除失败：' + err })
          })
      }).catch(() => {
        this.$message({ type: 'info', message: '已取消删除' })
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
