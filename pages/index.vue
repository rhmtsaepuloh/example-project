<template>
  <div>
    <el-table :data="listLob" style="width: 100%">
      <el-table-column
        prop="project_name"
        label="Nama Project"
        header-align="center"
        width="150" />
      <el-table-column
        prop="status_order"
        label="Status"
        header-align="center"
        width="150" />
      <el-table-column
        prop="nilai_proyek"
        label="Nilai Proyek"
        header-align="center"
        width="150" />
      <el-table-column label="Status Progress" header-align="center">
        <el-table-column 
          v-for="(val, id) in listLob[0].milestone_group" 
          :key="id" 
          :label="val.group_name"
          header-align="center"
        >
          <el-table-column
            v-for="(vax, n) in val.milestone"
            :key="n"
            :label="vax.milestone_name"
            header-align="center"
            width="120">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">
                {{ 
                  getValue(scope.row.milestone_group, val.group_name, vax.milestone_name) 
                  ? 'Active' : 'Inactive' 
                }}
              </span>
            </template>
          </el-table-column>
        </el-table-column>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters } from '@/node_modules/vuex';

export default {
  name: 'IndexPage',
  async asyncData({ store }) {
    await store.dispatch('lob/fetchData');
  },
  computed: {
    ...mapGetters('lob', {
      listLob: 'getListLob'
    })
  },
  methods: {
    getValue(data, groupName, milestoneName) {
      const findByGroupName = data.find((val) => (val.group_name === groupName))
      if (findByGroupName && findByGroupName.milestone.length) {
        const findByMileStoneName = findByGroupName.milestone.find(
          (vax) => (vax.milestone_name === milestoneName)
        );
        if (findByMileStoneName) {
          return findByGroupName.status;
        }
      }

      return false;
    }
  }
}
</script>
