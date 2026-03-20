import { View, Text, ActivityIndicator, Pressable, FlatList, Modal, StyleSheet, TouchableOpacity } from 'react-native'
import { useFocusEffect } from '@react-navigation/native';
import { SearchBar } from '../components/TextInputCustom'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useState, useEffect, useCallback } from 'react'
import api from '../util/getApi.js'
import mainStyle from '../styles/mainStyle.js'
import ProductCard from '../components/ProductCard.js'
import * as apiBasket from '../util/apiBasket.js'

export default function Catalog_page() {

    useFocusEffect(
        useCallback(() => {
            const getProducts = async () => {
                const resProducts = await api.get(`/collections/products/records?page=1&perPage=30`)
                setProducts(resProducts.data.items)
                setIsProductsLoading(false)
                console.log("products: ", resProducts.data)
            }
            const getBasket = async () => {
                const resBasket = await apiBasket.getBasket()
                setBasket(resBasket.items)
                console.log("Basket: ", resBasket.items)
            }
            getProducts()
            getBasket()
            return () => {
                console.log('Экран потерял фокус');
            };
        }, [])
    );

    const [serchText, setSerchText] = useState('')
    const [isProductsLoading, setIsProductsLoading] = useState(true)

    const [genderFilter, setGenderFilter] = useState("Все")

    const [filteredProducts, setFilteredProducts] = useState([])
    const [products, setProducts] = useState([])
    const [basket, setBasket] = useState([])
    const [modalItemInfo, setModalItemInfo] = useState(null)

    function onChangeSerchText(newText) {
        setSerchText(newText)
    }

    function openItemInfoMenu(item) {
        setModalItemInfo(item)
    }

    const LoadList = () => {
        if (isProductsLoading) {
            return <ActivityIndicator />
        } else {
            return (
                <FlatList
                    data={filteredProducts}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => {
                        const itemIndexinbasket = basket.findIndex((basketItem) => {
                            return item.id == basketItem.id
                        })
                        return (
                            <ProductCard
                                title={item.title}
                                category={item.typeCloses}
                                price={item.price}
                                inBasket={
                                    itemIndexinbasket !== -1
                                }
                                countInBasket={itemIndexinbasket !== -1 ? basket[itemIndexinbasket].quantity : 0}
                                onAdd={() => openItemInfoMenu(item)}
                            />
                        )
                    }
                    }
                    contentContainerStyle={{ minHeight: '100%' }}
                />
            )
        }
    }
    useEffect(() => {
        const filteredProducts = products.filter((product) => {
            const searchFilter = (product.title.toLowerCase().includes(serchText.toLowerCase()) || product.description.toLowerCase().includes(serchText.toLowerCase()) || product.price.toString().toLowerCase().includes(serchText.toLowerCase()))
            if (genderFilter == 'Все') {
                return searchFilter
            } else {
                return searchFilter && product.typeCloses == genderFilter
            }
        })
        setFilteredProducts(filteredProducts)
    }, [serchText, genderFilter, products])
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{
                margin: 10,
            }}>
                <SearchBar setSearchText={onChangeSerchText} />

            </View>
            <View
                style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'space-around',
                    marginHorizontal: 30,
                    marginTop: 10
                }}
            >
                <Pressable
                    onPress={() => {
                        setGenderFilter('Все')
                    }}
                    style={{
                        backgroundColor: genderFilter == 'Все' ? '#007BFF' : '#dbdbdb',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 8,
                        marginBottom: 10,
                        paddingHorizontal: 20,
                        paddingVertical: 10,
                    }}
                >
                    <Text
                        style={{
                            color: genderFilter == 'Все' ? '#ffffff' : '#333',
                        }}
                    >Все</Text>
                </Pressable>

                <Pressable
                    onPress={() => {
                        setGenderFilter('Женская одежда')
                    }}
                    style={{
                        backgroundColor: genderFilter == 'Женская одежда' ? '#007BFF' : '#dbdbdb',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 8,
                        marginBottom: 10,
                        paddingHorizontal: 20,
                        paddingVertical: 10,
                    }}
                >
                    <Text
                        style={{
                            color: genderFilter == 'Женская одежда' ? '#ffffff' : '#333',
                        }}
                    >Женщинам</Text>
                </Pressable>

                <Pressable
                    onPress={() => {
                        setGenderFilter('Мужская одежда')
                    }}
                    style={{
                        backgroundColor: genderFilter == 'Мужская одежда' ? '#007BFF' : '#dbdbdb',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 8,
                        marginBottom: 10,
                        paddingHorizontal: 20,
                        paddingVertical: 10,
                    }}
                >
                    <Text
                        style={{
                            color: genderFilter == 'Мужская одежда' ? '#ffffff' : '#333',
                        }}
                    >Мужчинам</Text>
                </Pressable>
            </View>
            <LoadList />
            <Modal
                animationType="slide"       // Анимация: 'slide', 'fade', 'none'
                transparent={true}          // Делает фон прозрачным
                visible={modalItemInfo ? true : false}      // Управление видимостью
                onRequestClose={() => {     // Обработка кнопки "Назад" на Android
                    setModalItemInfo(null);
                }}
            >
                {/* Контент модального окна */}

                <TouchableOpacity
                    style={styles.centeredView}
                    activeOpacity={1}
                    onPress={() => setModalItemInfo(null)}
                >
                    <TouchableOpacity style={styles.modalView} activeOpacity={1} onPress={(e) => e.stopPropagation()}>
                        <Text style={styles.title}>{modalItemInfo?.title}</Text>
                        <Text style={styles.subtitle}>Описание</Text>
                        <Text style={styles.description}>{modalItemInfo?.description}</Text>

                        <View style={styles.spacer}></View>

                        <Text style={styles.subtitle}>Примерный расход:</Text>
                        <Text style={styles.description}>{modalItemInfo?.approximate_cost}</Text>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={async () => {
                                setIsProductsLoading(true);
                                try {
                                    const itemIndex = basket.findIndex(item => item.id === modalItemInfo.id);
                                    let updatedBasket;

                                    if (itemIndex !== -1) {
                                        updatedBasket = basket.map((item, index) =>
                                            index === itemIndex
                                                ? { ...item, quantity: item.quantity + 1 }
                                                : item
                                        );
                                    } else {
                                        updatedBasket = [...basket, { ...modalItemInfo, quantity: 1 }];
                                    }
                                    setModalItemInfo(null);

                                    // 2. Отправляем на сервер
                                    const res = await apiBasket.updateBasket(updatedBasket);

                                    // 3. Если успех — обновляем локальный стейт
                                    if (res.data) {
                                        setBasket(updatedBasket);
                                        // Alert.alert('Успешно', 'Товар добавлен в корзину');
                                    }
                                } catch (error) {
                                    // 4. Если ошибка — стейт не изменился, данные не потеряны
                                    console.error('Ошибка обновления корзины:', error);
                                    // Alert.alert('Ошибка', 'Не удалось добавить товар');
                                } finally {
                                    console.log('updatedBasketfinnaly:', basket)
                                    setIsProductsLoading(false);
                                }
                            }}
                        >
                            <Text style={mainStyle.buttonText} >Добавить за {modalItemInfo?.price} ₽</Text>
                        </TouchableOpacity>
                    </TouchableOpacity>
                </TouchableOpacity>
            </Modal>

        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
        // paddingHorizontal: 20,
        textAlign: 'start',
        marginBottom: 20,

    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        textAlign: 'start',
        marginBottom: 7,
        // paddingHorizontal: 20,
    },

    spacer: {
        flex: 1,
        marginVertical: 20,
        width: '100%',
    },
    container: {
        flex: 1,
        justifyContent: 'end',
        alignItems: 'end',
        backgroundColor: '#F5FCFF',
    },

    centeredView: {
        height: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },

    // 2. Само белое окно
    modalView: {
        height: '70%',
        width: '100%',
        // margin: 20,
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 35,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5, // Тень для Android
    },

    button: {
        backgroundColor: '#2F80ED',
        borderRadius: 12,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginTop: 15,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 'auto'
    },
    buttonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '500',
    },
    description: {
        fontSize: 16,
        color: '#333',
        marginBottom: 10,

    }
});