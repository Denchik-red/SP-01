import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    StatusBar,
    Modal,
    FlatList,
    Alert,
} from 'react-native';
import * as apiProjects from '../util/apiProjects.js'
import { SafeAreaView } from 'react-native-safe-area-context';


const CreateProject_page = ({navigation}) => {
    const [projectName, setProjectName] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [descriptionSource, setDescriptionSource] = useState('');

    // Данные для dropdowns
    const [typeOptions] = useState([
        { id: '1', label: 'Архитектура' },
        { id: '2', label: 'Дизайн' },
        { id: '3', label: 'Строительство' },
        { id: '4', label: 'Реконструкция' },
    ]);

    const [toWhomOptions] = useState([
        { id: '1', label: 'Иванов И.И.' },
        { id: '2', label: 'Петров П.П.' },
        { id: '3', label: 'Сидоров С.С.' },
        { id: '4', label: 'ООО "СтройПроект"' },
    ]);

    const [categoryOptions] = useState([
        { id: '1', label: 'Жилое здание' },
        { id: '2', label: 'Офисное помещение' },
        { id: '3', label: 'Торговый центр' },
        { id: '4', label: 'Промышленный объект' },
    ]);

    // Выбранные значения
    const [selectedType, setSelectedType] = useState(null);
    const [selectedToWhom, setSelectedToWhom] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);

    // Модальные окна для dropdowns
    const [typeModalVisible, setTypeModalVisible] = useState(false);
    const [toWhomModalVisible, setToWhomModalVisible] = useState(false);
    const [categoryModalVisible, setCategoryModalVisible] = useState(false);

    // Обработка отправки формы
    const handleSubmit = async () => {
        // Сбор всех данных формы
        const formData = {
            title: projectName,
            type: selectedType?.label || null,
            date_start: startDate,
            date_end: endDate,
            to_whom: selectedToWhom?.label || null,
            to_whom_id: selectedToWhom?.id || null,
            size: null,
            description_source: descriptionSource,
            technical_drawing: "",
            category: selectedCategory?.label || null,
            category_id: selectedCategory?.id || null,
            created_at: new Date().toISOString(),
        };

        // Вывод в консоль
        console.log('=== Данные формы ===');
        console.log(JSON.stringify(formData, null, 2));
        console.log('===================');
        apiProjects.newProject(formData).then(res => console.log(res)).catch(err => console.log(err))
        // Валидация
        if (!projectName.trim()) {
            Alert.alert('Ошибка', 'Введите название проекта');
            return;
        }

        if (!selectedType) {
            Alert.alert('Ошибка', 'Выберите тип проекта');
            return;
        }
        
        navigation.navigate('MainNav', { screen: 'Projects' });
        Alert.alert('Успешно', 'Данные собраны и выведены в консоль');
    };

    const renderDropdown = (label, value, setValue, modalVisible, setModalVisible, options) => (
        <View style={styles.field}>
            <Text style={styles.label}>{label}</Text>
            <TouchableOpacity
                style={styles.dropdown}
                onPress={() => setModalVisible(true)}
            >
                <Text style={value ? styles.dropdownSelectedText : styles.dropdownText}>
                    {value ? value.label : `Выберите ${label.toLowerCase()}`}
                </Text>
                <Text style={styles.dropdownIcon}>▼</Text>
            </TouchableOpacity>

            <Modal
                visible={modalVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setModalVisible(false)}
            >
                <TouchableOpacity
                    style={styles.modalOverlay}
                    activeOpacity={1}
                    onPress={() => setModalVisible(false)}
                >
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>{label}</Text>
                            <TouchableOpacity onPress={() => setModalVisible(false)}>
                                <Text style={styles.modalClose}>✕</Text>
                            </TouchableOpacity>
                        </View>
                        <FlatList
                            data={options}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={[
                                        styles.optionItem,
                                        value?.id === item.id && styles.optionItemSelected
                                    ]}
                                    onPress={() => {
                                        setValue(item);
                                        setModalVisible(false);
                                    }}
                                >
                                    <Text style={[
                                        styles.optionText,
                                        value?.id === item.id && styles.optionTextSelected
                                    ]}>
                                        {item.label}
                                    </Text>
                                    {value?.id === item.id && <Text style={styles.checkmark}>✓</Text>}
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Создать проект</Text>
            </View>

            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                <View style={styles.formContainer}>

                    {/* Type Dropdown */}
                    {renderDropdown(
                        'Тип',
                        selectedType,
                        setSelectedType,
                        typeModalVisible,
                        setTypeModalVisible,
                        typeOptions
                    )}

                    {/* Project Name */}
                    <View style={styles.field}>
                        <Text style={styles.label}>Название проекта</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Введите имя"
                            placeholderTextColor="#999999"
                            value={projectName}
                            onChangeText={setProjectName}
                        />
                    </View>

                    {/* Start Date */}
                    <View style={styles.field}>
                        <Text style={styles.label}>Дата начала</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="--.--.----"
                            placeholderTextColor="#999999"
                            value={startDate}
                            onChangeText={setStartDate}
                        />
                    </View>

                    {/* End Date */}
                    <View style={styles.field}>
                        <Text style={styles.label}>Дата Окончания</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="--.--.----"
                            placeholderTextColor="#999999"
                            value={endDate}
                            onChangeText={setEndDate}
                        />
                    </View>

                    {/* To Whom Dropdown */}
                    {renderDropdown(
                        'Кому',
                        selectedToWhom,
                        setSelectedToWhom,
                        toWhomModalVisible,
                        setToWhomModalVisible,
                        toWhomOptions
                    )}

                    {/* Description Source */}
                    <View style={styles.field}>
                        <Text style={styles.label}>Источник описания</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="example.com"
                            placeholderTextColor="#999999"
                            value={descriptionSource}
                            onChangeText={setDescriptionSource}
                            keyboardType="url"
                        />
                    </View>

                    {/* Category Dropdown */}
                    {renderDropdown(
                        'Категория',
                        selectedCategory,
                        setSelectedCategory,
                        categoryModalVisible,
                        setCategoryModalVisible,
                        categoryOptions
                    )}

                    {/* Plus Button */}
                    <View style={styles.plusButtonContainer}>
                        <TouchableOpacity style={styles.plusButton}>
                            <Text style={styles.plusButtonText}>+</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </ScrollView>

            {/* Confirm Button */}
            <View style={styles.footer}>
                <TouchableOpacity
                    style={styles.confirmButton}
                    onPress={handleSubmit}
                    activeOpacity={0.7}
                >
                    <Text style={styles.confirmButtonText}>Подтвердить</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    header: {
        backgroundColor: '#FFFFFF',
        paddingVertical: 16,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5E5',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#000000',
        textAlign: 'center',
    },
    scrollView: {
        flex: 1,
    },
    formContainer: {
        padding: 16,
    },
    field: {
        marginBottom: 16,
    },
    label: {
        fontSize: 14,
        color: '#6C757D',
        marginBottom: 8,
        marginLeft: 4,
    },
    dropdown: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#DEE2E6',
    },
    dropdownText: {
        fontSize: 16,
        color: '#999999',
    },
    dropdownSelectedText: {
        fontSize: 16,
        color: '#000000',
    },
    dropdownIcon: {
        fontSize: 12,
        color: '#6C757D',
    },
    input: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        fontSize: 16,
        color: '#000000',
        borderWidth: 1,
        borderColor: '#DEE2E6',
    },
    plusButtonContainer: {
        alignItems: 'center',
        marginVertical: 24,
    },
    plusButton: {
        width: 200,
        height: 200,
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#DEE2E6',
        borderStyle: 'dashed',
    },
    plusButtonText: {
        fontSize: 80,
        color: '#6C757D',
        fontWeight: '300',
    },
    footer: {
        backgroundColor: '#FFFFFF',
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#E5E5E5',
    },
    confirmButton: {
        backgroundColor: '#007AFF',
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
    },
    confirmButtonText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#FFFFFF',
    },
    // Modal styles
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        width: '85%',
        maxHeight: '60%',
        overflow: 'hidden',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5E5',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#000000',
    },
    modalClose: {
        fontSize: 24,
        color: '#6C757D',
        paddingHorizontal: 8,
    },
    optionItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F8F9FA',
    },
    optionItemSelected: {
        backgroundColor: '#F0F7FF',
    },
    optionText: {
        fontSize: 16,
        color: '#000000',
    },
    optionTextSelected: {
        color: '#007AFF',
        fontWeight: '600',
    },
    checkmark: {
        fontSize: 20,
        color: '#007AFF',
        fontWeight: '600',
    },
});

export default CreateProject_page;