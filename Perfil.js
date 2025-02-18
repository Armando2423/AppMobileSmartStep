import React, { useState } from 'react';
import { 
  View, Text, StyleSheet, Image, TextInput, 
  TouchableOpacity, ScrollView, StatusBar
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const icons = {
  user: require('./assets/icons/icon_user.png'),
  name: require('./assets/icons/icon_name.png'),
  age: require('./assets/icons/icon_age.png'),
  weight: require('./assets/icons/icon_weight.png'),
  height: require('./assets/icons/icon_height.png'),
};

export default function Perfil() {
  const [editable, setEditable] = useState(false);

  const toggleEdit = () => setEditable(true);
  const saveChanges = () => setEditable(false);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2b2b2b" />

      {/* Sección superior */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mi información</Text>
        <Image source={icons.user} style={styles.profileIcon} />
        {!editable && (
          <TouchableOpacity onPress={toggleEdit} style={styles.editButton}>
            <MaterialIcons name="edit" size={20} color="#0077CC" />
            <Text style={styles.editText}>Editar perfil</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Sección inferior con los campos */}
      <ScrollView style={styles.profileDetails}>
        {renderField('Nombre', icons.name, editable)}
        {renderField('Edad', icons.age, editable)}
        {renderField('Peso', icons.weight, editable)}
        {renderField('Estatura', icons.height, editable)}

        {/* Botón Guardar (se muestra solo cuando está en modo edición) */}
        {editable && (
          <TouchableOpacity style={styles.saveButton} onPress={saveChanges}>
            <Text style={styles.saveButtonText}>Guardar</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
}

// Función para renderizar cada campo de perfil
const renderField = (placeholder, icon, editable) => (
  <View style={styles.fieldContainer} key={placeholder}>
    <Image source={icon} style={styles.fieldIcon} />
    <TextInput 
      style={styles.fieldInput} 
      placeholder={placeholder} 
      placeholderTextColor="#999" 
      editable={editable} 
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAEAEA',
    paddingHorizontal: 20,
    paddingTop: 80,
    paddingBottom: 100,
  },
  
  // 🎨 Estilos de la sección superior
  header: {
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
    elevation: 3,
    marginBottom: 20,
  },
  profileIcon: {
    width: 90,
    height: 90,
    marginVertical: 10,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#B3E5FC',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 25,
    marginTop: 10,
  },
  editText: {
    color: '#0077CC',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 5,
  },

  // 🎨 Estilos de los campos de perfil
  profileDetails: {
    backgroundColor: '#fff',
    padding: 20,
    elevation: 3,
    marginBottom: 20,
  },
  fieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 8,
  },
  fieldIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
    tintColor: '#666',
  },
  fieldInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    paddingVertical: 5,
  },

  // 🎨 Estilos del botón "Guardar"
  saveButton: {
    backgroundColor: '#59bd73',
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 10,
    marginHorizontal: 50,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
