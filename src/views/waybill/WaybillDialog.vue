<template>
  <el-dialog :visible.sync="visible" title="配送订单" center>
    <el-form ref="ruleForm" :model="ruleForm" label-width="100px">
      <el-form-item :rules="[ {required: true, message:'请输入订单号', trigger:'blur'}]" label="订单号" prop="orderId">
        <el-input v-model.number="ruleForm.orderId" placeholder="填写订单号"/>
      </el-form-item>
      <el-form-item :rules="[ {required: true, message:'请填写司机姓名', trigger:'blur'}]" label="司机姓名" prop="driverName">
        <el-input v-model="ruleForm.driverName" placeholder="填写司机姓名"/>
      </el-form-item>
      <el-form-item :rules="[ {required: true, message:'请填写司机手机号', trigger:'blur'}]" label="司机手机" prop="driverPhone">
        <el-input v-model="ruleForm.driverPhone" placeholder="填写司机手机号"/>
      </el-form-item>
      <el-form-item :rules="[ {required: true, message:'请填写车牌号', trigger:'blur'}]" label="车牌号" prop="plateNumber">
        <el-input v-model="ruleForm.plateNumber" placeholder="填写车牌号"/>
      </el-form-item>
      <el-form-item label="起始时间" prop="startTime">
        <el-date-picker v-model="ruleForm.startTime" type="datetime" placeholder="选择起始时间"/>
      </el-form-item>
      <el-form-item label="起始地点" prop="startLocation">
        <el-input v-model="ruleForm.startLocation" placeholder="填写起始地点"/>
      </el-form-item>
      <el-form-item label="终止时间" prop="endTime">
        <el-date-picker v-model="ruleForm.endTime" type="datetime" placeholder="选择日期终止时间"/>
      </el-form-item>
      <el-form-item label="终止地点" prop="endLocation">
        <el-input v-model="ruleForm.endLocation" placeholder="填写终止地点"/>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="success" size="small" @click="onSubmit('ruleForm')">保存</el-button>
      <el-button size="small" @click="visible = false">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { addWaybill, updateWaybill } from '@/api/waybill'

export default {
  props: {
  },
  data() {
    return {
      visible: false,
      ruleForm: {
        orderId: null,
        driverName: null,
        driverPhone: null,
        plateNumber: null,
        startTime: null,
        startLocation: null,
        endTime: null,
        endLocation: null
      }
    }
  },
  computed: {
  },
  created() {
  },
  mounted() {
  },
  methods: {
    show(action, waybill) {
      if (action === 'modify') {
        this.action = action
        this.ruleForm = Object.assign({}, waybill)
      } else {
        this.action = 'add'
      }
      this.visible = true
    },
    hide() {
      this.visible = false
    },
    onSubmit(form) {
      this.$refs[form].validate((valid) => {
        if (!valid) {
          return false
        }
        const restApi = this.action === 'modify' ? updateWaybill : addWaybill
        restApi(this.ruleForm).then((response) => {
          this.$message({ message: `添加运单成功`, type: 'success' })
          this.$refs['ruleForm'].resetFields()
          this.$emit('add-success')
          this.hide()
        }).catch(err => {
          this.$message({ message: `添加失败：${err}`, type: 'error' })
        })
      })
    }
  }
}
</script>

<style scoped>
</style>
