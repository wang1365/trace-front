<template>
  <div class="main">
    <el-row>
      <el-button type="success" icon="el-icon-plus" size="small" @click="showModal">添加公司</el-button>
    </el-row>
    <el-row class="table">
      <el-table :data="items" size="small" border stripe highlight-current-row>
        <el-table-column prop="goods.id" label="商品ID" />
        <el-table-column prop="goods.name" label="商品名称" />
        <el-table-column prop="qrcodeUrl" label="二维码" >
          <template slot-scope="scope">
            <p>{{ scope.row.qrcodeUrl }}</p>
            <img :src="scope.row.qrcodeUrl">
          </template>
        </el-table-column>
        <el-table-column width="150" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="onImageClick(scope.row.path)">查看</el-button>
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
import { getAllQrcode } from '@/api/qrcode'

export default {
  name: 'Qrcode',
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
    this.updateQrcodeList()
  },
  methods: {
    handleView(index, row) {
      console.log(index, row)
    },
    showModal() {
      this.$refs['formDialog'].show()
    },
    updateQrcodeList() {
      getAllQrcode().then(response => {
        this.items = response.data.data
      })
    },
    onImageClick(path) {
      this.selectedImage = path
      this.imageDialogVisible = true
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
