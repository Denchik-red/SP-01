import api from '../util/getApi.js';
import * as apiItem from '../util/apiItem.js';

export async function getBasketFromServer() {
    const res = await api.get("/collections/basket/records")
    console.log("Basket:", res.data.items[0])
    if (res.data.items[0]) {
        console.log(true)
    } else {
        console.log(false)
    }
    return res.data?.items[0]
}

export async function createBasket(items) {
    console.log("Create basket")
    const res = await api.post("/collections/basket/records", {
        items: items,
        user_id: await apiItem.getItem("userId")
    })
    console.log("Create basket", res.data)
    return res.data
}

export async function getBasket() {
    const basket = await getBasketFromServer()
    if (basket) {
        return basket
    } else {
        const newBasket = await createBasket([])
        console.log("New basket:", newBasket)
        return newBasket
    }
}

export async function updateBasket(items) {
    const basket = await getBasketFromServer()
    if (basket) {
        const res = await api.patch(`/collections/basket/records/${basket.id}`, {
            items: items
        })
        console.log("Update basket", res.data)
        return res
    } else {
        const newBasket = await createBasket(items)
        console.log("New basket:", newBasket)
        return newBasket
    }
}