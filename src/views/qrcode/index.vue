<template>
  <div id="qrcodeMain" class="main">
    <el-row>
      <div id="qrcode" ref="qrcode"> 前端生成的二维码</div>
    </el-row>
    <el-row>
      <el-col v-for="(item, index) in items" :span="6" :key="item.goods.id" :offset="2" >
        <el-card :body-style="{ padding: '30px' }" style="backgroundColor: 'green'">
          <img :src="item.qrcodeUrl" :id="'qrcode'+index" class="image" >
          <div style="padding: 14px;">
            <span>{{ item.goods.name }}</span>
            <div class="bottom clearfix">
              <el-button type="primary" class="button" @click="printContent(index)">打印二维码</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog :visible.sync="imageDialogVisible" center>
      <img :src="selectedImage" width="100%" height="100%">
    </el-dialog>
  </div>
</template>

<script>
import { getAllQrcode } from '@/api/qrcode'
import QRCode from 'qrcodejs2'

export default {
  name: 'Qrcode',
  components: {
    QRCode
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
    this.createQrcode()
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
    },
    printContent(index) {
      // let subOutputRankPrint = document.getElementById(`qrcode${index}`)
      const subOutputRankPrint = document.getElementById('qrcodeMain')
      console.log(subOutputRankPrint.innerHTML)
      const newContent = subOutputRankPrint.innerHTML
      const oldContent = document.body.innerHTML
      document.body.innerHTML = newContent
      window.print()
      window.location.reload()
      document.body.innerHTML = oldContent
      return false
    },
    createQrcode() {
      this.$nextTick(() => {
        const qrcode = new QRCode('qrcode', {
          width: 100,
          height: 100, // 高度
          text: '56663159' // 二维码内容
          // render: 'canvas' // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
          // background: '#f0f'
          // foreground: '#ff0'
        })
        console.log(qrcode)
        return qrcode
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
