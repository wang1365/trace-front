<template>
  <div class="main">
    <el-row>
      <el-col v-for="item in items" :span="6" :key="item.goods.id" :offset="2" >
        <el-card :body-style="{ padding: '30px' }">
          <img :src="item.qrcodeUrl" class="image" >
          <div style="padding: 14px;">
            <span>{{ item.goods.name }}</span>
            <div class="bottom clearfix">
              <el-button type="primary" class="button">打印二维码</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
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
  }
  .el-col {
    border-radius: 4px;
  }
  .time {
    font-size: 13px;
    color: #999;
  }
  .bottom {
    margin-top: 13px;
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
