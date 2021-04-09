import axios from 'axios'
export default function request(config) {
    //创建axios实例对象
    const instance = axios.create({
        baseURL: 'http://152.136.185.210:7878/api/m5',
        timeout: 5000
    })
    //请求拦截器
    instance.interceptors.request.use((config) => {
        //console.log(config);
        return config
    }, err => { console.log(err); })
    //响应拦截器
    instance.interceptors.response.use((res) => {
        //console.log(res);
        return res.data
    }, err => { console.log(err); })
    return instance(config)
}