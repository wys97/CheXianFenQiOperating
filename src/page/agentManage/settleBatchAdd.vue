<template>
  <div class="container" style="overflow-y: auto;background-color: #fff;padding: 0 20px 30px;height: 100%;">
    <SettleBatch :add-guarantor="true" :agentId="agentId">
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
        agentId: '',
      }
    },
    watch: {
      //监听路由切换回调
      '$route': 'fetchdata'
    },
    computed: {},
    created() {
      this.agentId = this.$route.params.id
    },
    mounted() {
      this.agentId = this.$route.params.id
    },
    methods: {
      fetchdata() {
        this.agentId = this.$route.params.id
      },
    },

  }
</script>
