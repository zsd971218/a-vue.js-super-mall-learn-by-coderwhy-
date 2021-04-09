import { debounce } from "common/util.js";
export const goodsMixin = {
    data() {
        return {
            res: null,
        };
    },
    mounted() {
        //包装成防抖函数
        this.res = debounce(this.load, 200);
    },
    methods: {
        loadImage() {
            this.res();
            //console.log(1);
        },
        // 加载图片触发，由于设置了防抖，只会触发一次
        load() {
            this.$emit("finshLoad");
            //console.log(1);
        },
        //实现路由跳转
        clickLink(iid) {
            this.$router.push({
                name: "/details",
                params: {
                    iid,
                },
            });
            // console.log(item);
        },
    },
    filters: {
        substr(msg) {
            return msg.trim().substring(0, 11) + "...";
        },
    },
}