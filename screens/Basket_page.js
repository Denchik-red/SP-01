import { Text, View, Pressable, ActivityIndicator } from 'react-native'
import { useFocusEffect } from '@react-navigation/native';
import { useState, useEffect, useCallback } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as apiBasket from '../util/apiBasket.js'
import { FlatList } from 'react-native'
import ProductCardInBasked from '../components/ProductCardInBasked'


export default function Basket_page({ navigation }) {

    const [isBasketLoading, setIsBasketLoading] = useState(true)
    const [basket, setBasket] = useState([])

    useFocusEffect(
        useCallback(() => {
            const getBasket = async () => {
                const resBasket = await apiBasket.getBasket()
                setBasket(resBasket.items)
                console.log("Basket: ", resBasket.items)
                setIsBasketLoading(false)
            }
            getBasket()
            return () => {
                console.log('Экран потерял фокус');
            };
        }, [])
    );

    function BasketList() {
        if (isBasketLoading) {
            return <ActivityIndicator />
        } else {
            return (
                <View>
                    <FlatList
                        data={basket}
                        keyExtractor={(item) => `basket-item-${item.id}`}
                        renderItem={({ item }) => {
                            return (
                                <ProductCardInBasked
                                    basket={basket}
                                    id={item.id}
                                    setIsBasketLoading={setIsBasketLoading}
                                    setBasket={setBasket}
                                    title={item.title}
                                    price={item.price}
                                    quantity={item.quantity}

                                />
                            )
                        }
                        }
                        contentContainerStyle={{ minHeight: '100%', paddingBottom: basket.length == 0 ? 0 : 80 }}
                    />
                    <View style={{
                        display: basket.length == 0 ? 'none' : 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingHorizontal: 20,
                        alignItems: 'center',
                        paddingVertical: 15,
                        borderTopWidth: 1,
                        borderTopColor: '#eee'
                    }}>
                        <Text style={{
                            fontSize: 20,
                            fontWeight: 'bold',
                        }}>Всего:</Text>
                        <Text style={{
                            fontSize: 20,
                            fontWeight: 'bold'
                        }}>{basket.reduce((totalCost, item) => totalCost + item.price * item.quantity, 0)} ₽</Text>
                    </View>
                </View>


            )
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, paddingBottom: 20 }}>
            <BasketList />
            <View style={{
                display: basket.length == 0 ? 'none' : 'flex',
                position: 'absolute',
                bottom: 20,
                width: "100%",
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Pressable
                    style={{
                        backgroundColor: '#007BFF',
                        paddingVertical: 20,
                        paddingHorizontal: 30,
                        borderRadius: 10,
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 10,
                        width: '90%',
                        justifyContent: 'center',
                    }}
                >
                    <Text style={{
                        color: 'white',
                        fontSize: 20,
                        fontWeight: 'bold'
                    }}>Перейти к оформлению заказа</Text>
                </Pressable>

            </View>
        </SafeAreaView>
    )
}