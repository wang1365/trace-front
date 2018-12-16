<template>
  <el-dialog :visible.sync="visible" :title="action==='add'?'新增人员':'人员修改'" center width="50%" @open="renderMap">
    <el-row :gutter="10">
      <el-col :span="12">
        <el-form ref="ruleForm" :model="ruleForm" :rules="formRules" size="small" label-width="80px">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="ruleForm.name" :disabled="action==='modify'" placeholder="填写姓名"/>
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
      </el-col>
      <el-col :span="12">
        <div id="map"/>
      </el-col>
    </el-row>
    <div slot="footer" class="dialog-footer">
      <el-button type="success" size="small" @click="onSubmit('ruleForm')">保存</el-button>
      <el-button size="small" @click="visible = false">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { addPerson, updatePerson } from '@/api/person'
import BMap from 'BMap'

export default {
  name: 'ReportForm',
  components: {
    BMap
  },
  props: {
    personType: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      map: null,
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
        ],
        familyAddress: [
          { required: true, message: '住址不能为空', trigger: 'blur' }
        ],
        birthday: [
          { required: true, message: '出生日期不能为空', trigger: 'blur' }
        ],
        idCard: [
          { required: true, message: '身份证号不能为空', trigger: 'blur' }
        ],
        mobileNo: [
          { required: true, message: '联系方式不能为空', trigger: 'blur' }
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
          copy.idCard = null
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
        })
      })
    },
    renderMap() {
      this.$nextTick(() => {
        this.initMap()
      })
    },
    initMap() {
      console.log('start init map')
      this.map = new BMap.Map('map')
      this.map.enableScrollWheelZoom()
      const point = new BMap.Point(118.712077, 36.894101)
      this.map.centerAndZoom(point, 14)
      console.log('end init map')
    }
  }
}
</script>

<style scoped>
  #map {
    height: 100%;
    width: 50%;
    position: absolute;
    border: 1px solid rgb(160, 160, 160);
  }
</style>
