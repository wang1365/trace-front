<template>
  <div id="qrcodeMain" class="main">
    <div class="block">
      <span class="demonstration">订单时间：{{ dateRange }}</span>
      <el-button type="primary" size="small" class="button" @click="saveAll">全部保存</el-button>
      <!--<el-date-picker-->
      <!--v-model="dateRange"-->
      <!--:picker-options="pickerOptions"-->
      <!--type="daterange"-->
      <!--align="left"-->
      <!--unlink-panels-->
      <!--range-separator="至"-->
      <!--start-placeholder="开始日期"-->
      <!--end-placeholder="结束日期"/>-->
      <el-date-picker v-model="orderDate" :editable="false" :picker-options="pickerOptions1" value-format="yyyy-MM-dd" type="date" placeholder="选择日期" @change="onDateChange"/>
    </div>
    <el-form v-if="!verified" :inline="true" :model="formPwd" class="demo-form-inline">
      <el-form-item label="溯源码查看授权">
        <el-input v-model="formPwd.password" type="password" placeholder="输入授权码"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" @click="onVerify">确 定</el-button>
      </el-form-item>
    </el-form>
    <hr>
    <p v-if="items === null || items.length === 0">{{ orderDate+' 没有订单...' }}</p>
    <el-row v-if="verified">
      <el-col v-for="(item, index) in items" :lg="6" :xs="24" :key="item.id" >
        <el-card ref="`card${index}`" :id="'card'+index" class="card">
          <div><span style="color: #1478F0">{{ index+1 }}.手机扫一扫</span><span> 溯源二维码：</span></div>
          <div :id="`qrcode`+index" :ref="`qrcode`+index" class="qrcode"/>
          <div>
            <span style="color: #30B08F">订单{{ item.summary }}</span>
            <div class="bottom ">
              <el-button type="primary" size="small" class="button" @click="save(index)">保 存</el-button>
              <el-button type="plain" size="small" class="button" @click="printContent(index)">打 印</el-button>
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
import { getAllOrder, getOrderListByDate } from '@/api/order'

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
      qrList: [],
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
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        },
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date())
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', date)
          }
        }]
      },
      formPwd: {
        password: null
      },
      orderDate: this.$options.filters.formatDate(new Date()),
      verified: true
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
    if (this.verified) {
      this.updateQrcodeList()
    }
  },
  methods: {
    handleView(index, row) {
      console.log(index, row)
    },
    showModal() {
      this.$refs['formDialog'].show()
    },
    updateQrcodeList() {
      const rest = this.orderDate ? getOrderListByDate : getAllOrder
      rest(this.orderDate).then(response => {
        this.items = response.data.data
        this.$nextTick(() => {
          this.createQrcode()
        })
      })
    },
    onDateChange() {
      this.updateQrcodeList()
    },
    onImageClick(path) {
      this.selectedImage = path
      this.imageDialogVisible = true
    },
    printContent(index) {
      // let subOutputRankPrint = document.getElementById(`qrcode${index}`)
      // const subOutputRankPrint = document.getElementById(`qrcode${index}`)
      // console.log(subOutputRankPrint.innerHTML)
      // const newContent = subOutputRankPrint.innerHTML
      // const oldContent = document.body.innerHTML
      // document.body.innerHTML = newContent
      // window.print()
      // window.location.reload()
      // document.body.innerHTML = oldContent

      const oldContent = document.body.innerHTML
      document.body.innerHTML = this.qrList[index].outerHTML
      window.print()
      window.location.reload()
      document.body.innerHTML = oldContent
      return false
    },
    saveAll() {
      this.qrList.forEach((qr, index) => {
        this.save(index)
      })
    },
    save(index) {
      // 找到canvas标签
      const myCanvas = document.getElementById(`qrcode${index}`).getElementsByTagName('canvas')
      // 创建一个a标签节点
      const a = document.createElement('a')
      // 设置a标签的href属性（将canvas变成png图片）
      a.href = myCanvas[0].toDataURL('image/png').replace('image/png', 'image/octet-stream')
      // 设置下载文件的名字
      const data = this.items[index]
      const date = this.$options.filters.formatDate(data.createTime)
      a.download = `${date}_${data.goodsName}_${data.buyerName}采购自${data.sellerName}${data.quantity}${data.unit}.png`
      // 点击
      a.click()
      // 弹出提示
      this.$message({ message: '亲，正在进行下载保存', type: 'warning' })
    },
    createQrcode() {
      this.qrList.forEach((qrcode) => {
        qrcode.clear()
      })
      this.items.forEach((order, index, arr) => {
        const baseUrl = 'http://www.tiaocaishi.com:9527/h5/#/goods/'
        console.log('qr code withd:', this.qrWidth)
        const fakeId = order.traceSecret + '' + this.prefixInteger(order.id, 10)
        const qr = new QRCode(`qrcode${index}`, {
          width: this.qrWidth,
          height: this.qrWidth,
          text: baseUrl + fakeId, // 二维码内容
          // render: 'canvas' // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
          background: '#f0f',
          foreground: '#ff0'
        })
        this.qrList.push(qr)
      })
    },
    prefixInteger(num, length) {
      return (Array(length).join('0') + num).slice(-length)
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
    /*float: right;*/
    margin-left: 10px;
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
    margin: 15px 0 15px auto;
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
