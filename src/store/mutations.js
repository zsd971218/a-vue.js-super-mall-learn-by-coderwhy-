export default {
    //数量加1
    addCount(state, index) {
        state.carList[index].count++;
    },
    addList(state, obj) {
        obj.isSettle = false;
        state.carList.push(obj);
    },
    //全选
    checkAll(state) {
        state.carList.forEach((item, index, arr) => {
            arr[index].isSettle = false;
        });
    },
    //取消全选
    removeAll(state) {
        state.carList.forEach((item, index, arr) => {
            arr[index].isSettle = true;
        });
    }
}

