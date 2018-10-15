<template>
  <div class="main">
    <QualificationDialog ref="formDialog" @upload-success="updateQualification" />
    <el-row>
      <el-button type="success" icon="el-icon-plus" size="small" class="right-btn blue-btn" @click="showModal">添加资质证书</el-button>
    </el-row>
    <el-row class="table">
      <el-table :data="items" size="small" border stripe highlight-current-row>
        <el-table-column prop="id" label="ID" sortable width="100" />
        <el-table-column prop="companyName" sortable label="公司" />
        <el-table-column label="证书图片">
          <template slot-scope="scope">
            <img :src="scope.row.path" width="300" height="150" @click="onImageClick(scope.row.path)">
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
import { getAllQualification, deleteQualification } from '@/api/qualification'
import QualificationDialog from './QualificationDialog'

export default {
  name: 'Qualification',
  components: {
    QualificationDialog
  },
  data() {
    return {
      items: [],
      dialogVisible: false,
      imageDialogVisible: false,
      selectedImage: null,

      qualificationList: []
    }
  },
  created() {
    this.updateQualification()
    getAllQualification().then(response => { this.qualificationList = response.data })
  },
  methods: {
    handleView(index, row) {
      console.log(index, row)
    },
    showModal() {
      this.$refs['formDialog'].show()
    },
    updateQualification() {
      getAllQualification().then(response => {
        this.items = response.data.data
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
        deleteQualification({ id: id })
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.updateQualification()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
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
