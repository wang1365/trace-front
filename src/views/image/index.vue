<template>
  <div class="main">
    <ImageDialog ref="formDialog" @add-success="updateImageList" />
    <el-row>
      <el-button type="success" icon="el-icon-plus" size="small" @click="showModal">上传图片</el-button>
    </el-row>
    <el-row class="table">
      <el-table :data="items" size="small" border stripe highlight-current-row>
        <el-table-column prop="id" label="ID" width="100" />
        <el-table-column prop="catName" label="类别" />
        <el-table-column prop="name" label="名称" />
        <el-table-column prop="localPath" label="本地地址" />
        <el-table-column prop="urlPath" label="链接地址" >
          <template slot-scope="scope"><a :href="scope.row.urlPath">{{ scope.row.urlPath }}</a></template>
        </el-table-column>
        <el-table-column label="图片">
          <template slot-scope="scope">
            <img :src="scope.row.urlPath" width="300" @click="onImageClick(scope.row.path)">
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
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
import { getImageList, deleteImage } from '@/api/image'
import ImageDialog from './ImageDialog'

export default {
  name: 'Image',
  components: {
    ImageDialog
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
    this.updateImageList()
  },
  methods: {
    handleView(index, row) {
      console.log(index, row)
    },
    showModal() {
      this.$refs['formDialog'].show()
    },
    updateImageList() {
      getImageList().then(response => {
        this.items = response.data.data
      })
    },
    onImageClick(path) {
      this.selectedImage = path
      this.imageDialogVisible = true
    },
    onDeleteBtnClick(id) {
      this.$confirm('是否确认要删除该图片?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteImage(id)
          .then(response => {
            this.$message({ type: 'success', message: '删除成功!' })
            this.updateImageList()
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
