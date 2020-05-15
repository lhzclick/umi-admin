export default {
    namespace: 'userInfo',
    state: {
        userName:'',
        breadcrumb:[]
    },
    reducers: {
        save(state:any, action:any) {
            state.userName = action.payLoad.userName
        },
        changeBreadcrumb(state:any, action:any) {
            state.breadcrumb = action.payLoad.breadcrumb
        },
    },
    effects: {
      
    }
  }