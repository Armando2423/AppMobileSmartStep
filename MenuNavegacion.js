import React, { useState } from 'react';
import { 
  createBottomTabNavigator 
} from '@react-navigation/bottom-tabs';
import ContadorPasos from './ContadorPasos';
import DistribucionFuerza from './DistribucionFuerza';
import Perfil from './Perfil';
import { 
  Image, View, Text, Animated, 
  StyleSheet, TouchableOpacity, 
  StatusBar, Pressable 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const icons = {
  Pasos: require('./assets/images/icono_pasos.png'),
  Fuerza: require('./assets/images/icono_fuerza.png'),
  Perfil: require('./assets/images/icono_perfil.png'),
  Menu: require('./assets/images/icono_menu.png'),
  Notificaciones: require('./assets/images/icono_notificacion.png'),
  CerrarSesion: require('./assets/images/icono_logout.png'),
};

// 🚀 Header personalizado con menú desplegable
function CustomHeader() {
  const navigation = useNavigation();
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => setMenuVisible(!menuVisible);
  const cerrarSesion = () => {
    setMenuVisible(false);
    navigation.replace('Login');
  };

  return (
    <View style={styles.header}>
      {/* Configuración de StatusBar para que los iconos sean blancos */}
      <StatusBar barStyle="light-content" backgroundColor="#2b2b2b" />

      {/* Icono de Menú Hamburguesa en la derecha */}
      <TouchableOpacity onPress={toggleMenu} style={styles.menuButton}>
        <Image source={icons.Menu} style={styles.menuIcon} />
      </TouchableOpacity>

      {/* Menú desplegable en la esquina superior derecha */}
      {menuVisible && (
        <Pressable style={styles.menuOverlay} onPress={() => setMenuVisible(false)}>
          <View style={styles.menuContainer}>
            {/* Espacio superior */}
            <View style={styles.menuSpacing} />

            {/* Botón de Notificaciones */}
            <TouchableOpacity style={styles.menuItem}>
              <Image source={icons.Notificaciones} style={styles.menuIconOption} />
              <Text style={styles.menuText}>Notificaciones</Text>
            </TouchableOpacity>

            {/* Línea divisoria */}
            <View style={styles.menuDivider} />

            {/* Botón de Cerrar Sesión */}
            <TouchableOpacity style={styles.menuItem} onPress={cerrarSesion}>
              <Image source={icons.CerrarSesion} style={styles.menuIconOption} />
              <Text style={styles.menuText}>Cerrar Sesión</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      )}
    </View>
  );
}

export default function MenuNavegacion() {
  return (
    <>
      <CustomHeader />

      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => {
            const scaleValue = new Animated.Value(focused ? 1.5 : 1);
            Animated.spring(scaleValue, {
              toValue: focused ? 1.5 : 1,
              useNativeDriver: true,
            }).start();

            return (
              <Animated.View
                style={[
                  styles.iconContainer,
                  focused ? styles.activeIconContainer : null,
                ]}
              >
                <Image
                  source={icons[route.name]}
                  style={[
                    styles.icon,
                    focused ? styles.activeIcon : styles.inactiveIcon,
                  ]}
                />
              </Animated.View>
            );
          },
          tabBarLabel: ({ focused }) =>
            focused ? <Text style={styles.activeLabel}>{route.name}</Text> : null,
          tabBarStyle: styles.tabBar,
          tabBarActiveTintColor: '#00AAFF',
          tabBarInactiveTintColor: 'gray',
          headerShown: false, // Ocultamos el header por defecto para usar el nuestro
        })}
      >
        <Tab.Screen name="Pasos" component={ContadorPasos} />
        <Tab.Screen name="Fuerza" component={DistribucionFuerza} />
        <Tab.Screen name="Perfil" component={Perfil} />
      </Tab.Navigator>
    </>
  );
}

const styles = StyleSheet.create({
  // 🎨 Estilos del menú superior
  header: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: 90,
    backgroundColor: '#2b2b2b',
    justifyContent: 'center',
    alignItems: 'flex-end', // Alineamos a la derecha
    paddingHorizontal: 20,
    zIndex: 10,
  },
  menuButton: {
    padding: 10,
  },
  menuIcon: {
    width: 30,
    height: 30,
    tintColor: '#fff',
  },

  // 🎨 Menú desplegable en la esquina superior derecha
  menuOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  menuContainer: {
    position: 'absolute',
    top: 70,
    right: 10,
    width: 180,
    backgroundColor: '#2b2b2b',
    borderRadius: 10,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  menuSpacing: {
    height: 10, // Espacio superior
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
  },
  menuIconOption: {
    width: 24,
    height: 24,
    tintColor: '#fff',
    marginRight: 10,
  },
  menuText: {
    color: '#fff',
    fontSize: 16,
  },
  menuDivider: {
    height: 1,
    backgroundColor: '#fff',
    marginHorizontal: 15,
    opacity: 0.3,
  },

  // 🎨 Estilos del Tab Navigator
  tabBar: {
    position: 'absolute',
    bottom: 20,
    marginHorizontal: 20,
    backgroundColor: '#fff',
    borderRadius: 25,
    height: 80,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    justifyContent: 'center',
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
  },
  activeIconContainer: {
    backgroundColor: '#00AAFF',
    width: 60,
    height: 60,
    borderRadius: 30,
    position: 'absolute',
    top: -20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 28,
    height: 28,
  },
  activeIcon: {
    tintColor: '#fff',
  },
  inactiveIcon: {
    tintColor: 'gray',
  },
  activeLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#00AAFF',
    marginTop: 10,
  },
});
