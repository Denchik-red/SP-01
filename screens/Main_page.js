import { View, Text, ActivityIndicator, ScrollView, Image, Pressable } from 'react-native'
import { SearchBar } from '../components/TextInputCustom'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useState, useEffect } from 'react'
import * as apiItems from '../util/apiItem.js'
import api from '../util/getApi.js'
import mainStyle from '../styles/mainStyle.js'
import ProductCard from '../components/ProductCard.js'


export default function Main_page() {

    const [serchText, setSerchText] = useState('')
    const [isStocksLoading, setIsStocksLoading] = useState(true)
    const [isProductsLoading, setIsProductsLoading] = useState(true)

    const [genderFilter, setGenderFilter] = useState("Все")

    const [stocks, setStocks] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])
    const [products, setProducts] = useState([])

    function onChangeSerchText(newText) {
        setSerchText(newText)
    }

    useEffect(() => {
        const getProducts = async () => {
            const resProducts = await api.get(`/collections/products/records?page=1&perPage=30`)
            setProducts(resProducts.data.items)
            setIsProductsLoading(false)
            console.log("products: ", resProducts.data)
        }
        const getStocks = async () => {
            const resStocks = await api.get(`/collections/promotions_and_news/records?page=1&perPage=30`)
            setStocks(resStocks.data.items.map((stock) => `http://2.nntc.nnov.ru:8900/api/files/${stock.collectionId}/${stock.id}/${stock.newsImage}`))
            setIsStocksLoading(false)
            console.log("Stocks: ", resStocks.data)
        }
        getProducts()
        getStocks()
    }, [])

    useEffect(() => {
        const filteredProducts = products.filter((product) => {
            const searchFilter = (product.title.toLowerCase().includes(serchText.toLowerCase()) || product.description.toLowerCase().includes(serchText.toLowerCase()) || product.price.toString().toLowerCase().includes(serchText.toLowerCase()))
            if (genderFilter == 'Все') {
                return searchFilter
            } else {
                return searchFilter && product.typeCloses == genderFilter
            }
        })
        console.log('filteredProducts', filteredProducts)
        setFilteredProducts(filteredProducts)
    }, [serchText, genderFilter, products])
    return (
        <SafeAreaView>
            <View style={{
                margin: 10,
            }}>
                <SearchBar setSearchText={onChangeSerchText} />

            </View>
            <Text style={{ ...mainStyle.subtitle, paddingTop: 30 }}>Акции и новости</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{
            }}
            >
                {isStocksLoading ? <ActivityIndicator /> :
                    stocks.map((stock) => {
                        return (
                            <Image
                                key={`image-${stock}`}
                                source={{ uri: stock }}
                                style={{
                                    width: 200,
                                    height: 150,
                                    marginHorizontal: 10,
                                    borderRadius: 12,
                                }}
                                resizeMode="contain"
                            />
                        )
                    })
                }
            </ScrollView>
            <Text style={{ ...mainStyle.subtitle, paddingTop: 30 }}>Каталог описаний</Text>
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

            <ScrollView style={{
                marginBottom: 50,
            }}>
                {filteredProducts.map((product) => {
                    return (
                        <ProductCard
                            key={product.id}
                            title={product.title}
                            category={product.typeCloses}
                            price={product.price}
                            onAdd={() => {}}
                        />
                    )
                })}
            </ScrollView>

        </SafeAreaView>
    )
}