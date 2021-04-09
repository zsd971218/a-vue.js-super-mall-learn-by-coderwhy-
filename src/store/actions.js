export default {
    addCar(context, obj) {
        //判断该商品是否已被加入到购物车
        let item = context.state.carList.find(item => item.iid === obj.iid);
        if (item) {
            return new Promise((res, rej) => {
                const index = context.state.carList.indexOf(item);
                context.commit('addCount', index);
                res('当前数量加1')
            })
        } else {
            return new Promise((res, rej) => {
                context.commit('addList', obj);
                res('添加购物车成功')
            })
        }
    }
}

