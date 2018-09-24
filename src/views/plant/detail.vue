<template>
  <div class="main">
    <PlantItemDialog ref="formDialog" @add-success="_getPlantItemByPlant" />
    <el-row>
      <el-select v-model="selectedPersonId" placeholder="请选择农户" @change="_getPlantByPerson(selectedPersonId)">
        <el-option v-for="item in personList" :key="item.id" :label="item.name" :value="item.id" />
      </el-select>
      <el-select v-model="selectedPlantId" placeholder="请选择种植计划">
        <el-option v-for="item in plantList" :key="item.plant.id" :label="getPlantLabel(item)" :value="item.id" @change="_getPlantItemByPlant"/>
      </el-select>
      <el-button type="success" icon="el-icon-plus" size="small" @click="showModal">添加种植条目</el-button>
    </el-row>
    <el-row class="table">
      <el-table :data="items" size="small" border stripe highlight-current-row>
        <el-table-column prop="plantItem.id" label="ID" width="100" />
        <el-table-column prop="plant.startDate" label="开始时间" />
        <el-table-column prop="farmer.name" label="农户姓名" />
        <el-table-column prop="goods.name" label="农作物名称" />
        <el-table-column prop="plant.address" label="地点" />
        <el-table-column prop="plant.createTime" label="记录时间" />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="success" icon="el-icon-tickets" @click="onCheckDetail(scope.row.plant.id)">详情</el-button>
            <el-button size="mini" type="warning" @click="onDeleteBtnClick(scope.row.plant.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
  </div>
</template>

<script>
import { getAllPlant, getPlantItemByPlant, deletePlantItem } from '@/api/plant'
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
      selectedPersonId: null,
      selectedPlantId: null,
      items: [],
      dialogVisible: false
    }
  },
  created() {
    this._getPersonList()
  },
  methods: {
    handleView(index, row) {
    },
    showModal() {
      this.$refs['formDialog'].show()
    },
    getPlantLabel(plant) {
      return plant.goods.name + ' / ' + plant.plant.startDate + ' / ' + plant.plant.address
    },
    onCheckDetail(plantId) {

    },
    _getPersonList() {
      getAllPerson().then(res => {
        this.personList = res.data.data
      })
    },
    _getPlantByPerson(personId) {
      console.log('#### getPlantListByPerson')
      this.plantList = []
      getAllPlant({ farmerId: personId }).then(res => {
        this.plantList = res.data.data
      })
    },
    _getPlantItemByPlant() {
      console.log('##### _getPlantItemByPlant')
      getPlantItemByPlant(this.selectedPlantId).then(response => {
        this.items = response.data.data
      })
    },
    onDeleteBtnClick(id) {
      this.$confirm('是否确认要删除该订单?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deletePlantItem(id)
          .then(response => {
            this.$message({ type: 'success', message: '删除成功!' })
            this.updatePlantItemList()
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
