import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Image, Share } from 'react-native';
import { getDistance } from '../services/API';

const Entrega = () => {
    const [addresses, setAddresses] = useState([]);
    const [inputAddress, setInputAddress] = useState('');
    const [estimatedTime, setEstimatedTime] = useState('');
    const [totalDistance, setTotalDistance] = useState(0);
    const [path, setPath] = useState([]);
    const [originAddress] = useState('Av. Cel. Francisco H. dos Santos, 354, Curitiba');
    const [showResults, setShowResults] = useState(false);

    const handleAddAddress = () => {
        if (inputAddress) {
            setAddresses([...addresses, inputAddress]);
            setInputAddress('');
        }
    };

    const handleRemoveAddress = (index) => {
        const newAddresses = [...addresses];
        newAddresses.splice(index, 1);
        setAddresses(newAddresses);
    };

    const calcularDistancia = async (enderecoOrigem, enderecoDestino) => {
        try {
            const request = await getDistance(enderecoOrigem, enderecoDestino);
            return request;
        } catch (error) {
            console.log(error.message);
        }
    };

    const formatTime = (totalMinutes) => {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours}h ${parseInt(minutes)}min`;
    };

    const formatDistance = (totalMeters) => {
        const kilometers = Math.floor(totalMeters);
        return `${parseInt(kilometers / 1000)} km ${Math.floor(totalMeters) % 1000} m`;
    }; 

    const shareOptions = {
        title: 'Title',
        message: `${path.map((add) => `${path.indexOf(add) + 1} - ${add.endereco}`)}\n`,
        subject: 'Subject'
    };

    const onSharePress = () => Share.share(shareOptions);

    const findPath = useCallback(async () => {
        let enderecoAtual = originAddress;
        let remainingEnderecos = [...addresses];
        let km = 0;
        let time = 0;
        const path = [];

        while (remainingEnderecos.length > 0) {
            const distancias = await Promise.all(
                remainingEnderecos.map(async (endereco) => {
                    const distancia = await calcularDistancia(enderecoAtual, endereco);
                    return { endereco, distancia };
                })
            );

            distancias.sort((a, b) => a.distancia.distancia - b.distancia.distancia);
            km += distancias[0].distancia.distancia;
            time += distancias[0].distancia.tempo;

            path.push({ endereco: distancias[0].endereco, distancia: distancias[0].distancia.distancia });
            enderecoAtual = distancias[0].endereco;

            remainingEnderecos = remainingEnderecos.filter(endereco => endereco !== enderecoAtual);
        }

        setTotalDistance(formatDistance(km));
        setEstimatedTime(formatTime(time));
        setPath(path);
        setShowResults(true);

    }, [addresses, originAddress]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Nova Entrega</Text>

            {!showResults ? (
                <>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Digite um nome ou endereço"
                            value={inputAddress}
                            onChangeText={setInputAddress}
                        />

                        <TouchableOpacity onPress={handleAddAddress}>
                            <Image source={require('../../assets/add.png')} style={{width: 50, height: 50}} />
                        </TouchableOpacity>
                            
                    </View>

                    <ScrollView style={styles.addressList}>
                        {addresses.length !== 0 ? (
                            addresses.map((address, index) => (
                                <View key={index} style={styles.addressItem}>
                                    <Text style={{fontSize: 25}}>{address}</Text>
                                    <TouchableOpacity onPress={() => handleRemoveAddress(index)}>
                                        <Image source={require('../../assets/remove.png')}/>
                                    </TouchableOpacity>
                                </View>
                            ))
                        ) : (
                            <Text style={{ left: 30, fontSize: 25, marginTop: 80 }}>Nenhum endereço adicionado</Text>
                        )}

                    </ScrollView>
                    
                    <TouchableOpacity style={styles.routeButton} onPress={findPath}>
                        <Text style={styles.routeButtonText}>Gerar rota</Text>
                    </TouchableOpacity>
                </>

            ) : (

                <View style={styles.resultContainer}>

                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: 390 }}>
                        <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <Text style={styles.resultTitle}>Distância total</Text>
                            <Text style={styles.result}>{totalDistance}</Text>
                        </View>

                        <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <Text style={styles.resultTitle}>Tempo Estimado</Text>
                            <Text style={styles.result}>{estimatedTime}</Text>
                        </View>
                    </View>

                    <ScrollView style={styles.addressList}>
                        {path.map((address, index) => (
                            <Text key={index} style={styles.resultAddress}>{index + 1}º - {address.endereco}</Text>
                        ))}
                    </ScrollView>

                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: 360, top: 100 }}>

                        <TouchableOpacity style={styles.editButton} onPress={() => setShowResults(false)}>
                            <Text style={styles.editButtonText}>Editar destinos</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.saveButton} onPress={onSharePress}>
                            <Text style={styles.saveButtonText}>Salvar e enviar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}

        </View> 
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        top: 90,
        alignItems: 'center',
    },

    title: {
        fontSize: 45,
        color: '#CC5803',
        right: 50,
        marginBottom: 30,
    },

    resultTitle: {
        color: '#CC5803',
        fontSize: 18
    },

    result: {
        fontWeight: 'bold',
        color: '#CC5803',
        fontSize: 35,
    },

    inputContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },

    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 20,
        flex: 1,
    },

    addButton: {
        backgroundColor: '#CC5803',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 15,
        borderRadius: 20,
    },

    addButtonText: {
        color: '#fff',
        fontSize: 18,
    },

    addressList: {
        width: '100%',
        maxHeight: 300,
        top: 70,
        marginBottom: 20,
    },

    addressItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },

    removeButton: {
        color: 'red',
    },

    routeButton: {
        backgroundColor: '#CC5803',
        padding: 15,
        alignItems: 'center',
        borderRadius: 20,
        width: 200,
        top: 120
    },

    routeButtonText: {
        color: '#fff',
        fontSize: 30,
    },

    resultContainer: {
        alignItems: 'center',
        marginTop: 20,
    },

    resultAddress: {
        paddingVertical: 5,
        fontSize:25
    },

    editButton: {
        backgroundColor: '#ccc',
        padding: 10,
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 10,
        width: 170,
        height: 50
    },

    editButtonText: {
        color: '#000',
        fontSize: 20,
    },

    saveButton: {
        backgroundColor: '#CC5803',
        padding: 10,
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 10,
        width: 170,
        height: 50
        
    },

    saveButtonText: {
        color: '#fff',
        fontSize: 20,
    },
});

export default Entrega;
