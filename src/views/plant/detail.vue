<template>
  <div class="main">
    <PlantItemDialog
      ref="formDialog"
      @add-success="_getPlantItemList(selectedPlant)" />
    <el-row>
      <el-select v-model="selectedPersonId" filterable placeholder="请选择农户" width="100px" size="mini" @change="_getPlantByPerson(selectedPersonId)">
        <el-option v-for="item in personList" :key="item.id" :label="item.name + ' ' + (item.mobileNo||'')" :value="item.id" />
      </el-select>
      <el-select v-model="selectedPlant" filterable placeholder="请选择种植流程" width="200px" size="mini">
        <el-option v-for="item in plantList" :key="item.id" :label="getPlantLabel(item)" :value="item" />
      </el-select>
      <el-button :disabled="!selectedPlant" type="success" icon="el-icon-plus" size="small" @click="showModal">添加种植条目</el-button>
      <span style="color: rgba(0,0,0,0.2)"> 说明: 添加条目前请先选择农户和种植流程</span>

    </el-row>
    <el-row class="table">
      <el-table :data="plantItemList" size="small" border stripe highlight-current-row>
        <el-table-column align="center" type="index" label="#" width="50" />
        <el-table-column align="center" prop="farmerName" sortable label="农户姓名" />
        <el-table-column align="center" prop="goodsName" label="农作物名称" />
        <el-table-column align="center" prop="actionName" sortable label="种植操作" width="100"/>
        <el-table-column align="center" prop="actionContent" label="内容" />
        <el-table-column :formatter="dateFormat" align="center" sortable label="操作时间" >
          <template slot-scope="scope">{{ scope.row.actionDate | formatDate }}</template>
        </el-table-column>
        <el-table-column align="center" prop="createTime" sortable label="记录时间"/>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="warning" @click="onDeleteBtnClick(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
  </div>
</template>

<script>
import * as api from '@/api/plant'
import { getAllPerson } from '@/api/person'
import PlantItemDialog from './PlantItemDialog'

export default {
  name: 'PlantItem',
  components: {
    PlantItemDialog
  },
  data() {
    return {
      personList: [],
      plantList: [],
      plantItemList: [],
      plantActionTypeList: [],
      selectedPersonId: null,
      selectedPlant: null,
      dialogVisible: false
    }
  },
  computed: {
  },
  created() {
  },
  mounted() {
    this._getPersonList()
    this._getPlantActionTypeList()
    this._getPlantItemList()
  },
  methods: {
    handleView(index, row) {
    },
    showModal() {
      this.$refs['formDialog'].show(this.selectedPlant, this.selectedPersonId, this.personList, this.plantActionTypeList)
    },
    getPlantLabel(plant) {
      return plant.goodsName + ' / ' + this.$options.filters.formatDate(plant.startDate) + (plant.address ? ' / ' + plant.address : '')
    },
    onCheckDetail(plantId) {

    },
    dateFormat(row, column) {
      const date = row[column.property]
      if (date === undefined) {
        return ''
      }
      return new Date(date).toLocaleDateString()
    },
    dateTimeFormat(row, column) {
      const date = row[column.property]
      if (date === undefined) {
        return ''
      }
      return new Date(date).toLocaleString()
    },
    _getPersonList() {
      getAllPerson().then(res => {
        this.personList = res.data.data
      })
    },
    _getPlantByPerson(personId) {
      this.plantList = []
      this.selectedPlant = null
      api.getPlantListByPerson(personId).then(res => {
        this.plantList = res.data.data
      })
    },
    _getPlantItemList() {
      api.getPlantItemList().then(response => {
        this.plantItemList = response.data.data
      })
    },
    _getPlantActionTypeList() {
      api.getPlantActionTypeList().then(res => {
        this.plantActionTypeList = res.data.data
      })
    },
    onDeleteBtnClick(id) {
      this.$confirm('是否确认要删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        api.deletePlantItem(id)
          .then(response => {
            this.$message({ type: 'success', message: '删除成功!' })
            this._getPlantItemList()
          })
      }).catch(() => {
        this.$message({ type: 'info', message: '已取消删除' })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
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
