import React, { useEffect, useRef } from 'react';
import { Animated, View, StyleSheet, Text, Image } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const CircleProgressBar = ({
  progress,
  limit,
  size = 250,
  strokeWidth = 20,
  progressColor = '#00AAFF',
  backgroundColor = '#eee',
  stepsIcon = require('./assets/icons/icon_walk.png'), // Asegúrate de tener este icono en tu proyecto
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const newProgress = Math.min(progress, limit);
    Animated.timing(animatedValue, {
      toValue: newProgress,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [progress, limit]);

  const strokeDashoffset = animatedValue.interpolate({
    inputRange: [0, limit],
    outputRange: [circumference, 0],
    extrapolate: 'clamp',
  });

  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={size} height={size}>
        {/* Círculo de fondo */}
        <Circle
          stroke={backgroundColor}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />
        {/* Círculo de progreso animado */}
        <AnimatedCircle
          stroke={progressColor}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </Svg>
      <View style={styles.centerContentContainer}>
        <Image source={stepsIcon} style={styles.centerIcon} />
        <Text style={styles.centerNumber}>{progress}</Text>
        <Text style={styles.centerLabel}>pasos</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  centerContentContainer: {
    position: 'absolute',
    alignItems: 'center',
  },
  centerIcon: {
    width: 30,
    height: 30,
    marginBottom: 5,
  },
  centerNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
  },
  centerLabel: {
    fontSize: 16,
    color: '#333',
  },
});

export default CircleProgressBar;
