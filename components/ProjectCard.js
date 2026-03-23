import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ProjectCard = ({ 
  title, 
  daysPassed, 
  onOpen, 
  projectId 
}) => {
  // Форматирование текста в зависимости от количества дней
  const getDaysText = (days) => {
    const lastDigit = days % 10;
    const lastTwoDigits = days % 100;
    
    if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
      return `Прошло ${days} дней`;
    }
    
    if (lastDigit === 1) {
      return `Прошел ${days} день`;
    }
    
    if (lastDigit >= 2 && lastDigit <= 4) {
      return `Прошло ${days} дня`;
    }
    
    return `Прошло ${days} дней`;
  };

  return (
    <View style={styles.card}>
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
        
        <View style={styles.footer}>
          <Text style={styles.daysText}>
            {getDaysText(daysPassed)}
          </Text>
          
          <TouchableOpacity 
            style={styles.button}
            onPress={() => onOpen(projectId)}
            activeOpacity={0.7}
          >
            <Text style={styles.buttonText}>
              Открыть
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 32,
    lineHeight: 24,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  daysText: {
    fontSize: 14,
    color: '#999999',
  },
  button: {
    backgroundColor: '#4F46E5',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default ProjectCard;