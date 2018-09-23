<template>
  <div class="main">
    <PlantDialog ref="formDialog" @add-success="updatePlantList" />
    <el-row>
      <el-button type="success" icon="el-icon-plus" size="small" @click="showModal">添加种植计划</el-button>
    </el-row>
    <el-row class="table">
      <el-table :data="items" size="small" border stripe highlight-current-row>
        <el-table-column prop="plant.id" label="ID" width="100" />
        <el-table-column prop="plant.startDate" label="开始时间" />
        <el-table-column prop="farmer.name" label="农户姓名" />
        <el-table-column prop="goods.name" label="农作物名称" />
        <el-table-column prop="plant.address" label="地点" />
        <el-table-column prop="plant.createTime" label="记录时间" />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="success" icon="el-icon-tickets" @click="onDeleteBtnClick(scope.row.order.id)">详情</el-button>
            <el-button size="mini" type="warning" @click="onDeleteBtnClick(scope.row.order.id)">删除</el-button>
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
import { getAllPlant, deletePlant } from '@/api/plant'
import PlantDialog from './PlantDialog'

export default {
  name: 'Plant',
  components: {
    PlantDialog
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
    this.updatePlantList()
  },
  methods: {
    handleView(index, row) {
      console.log(index, row)
    },
    showModal() {
      this.$refs['formDialog'].show()
    },
    updatePlantList() {
      getAllPlant().then(response => {
        this.items = response.data.data
      })
    },
    onImageClick(path) {
      this.selectedImage = path
      this.imageDialogVisible = true
    },
    onDeleteBtnClick(id) {
      this.$confirm('是否确认要删除该订单?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deletePlant(id)
          .then(response => {
            this.$message({ type: 'success', message: '删除成功!' })
            this.updatePlantList()
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
</style>
