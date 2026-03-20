import api from '../util/getApi.js';
import * as apiItem from '../util/apiItem.js';

export async function getBasketFromServer() {
    const res = await api.get("/collections/basket/records")
    return res.data?.items[0]
}

export async function createBasket(items) {
    const res = await api.post("/collections/basket/records", {
        items: items,
        user_id: await apiItem.getItem("userId")
    })
    return res.data
}

export async function getBasket() {
    const basket = await getBasketFromServer()
    if (basket) {
        return basket
    } else {
        const newBasket = await createBasket([])
        return newBasket
    }
}

export async function updateBasket(items) {
    const basket = await getBasketFromServer()
    if (basket) {
        const res = await api.patch(`/collections/basket/records/${basket.id}`, {
            items: items
        })
        return res
    } else {
        const newBasket = await createBasket(items)
        return newBasket
    }
}