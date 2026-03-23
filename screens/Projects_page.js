import { Text, Pressable, View, FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import mainStyle from '../styles/mainStyle.js'
import { useState, useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import * as apiProjects from '../util/apiProjects.js'
import ProjectCard from '../components/ProjectCard.js'


export default function Projects_page({ navigation }) {

    const [isProjectsLoading, setIsProjectLoading] = useState(true)
    const [projects, setProjects] = useState([])

    useFocusEffect(
        useCallback(() => {
            const getProjects = async () => {
                const resProjects = await apiProjects.getProjects()
                console.log("Projects: ", resProjects.items)
                setProjects(resProjects.items)
                setIsProjectLoading(false)
            }
            getProjects()
            return () => {
                console.log('Экран потерял фокус');
            };
        }, [])
    );


    const handleOpenProject = (projectId) => {
        console.log('Открыть проект:', projectId);
        // Навигация или другая логика
    };

    if (isProjectsLoading) {
        return <Text>Загрузка...</Text>;
    } else {


        return (
            <SafeAreaView style={{ flex: 1 }}>

                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingHorizontal: 20,
                    paddingVertical: 10
                }}>
                    {/* Этот пустой View используется как заглушка, чтобы заголовок был идеально по центру */}
                    <View style={{ width: 50 }} />
                    <Text style={{ ...mainStyle.title, textAlign: 'center' }}>Проекты</Text>
                    <Pressable style={{
                        width: 50,
                        height: 50,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                        onPress={() => { navigation.navigate("CreateProject") }}
                    >
                        <Text style={{ fontSize: 30, color: '#007BFF' }}>+</Text>
                    </Pressable>
                </View>

                <FlatList
                    data={projects}
                    keyExtractor={(item) => `project-item-${item.id}`}
                    renderItem={({ item }) => {
                        return (
                            <ProjectCard
                                title={item.title}
                                daysPassed={2} // Это значение статично, возможно, его нужно будет вычислять
                                projectId={item.id}
                                onOpen={handleOpenProject}
                            />
                        )
                    }}
                    contentContainerStyle={{ paddingBottom: 20 }}
                />
            </SafeAreaView>
        )
    }
}