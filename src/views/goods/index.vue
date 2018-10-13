<template>
  <div class="main">
    <GoodsDialog ref="formDialog" @add-success="updateGoodsList" />
    <el-row>
      <el-button type="success" icon="el-icon-plus" size="small" class="right-btn blue-btn" @click="showModal">添加商品</el-button>
      <el-switch
        v-model="cardMode"
        style="margin-left: 20px"
        active-text="卡片显示"
        inactive-text="表格显示"/>
    </el-row>
    <el-row v-if="cardMode">
      <el-col v-for="item in items" :key="item.id" :span="6" :offset="2" >
        <el-card class="card">
          <div style="margin-bottom: 5px">{{ item.name }}</div>
          <img :src="item.imageUrl" class="image" >
          <div style="bottom:10px;">
            <div class="bottom clearfix">
              <el-button type="warning" size="mini" class="button" @click="onDeleteBtnClick(item.id)">删除</el-button>
              <el-button type="primary" size="mini" class="button" @click="showModal('modify', item)">修改</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row v-if="!cardMode" class="table">
      <el-table :data="items" border stripe highlight-current-row>
        <el-table-column prop="id" label="ID" width="100px"/>
        <el-table-column prop="name" label="名称" width="80px"/>
        <el-table-column label="图片">
          <template slot-scope="scope">
            <img :src="scope.row.imageUrl" width="250px" @click="onImageClick(scope.row.path)">
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200px">
          <template slot-scope="scope">
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
import { getAllGoods, deleteGoods } from '@/api/goods'
import GoodsDialog from './GoodsDialog'

export default {
  name: 'Goods',
  components: {
    GoodsDialog
  },
  data() {
    return {
      items: [],
      dialogVisible: false,
      imageDialogVisible: false,
      selectedImage: null,
      cardMode: true
    }
  },
  created() {
    this.updateGoodsList()
  },
  methods: {
    handleView(index, row) {
      console.log(index, row)
    },
    showModal(action, goods) {
      this.$refs['formDialog'].show(action, goods)
    },
    updateGoodsList() {
      getAllGoods().then(response => {
        this.items = response.data.data
      })
    },
    onImageClick(path) {
      this.selectedImage = path
      this.imageDialogVisible = true
    },
    onDeleteBtnClick(id) {
      this.$confirm('是否确认要删除该商品?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteGoods(id)
          .then(response => {
            this.$message({ type: 'success', message: '删除成功!' })
            this.updateGoodsList()
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
    margin: 5px;
    float: right;
  }
  .image {
    width: 100%;
    display: block;
  }

  /*.image:hover {*/
    /*width: 100%;*/
  /*}*/

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
</style>
