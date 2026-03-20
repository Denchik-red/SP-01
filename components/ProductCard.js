import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useState } from 'react';

export default function ProductCard({ title, category, price, onAdd, inBasket, countInBasket }) {
    return (
        <View style={styles.card}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.category}>{category}</Text>
            <View style={styles.footer}>
                <Text style={styles.price}>{price} ₽</Text>
                <TouchableOpacity style={{...styles.button, backgroundColor: inBasket ? '#ffffff' : '#2F80ED'}} onPress={onAdd}>
                    <Text style={{...styles.buttonText, color: inBasket ? '#2F80ED' : '#fff'}}>{inBasket ? `В корзине ${countInBasket}` : 'Добавить'}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 16,
        margin: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
        marginBottom: 8,
        lineHeight: 22,
    },
    category: {
        fontSize: 14,
        color: '#999',
        marginBottom: 12,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    price: {
        fontSize: 18,
        fontWeight: '600',
        color: '#000',
    },
    button: {
        backgroundColor:'#2F80ED',
        borderRadius: 12,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderColor: '#2F80ED',
        borderWidth: 1,
    },
    buttonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '500',
    },
});