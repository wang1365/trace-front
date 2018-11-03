<template>
  <div class="main">
    <PlantDialog ref="formDialog" :plant-list="items" @add-success="updatePlantList" />
    <el-row>
      <el-button type="success" icon="el-icon-plus" size="small" class="right-btn blue-btn" @click="showModal">添加种植计划</el-button>
    </el-row>
    <el-row class="table">
      <el-table :data="items" size="small" border stripe highlight-current-row>
        <el-table-column prop="id" label="ID" sortable width="100" />
        <el-table-column prop="farmerName" sortable label="农户姓名" width="100" />
        <el-table-column prop="goodsName" sortable label="农作物名称" width="120" />
        <el-table-column prop="year" sortable label="年度" width="80" />
        <el-table-column sortable label="开始时间" width="100" >
          <template slot-scope="scope">{{ scope.row.startDate | formatDate }}</template>
        </el-table-column>
        <el-table-column prop="address" label="地点" />
        <el-table-column sortable label="记录时间" >
          <template slot-scope="scope">{{ scope.row.createTime | formatDatetime }}</template>
        </el-table-column>
        <el-table-column label="操作" width="250">
          <template slot-scope="scope">
            <el-button size="mini" type="success" icon="el-icon-tickets" @click="onCheckDetail(scope.row.id)">详情</el-button>
            <el-button size="mini" type="primary" @click="showModal('modify', scope.row)">修改</el-button>
            <el-button size="mini" type="warning" @click="onDeleteBtnClick(scope.row.id)">删除</el-button>
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
      farmerId: this.$route.params.plantId,
      items: [],
      imageDialogVisible: false,
      selectedImage: null
    }
  },
  created() {
    this.updatePlantList()
  },
  methods: {
    handleView(index, row) {
    },
    showModal(action, item) {
      this.$refs['formDialog'].show(action, item)
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
    onCheckDetail(plantId) {
      this.$router.push({ name: 'PlantDetail', params: { plantId: plantId }})
    },
    onDeleteBtnClick(id) {
      this.$confirm('是否确认要删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deletePlant(id)
          .then(() => {
            this.$message({ type: 'success', message: '删除成功!' })
            this.updatePlantList()
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
