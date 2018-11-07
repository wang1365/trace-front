<template>
  <div id="qrcodeMain" class="main">
    <div v-if="false" class="block">
      <span class="demonstration">查询订单时间范围：{{ dateRange }}</span>
      <el-date-picker
        v-model="dateRange"
        :picker-options="pickerOptions"
        type="daterange"
        align="left"
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"/>
    </div>
    <el-form v-if="!verified" :inline="true" :model="formPwd" class="demo-form-inline">
      <el-form-item label="溯源码查看授权">
        <el-input v-model="formPwd.password" placeholder="输入授权码"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" @click="onVerify">确 定</el-button>
      </el-form-item>
    </el-form>
    <hr>
    <el-row v-if="verified">
      <el-col v-for="(item, index) in items" :lg="6" :xs="24" :key="item.id" >
        <el-card ref="`card${index}`" :id="'card'+index" class="card">
          <div><span style="color: #1478F0">{{ index+1 }}.手机扫一扫</span><span> 溯源二维码：</span></div>
          <div :id="`qrcode`+index" :ref="`qrcode`+index" class="qrcode"/>
          <div>
            <span style="color: #30B08F">订单{{ item.summary }}</span>
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
import { getAllOrder } from '@/api/order'

'@/api/order'
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
      selectedImage: null,
      dateRange: null,
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      formPwd: {
        password: null
      },
      verified: false
    }
  },
  computed: {
    qrWidth() {
      return 200
      // return this.$refs['col'] ? this.$refs['col'].$el.clientWidth : -1
    }
  },
  created() {

  },
  mounted() {

  },
  methods: {
    handleView(index, row) {
      console.log(index, row)
    },
    showModal() {
      this.$refs['formDialog'].show()
    },
    updateQrcodeList() {
      getAllOrder().then(response => {
        this.items = response.data.data
        this.$nextTick(() => {
          this.createQrcode()
        })
      })
    },
    onImageClick(path) {
      this.selectedImage = path
      this.imageDialogVisible = true
    },
    printContent(index) {
      // let subOutputRankPrint = document.getElementById(`qrcode${index}`)
      const subOutputRankPrint = document.getElementById(`qrcode${index}`)
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
      this.items.forEach((order, index, arr) => {
        const baseUrl = 'http://www.tiaocaishi.com:9527/h5/#/goods/'
        console.log('qr code withd:', this.qrWidth)
        new QRCode(`qrcode${index}`, {
          width: this.qrWidth,
          height: this.qrWidth,
          text: baseUrl + order.id, // 二维码内容
          // render: 'canvas' // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
          background: '#f0f',
          foreground: '#ff0'
        })
      })
    },
    onVerify() {
      if (this.formPwd.password === 'guolongcang123456') {
        this.verified = true
        this.updateQrcodeList()
      } else {
        this.$message({ type: 'error', message: '授权码错误' })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .main {
    padding: 20px
  }
  /*.el-row {*/
    /*margin-bottom: 20px;*/
  /*}*/
  /*.el-col {*/
    /*border-radius: 4px;*/
  /*}*/
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
  }.time {
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
  .card {
    width: 80%;
    margin: 10px;
    padding: 10px;
    &:hover {
      padding: 10px 5px;
      background-color: #ddeed9;
    }
  }

  .qrcode {
    width: 100%;
    margin: 5px auto 5px auto;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
  hr {
    width:100%;
    margin:10px auto;
    border: 0;
    height: 0;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  }

</style>
