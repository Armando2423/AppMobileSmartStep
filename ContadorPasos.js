import React, { useState } from 'react';
import { 
  View, Text, StyleSheet, TextInput, Image 
} from 'react-native';
import CircleProgressBar from './CircleProgressBar';

export default function ContadorPasos() {
  // Estado para el objetivo editable (en pasos)
  const [objective, setObjective] = useState("10000");
  const currentSteps = 6000; // Pasos actuales (ejemplo)
  // Convertimos el objetivo a número (o usamos 10000 si falla la conversión)
  const stepLimit = parseInt(objective) || 10000;

  // Íconos para las métricas (calorías, distancia, tiempo)
  const metricIcons = {
    calories: require('./assets/icons/icon_calories.png'),
    distance: require('./assets/icons/icon_distance.png'),
    time: require('./assets/icons/icon_time.png'),
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <CircleProgressBar 
          progress={currentSteps} 
          limit={stepLimit} 
          size={250} 
          strokeWidth={20} 
        />
      </View>
      <View style={styles.bottomContainer}>
        {/* Área del objetivo: etiqueta y campo editable en columna, centrados */}
        <View style={styles.objectiveContainer}>
          <Text style={styles.objectiveLabel}>Objetivo:</Text>
          <TextInput
            style={styles.objectiveInput}
            value={objective}
            onChangeText={setObjective}
            keyboardType="numeric"
          />
        </View>
        {/* Fila de métricas con íconos en círculos */}
        <View style={styles.metricsRow}>
          <View style={styles.metricItem}>
            <View style={styles.iconCircle}>
              <Image source={metricIcons.calories} style={styles.metricIcon} />
            </View>
            <Text style={styles.metricValue}>0 cal</Text>
          </View>
          <View style={styles.metricItem}>
            <View style={styles.iconCircle}>
              <Image source={metricIcons.distance} style={styles.metricIcon} />
            </View>
            <Text style={styles.metricValue}>0 km</Text>
          </View>
          <View style={styles.metricItem}>
            <View style={styles.iconCircle}>
              <Image source={metricIcons.time} style={styles.metricIcon} />
            </View>
            <Text style={styles.metricValue}>0 h</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#EAEAEA',
    paddingBottom: 120,
  },
  topContainer: { 
    flex: 1, 
    justifyContent: 'flex-end', 
    alignItems: 'center', 
    paddingBottom: 20,
  },
  bottomContainer: { 
    flex: 0.75, // Contenedor inferior menos alto
    backgroundColor: '#fff', 
    borderRadius: 10, 
    padding: 20,
    marginHorizontal: 20,
    justifyContent: 'center',
  },
  objectiveContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  objectiveLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  objectiveInput: {
    fontSize: 18,
    color: '#333',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 5,
    width: '50%',
    textAlign: 'center',
  },
  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  metricItem: {
    alignItems: 'center',
  },
  iconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  metricIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  metricValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});
