export default {
    namespace: 'userInfo',
    state: {
        userName:''
    },
    reducers: {
        save(state:any, action:any) {
            state.userName = action.payLoad.userName
        },
    },
    effects: {
      
    }
  }