import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    // 内存数据状态，UI可通过this.$store.state.* 获得数据
    state : {
        isEditOut: true
    }, //新加的
    mutations : {
        changeisEditOut: (state, flag) => {
            state.isEditOut = flag
            console.log(flag)
        },
    },
})