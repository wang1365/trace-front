<template>
  <div class="main">
    <GoodsDialog ref="formDialog" @upload-success="updateGoodsList" />
    <el-row>
      <el-button type="success" icon="el-icon-plus" size="small" @click="showModal">添加商品</el-button>
    </el-row>
    <el-row class="table">
      <el-table :data="items" size="small" border stripe highlight-current-row>
        <el-table-column prop="id" label="ID" width="100" />
        <el-table-column prop="name" label="名称" width="100" />
        <el-table-column label="图片">
          <template slot-scope="scope">
            <img :src="scope.row.imageUrl" width="300" height="150" @click="onImageClick(scope.row.path)">
          </template>
        </el-table-column>
        <el-table-column width="150" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="onImageClick(scope.row.path)">查看</el-button>
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
import GoodsDialog from './CompanyDialog'

export default {
  name: 'Company',
  components: {
    GoodsDialog
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
    this.updateGoodsList()
  },
  methods: {
    handleView(index, row) {
      console.log(index, row)
    },
    showModal() {
      this.$refs['formDialog'].show()
    },
    updateGoodsList() {
      getAllGoods().then(response => {
        this.items = response.data
      })
    },
    onImageClick(path) {
      this.selectedImage = path
      this.imageDialogVisible = true
    },
    onDeleteBtnClick(id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
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
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
</style>
