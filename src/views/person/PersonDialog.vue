<template>
  <el-dialog :visible.sync="visible" :title="action==='add'?'新增人员':'人员修改'">
    <transition name="el-zoom-in-top">
      <div v-show="visible">
        <el-form ref="ruleForm" :model="ruleForm" :rules="formRules" label-width="80px">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="ruleForm.name" placeholder="填写姓名"/>
          </el-form-item>
          <el-form-item label="性别" prop="idCard">
            <el-radio v-model="ruleForm.gender" label="男">男</el-radio>
            <el-radio v-model="ruleForm.gender" label="女">女</el-radio>
          </el-form-item>
          <el-form-item label="身份证" prop="idCard">
            <el-input v-model="ruleForm.idCard" placeholder="填写身份证"/>
          </el-form-item>
          <el-form-item label="出生日期" prop="birthday">
            <el-date-picker v-model="ruleForm.birthday" value-format="yyyy-MM-dd" type="date" placeholder="选择日期"/>
          </el-form-item>
          <el-form-item label="家庭地址" prop="familyAddress">
            <el-input v-model="ruleForm.familyAddress" placeholder="填写家庭地址"/>
          </el-form-item>
          <el-form-item label="联系方式" prop="mobileNo">
            <el-input v-model="ruleForm.mobileNo" placeholder="填写联系方式"/>
          </el-form-item>
          <el-form-item label="单位" prop="company">
            <el-input v-model="ruleForm.company" placeholder="填写单位名称"/>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="success" size="small" @click="onSubmit('ruleForm')">保存</el-button>
          <el-button size="small" @click="visible = false">取消</el-button>
        </div>
    </div></transition>
  </el-dialog>
</template>

<script>
import { addPerson, updatePerson } from '@/api/person'

export default {
  name: 'ReportForm',
  props: {
    personType: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      visible: false,
      action: 'add',
      goodsList: [],
      reportList: [],
      units: ['kg', '个'],
      ruleForm: {
        id: null,
        name: null,
        type: this.personType,
        idCard: null,
        gender: '男',
        birthday: null,
        familyAddress: null,
        mobileNo: null,
        company: null
      },
      formRules: {
        name: [
          { required: true, message: '请输入人员名称', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
    show(action, person) {
      if (action === 'modify') {
        this.action = action
        const copy = Object.assign({}, person)
        this.ruleForm = copy
        if (copy && copy.birthday) {
          copy.birthday = new Date(person.birthday)
        }
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

        console.log('action:', this.action)
        const restApi = this.action === 'modify' ? updatePerson : addPerson
        restApi(this.ruleForm).then((res) => {
          if (res.data.success) {
            this.$message({ message: `添加人员成功`, type: 'success' })
            this.$emit('add-success')
            this.$refs['ruleForm'].resetFields()
            this.hide()
          } else {
            this.$message({ message: res.data.message, type: 'error' })
          }
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
