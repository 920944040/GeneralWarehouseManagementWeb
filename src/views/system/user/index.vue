<template>
  <div>
    <el-row :gutter="24">
      <el-col>
        <el-card style="margin: 10px 10px 10px 10px;">
          <span>名称：</span>
          <el-input style="width: 200px;" size="mini" placeholder="请输入内容" />
          <el-button style="margin-left: 10px;" size="mini" type="primary">查询</el-button>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col>
        <el-card style="margin: 0 10px 10px 10px;">
          <el-button type="primary" icon="el-icon-circle-plus-outline" size="mini" style="margin-bottom: 10px;"
            @click="handleAdd()">添加</el-button>
          <el-table :data="tableData" height="620" border size="mini" style="width: 100%">
            <el-table-column prop="id" label="编号" width="180"></el-table-column>
            <el-table-column prop="name" label="姓名" width="180"></el-table-column>
            <el-table-column prop="account" label="账号"></el-table-column>
            <el-table-column prop="typeText" label="类型"></el-table-column>
            <el-table-column prop="isDeleteText" label="是否启用"></el-table-column>
            <el-table-column prop="remark" label="附记"></el-table-column>
            <el-table-column fixed="right" label="操作" width="200">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="handleClick(scope.row)">编辑</el-button>
                <el-button type="text" size="small" @click="handleClick(scope.row)">重置密码</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
        <el-card style="margin: 0 10px 10px 10px;">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
            :current-page="page.pageIndex" :page-sizes="[1, 10, 20, 30, 40, 50]" :page-size="page.pageSize"
            layout="total, sizes, prev, pager, next, jumper" :total="page.total" style="margin-top:10px;">
          </el-pagination>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog title="人员信息" :visible.sync="dialogTableVisible" custom-class="dialogwidth">
      <el-form :model="userForm" label-width="80px">
        <el-form-item label="编号">
          <el-input v-model="userForm.id" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="名称">
          <el-input v-model="userForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="账号">
          <el-input v-model="userForm.account" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="userForm.type" placeholder="请选择类型">
            <el-option v-for="option in userTypeOption" :key="option.id" :label="option.name"
              :value="option.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否启用">
          <el-radio-group v-model="userForm.isDelete">
            <el-radio :label="1">启用</el-radio>
            <el-radio :label="0">未启用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="附记">
          <el-input v-model="userForm.remark" type="textarea" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="warning" @click="handleReset()">重置</el-button>
          <el-button type="primary" @click="handleSave()">保存</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getUserByPageAsync, addUserAsync, getUserTypeAsync } from '@/api/user'
export default {
  data() {
    return {
      dialogTableVisible: false,
      userForm: {
        id: '',
        name: '',
        account: '',
        type: '',
        typeText: '',
        isDelete: 1,
        isDeleteText: '',
        remark: ''
      },
      userTypeOption: [],
      page: {
        total: 0,
        pageIndex: 1,
        pageSize: 10
      },
      tableData: []
    }
  },
  created: function () {
    this.load()
  },
  methods: {
    load() {
      getUserByPageAsync(this.page.pageIndex, this.page.pageSize).then(res => {
        this.tableData = res.data.data
        this.page.total = res.data.total
      })
    },
    getUserType() {
      getUserTypeAsync().then(res => {
        this.userTypeOption = res.data
      })
    },
    handleAdd() {
      this.dialogTableVisible = true
      this.getUserType()
    },
    handleSave() {
      addUserAsync(this.userForm).then(res => {
        console.log(res)
      })
    },
    handleReset() {
      this.userForm = {}
    },
    handleSizeChange(val) {
      this.page.pageSize = val
      this.load()
    },
    handleCurrentChange(val) {
      this.page.pageIndex = val
      this.load()
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => { })
    }
  }
}
</script>
<style scoped lang="scss">
::v-deep .dialogwidth {
  max-width: 600px;
  min-width: 300px;
}
</style>
