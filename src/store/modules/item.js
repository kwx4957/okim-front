const item = {
    state: {
        items: [],
        currentItem: {}
    },
    mutations: {
        ADD_ITEM: (state, item) => {
            state.items.unshift(item);
        },
        SET_ITEMS: (state, todos) => {
            state.items = todos;
        },
        INIT_ITEMS: (state) => {
            state.items = []
        },

        SET_CURRENT_ITEM: (state, item) => {
            state.currentItem = item
        }

    },
    actions: {
        // 생성된 아이템 저장
        addItem({ commit }, item) {
            commit('ADD_ITEM', item);
        },

        setItems({commit}, items){
            commit('SET_ITEMS', items)
        },

        initItems({commit}){
            commit('INIT_ITEMS', [])
        },
        setCurrentTime({commit}, item){
            commit('SET_CURRENT_ITEM', item)
        }
    },
    getters: {
        doneItems: state => {
            return state.items.filter(item => item.itemStatus === 'DONE')
        },
        undoneItems: state => {
            return state.items.filter(item => item.itemStatus === 'UNDONE')
        }
    }
}

export default item;