import React from 'react';
import { StyleSheet, Text, TextInput, View, Pressable, Image } from 'react-native';

export default function Login({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={require('./assets/images/waves1.png')} style={styles.image} />
        <Image source={require('./assets/images/logo.png')} style={styles.logo} />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>Inicio de Sesión</Text>

        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          placeholderTextColor="#aaa"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          placeholderTextColor="#aaa"
          secureTextEntry
        />

        {/* <Pressable style={styles.button} onPress={() => console.log('Iniciar sesión')}>
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
        </Pressable> */}
        <Pressable style={styles.button} onPress={() => navigation.replace('MenuNavegacion')}>
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
        </Pressable>

        <Pressable onPress={() => navigation.navigate('Registro')}>
          <Text style={styles.linkText}>¿No tienes una cuenta? Regístrate</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 400,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  logo: {
    position: 'absolute',
    top: 40,
    alignSelf: 'center',
    width: 170,
    height: 170,
    resizeMode: 'contain',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    marginTop: -200,
  },
  title: {
    fontSize: 27,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 70,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 30,
    color: '#333',
  },
  button: {
    backgroundColor: '#2b2b2b',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 25,
    width: '100%',
    alignItems: 'center',
    marginVertical: 10,
    marginTop: 50,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  linkText: {
    color: '#007BFF',
    fontSize: 14,
    marginTop: 10,
  },
});