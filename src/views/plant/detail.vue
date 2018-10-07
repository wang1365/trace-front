<template>
  <div class="main">
    <PlantItemDialog
      ref="formDialog"
      @add-success="_getPlantItemByPlant(selectedPlantId)" />
    <el-row>
      <el-select v-model="selectedPersonId" placeholder="请选择农户" width="100px" size="mini" @change="_getPlantByPerson(selectedPersonId)">
        <el-option v-for="item in personList" :key="item.id" :label="item.name" :value="item.id" />
      </el-select>
      <el-select v-model="selectedPlantId" placeholder="请选择种植计划" width="200px" size="mini" @change="_getPlantItemByPlant(selectedPlantId)">
        <el-option v-for="item in plantList" :key="item.id" :label="getPlantLabel(item)" :value="item.id" />
      </el-select>
      <el-button :disabled="!selectedPlantId || selectedPlantId<=0" type="success" icon="el-icon-plus" size="small" @click="showModal">添加种植条目</el-button>
      <span style="color: rgba(0,0,0,0.2)"> 说明: 添加条目前请先选择农户和种植计划</span>

    </el-row>
    <el-row class="table">
      <el-table :data="plantItemList" size="small" border stripe highlight-current-row>
        <el-table-column prop="id" label="ID" sortable width="80" />
        <el-table-column prop="plantId" label="种植计划ID" width="85"/>
        <el-table-column prop="actionName" sortable label="实施类型" width="100"/>
        <el-table-column :formatter="dateFormat" sortable label="开始时间" >
          <template slot-scope="scope">{{ scope.row.actionDate | formatDate }}</template>
        </el-table-column>
        <el-table-column prop="farmerName" sortable label="农户姓名" />
        <!--<el-table-column prop="goodsName" label="农作物名称" />-->
        <el-table-column :formatter="dateTimeFormat" sortable label="记录时间" >
          <template slot-scope="scope">{{ scope.row.createTime | formatDatetime }}</template>
        </el-table-column>
        <el-table-column prop="actionContent" label="内容" />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="warning" @click="onDeleteBtnClick(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
  </div>
</template>

<script>
import { getPlantListByPerson, getPlantItemByPlant, getPlantActionTypeList, deletePlantItem } from '@/api/plant'
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
      selectedPlantId: null,
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
  },
  methods: {
    handleView(index, row) {
    },
    showModal() {
      this.$refs['formDialog'].show(this.selectedPlantId, this.selectedPersonId, this.personList, this.plantActionTypeList)
    },
    getPlantLabel(plant) {
      return plant.goodsName + ' / ' + this.$options.filters.formatDate(plant.startDate) + ' / ' + plant.address
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
      this.plantItemList = []
      this.selectedPlantId = null
      getPlantListByPerson(personId).then(res => {
        this.plantList = res.data.data
      })
    },
    _getPlantItemByPlant() {
      getPlantItemByPlant(this.selectedPlantId).then(response => {
        this.plantItemList = response.data.data
      })
    },
    _getPlantActionTypeList() {
      getPlantActionTypeList().then(res => {
        this.plantActionTypeList = res.data.data
      })
    },
    onDeleteBtnClick(id) {
      this.$confirm('是否确认要删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deletePlantItem(id)
          .then(response => {
            this.$message({ type: 'success', message: '删除成功!' })
            this._getPlantItemByPlant()
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
