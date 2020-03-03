<template>
  <div class="container" style="overflow-y: auto;background-color: #fff;padding: 0 20px 30px;height: 100%;">
    <SettleBatch :add-guarantor="false" :operateId="operatorId">
    </SettleBatch>
  </div>
</template>

<script>
  import SettleBatch from '@/components/agent/settleBatch'

  export default {
    name: 'settleBatch',
    components: {SettleBatch},
    data() {
      return {
        operatorId: '',
      }
    },
    watch: {
      //监听路由切换回调
      '$route': 'fetchdata'
    },
    computed: {},
    created() {
      this.operatorId = this.$route.params.id
    },
    mounted() {
      this.operatorId = this.$route.params.id
    },
    methods: {
      fetchdata() {
        this.operatorId = this.$route.params.agentId
      },
    }
  }
</script>
