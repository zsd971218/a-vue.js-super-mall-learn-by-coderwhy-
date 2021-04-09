import request from './request.js';
export function getDetailsData(iid) {
    return request({
        url: '/detail',
        method: 'get',
        params: {
            iid
        }
    })
};
export function getRecommend() {
    return request({
        url: '/recommend'
    }
    )

}
export class DetailGoods {
    constructor(itemInfo, services, columns) {
        this.title = itemInfo.title;
        this.newPrice = itemInfo.price;
        this.lowNowPrice = itemInfo.lowNowPrice;
        this.oldPrice = itemInfo.oldPrice;
        this.discount = itemInfo.discountDesc;
        this.popular = columns;
        this.services = services;
    }

}
export class Shop {
    constructor(shopInfo) {
        this.title = shopInfo.name;
        this.logo = shopInfo.shopLogo;
        this.sells = shopInfo.cSells;
        this.goods = shopInfo.cGoods;
        this.score = shopInfo.score;
    }

}

export class Params {
    constructor(itemParams) {
        this.pkey = itemParams.info.key;
        this.set = itemParams.info.set;
        this.rkey = itemParams.rule.key;
        this.table = itemParams.rule.tables[0];
    }
}
