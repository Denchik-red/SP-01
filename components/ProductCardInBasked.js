import React, { useEffect, useState } from 'react';
import * as apiBasket from '../util/apiBasket.js'

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Pressable,
} from 'react-native';


export default function ProductCardInBasked({ basket, id, setIsBasketLoading, setBasket, title, price, quantity = 0 }) {
    const [count, setCount] = useState(quantity);
    return (
        <View style={styles.simpleContainer}>
            <Pressable
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                onPress={async () => {
                    setIsBasketLoading(true)
                    const updatedBasket = basket.filter(item => item.title !== title);
                    const res = await apiBasket.updateBasket(updatedBasket);
                    if (res) {
                        setBasket(updatedBasket);
                        setIsBasketLoading(false)
                    }
                }}
                style={styles.simpleCloseButton}
            >
                <Text style={styles.simpleCloseButtonText}>X</Text>
            </Pressable>

            <Text style={styles.simpleTitle}>{title}</Text>

            <View style={styles.simpleBottomRow}>
                <Text style={styles.simplePrice}>{price} ₽</Text>

                <View style={styles.simpleQuantityContainer}>
                    <TouchableOpacity
                        style={styles.simpleButton}
                        onPress={async () => {
                            if (count <= 1) {
                                return;
                            }
                            setIsBasketLoading(true)
                            setCount(count - 1)
                            const updatedBasket = basket.map((item) => {
                                if (item.id === id) {
                                    return { ...item, quantity: count - 1 };
                                }
                                return item;
                            })
                            await apiBasket.updateBasket(updatedBasket)
                            setBasket(updatedBasket)
                            setIsBasketLoading(false)
                        }}
                    >


                        <Text style={styles.simpleButtonText}>−</Text>
                    </TouchableOpacity>

                    <View style={styles.simpleQuantityWrapper}>
                        <Text style={styles.simpleQuantityText}>{count}</Text>
                        <Text style={styles.simpleQuantityLabel}> штук</Text>
                    </View>

                    <TouchableOpacity
                        style={styles.simpleButton}
                        onPress={async () => {
                            setIsBasketLoading(true)
                            setCount(count + 1)
                            const updateBasket = basket.map((item) => {
                                if (item.id === id) {
                                    return { ...item, quantity: count + 1 };
                                }
                                return item;
                            })
                            await apiBasket.updateBasket(updateBasket)
                            setBasket(updateBasket)
                            setIsBasketLoading(false)
                        }}
                    >
                        <Text style={styles.simpleButtonText}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    simpleContainer: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginVertical: 8,
        marginHorizontal: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        position: 'relative',
    },
    simpleCloseButton: {
        position: 'absolute',
        top: 8,
        right: 8,
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
    },
    simpleCloseButtonText: {
        fontSize: 24,
        color: '#999',
        fontWeight: '300',
    },
    simpleTitle: {
        fontSize: 16,
        fontWeight: '400',
        color: '#333',
        marginBottom: 12,
        lineHeight: 22,
        paddingRight: 30,
    },
    simpleBottomRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    simplePrice: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
    },
    simpleQuantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
        padding: 4,
    },
    simpleButton: {
        width: 32,
        height: 32,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    simpleButtonText: {
        fontSize: 20,
        color: '#666',
        fontWeight: '400',
    },
    simpleQuantityWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
    },
    simpleQuantityText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
    },
    simpleQuantityLabel: {
        fontSize: 14,
        color: '#999',
    },
});