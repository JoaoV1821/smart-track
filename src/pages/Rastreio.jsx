import React , {useState} from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Rastreio = () => {
  const [deliverers, setDeliverers] = useState([
    { id: 1, name: 'Entregador 1', lastLocation: 'Localização 1' },
    { id: 2, name: 'Entregador 2', lastLocation: 'Localização 2' },
    { id: 3, name: 'Entregador 3', lastLocation: 'Localização 3' },
]);

const handleShowOnMap = (deliverer) => {
    // Lógica para mostrar no mapa a localização do entregador
    console.log(`Mostrando ${deliverer.name} no mapa na localização ${deliverer.lastLocation}`);
};

return (
    <View style={styles.container}>
        <Text style={styles.title}>Rastrear entregas</Text>
        {deliverers.map((deliverer) => (
            <View key={deliverer.id} style={styles.card}>
                <Text style={styles.cardText}>Entregador: {deliverer.name}</Text>
                <Text style={styles.cardText}>Última localização: {deliverer.lastLocation}</Text>
                <TouchableOpacity style={styles.button} onPress={() => handleShowOnMap(deliverer)}>
                    <Text style={styles.buttonText}>Mostrar no mapa</Text>
                </TouchableOpacity>
            </View>
        ))}
    </View>
);
};

export default Rastreio;

const styles = StyleSheet.create({
container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#fff'
},
title: {
    fontSize: 30,
    color: '#CC5803',
    marginVertical: 20,
    textAlign: 'center'
},
card: {
    width: '100%',
    backgroundColor: '#e8ecef',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center'
},
cardText: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center'
},
button: {
    backgroundColor: '#CC5803',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
},
buttonText: {
    color: '#fff',
    fontSize: 16
}
});