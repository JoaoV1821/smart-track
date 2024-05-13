import React, { useState } from 'react';
import { View, Button, Text, TouchableOpacity, Share } from 'react-native';
import { getDistance } from './src/services/API';

const App = () => {
    const [addresses, setAddresses] = useState([]);
    const [originAddress, setOriginAddress] = useState('Rua Francisco Toczek 946, Afonso Pena, São José dos Pinhais, PR');

    const addressMap = {
        'Casa': originAddress,
        'Endereço 1': 'R. Santa Rita, 710 - Cidade Jardim, São José dos Pinhais - PR, 83035-250',
        'Endereço 2': 'Av. Rocha Pombo - Águas Belas, São José dos Pinhais - PR, 83010-900',
        'Endereço 3': 'Rua Anne Frank, 3944 - Carmo, Curitiba - PR, 81650-020',
        'Endereço 4': 'Rua João Bortolan, 257 - Area Rural, São José dos Pinhais - PR, 83085-460',
        'Endereço 5': 'Alameda Arpo, 1929 - Ouro Fino, São José dos Pinhais - PR, 83010-290',
        'Endereço 6': 'R. William Booth, 265 - Boqueirão, Curitiba - PR, 81650-120',
        'Endereço 7': 'Av. Pres. Kennedy, 4121 - Portão, Curitiba - PR, 80610-010',
        'Endereço 8': 'R. Konrad Adenauer, 370 - Tarumã, Curitiba - PR, 82821-020',
        'Endereço 9': 'R. Alm. Alexandrino, 1445 - Afonso Pena, São José dos Pinhais - PR, 83040-420',
        'Endereço 10': 'R. Itajubá, 673 - Portão, Curitiba - PR, 81070-190'
    };

    async function calcularDistancia(enderecoOrigem, enderecoDestino) {
        try {
            const request = await getDistance(enderecoOrigem, enderecoDestino);
            return request;

        } catch (error) {
            console.log(error.message);
        }
    }

    async function findPath() {
        let enderecoAtual = addressMap['Casa'];
        const path = [];
        const enderecos = Object.keys(addressMap).filter(key => key !== 'Casa');
    
        while (enderecos.length > 0) {
            const promises = enderecos.map(async enderecoKey => {
                const distancia = await calcularDistancia(enderecoAtual, addressMap[enderecoKey]);
                return { endereco: enderecoKey, distancia };
            });
    
            const distancias = await Promise.all(promises);
            distancias.sort((a, b) => a.distancia - b.distancia);
            console.log(`${addressMap[distancias[0].endereco]} - Distância: ${distancias[0].distancia} metros`);
    
            path.push({ "endereco": addressMap[distancias[0].endereco], "nome": distancias[0].endereco, 'distancia': distancias[0].distancia })
            enderecoAtual = addressMap[distancias[0].endereco];
    
            enderecos.splice(enderecos.indexOf(distancias[0].endereco), 1);
        }
        console.log('Todos os endereços foram processados.');
        setAddresses(path);
    }
    
    const shareOptions = {
        title: 'Title',
        message: `${addresses.map((add) => `${addresses.indexOf(add) + 1} - ${add.nome}-${add.endereco}`)}\n`,
        subject: 'Subject'
    };

    const onSharePress = () => Share.share(shareOptions);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Button title="Obter Distâncias" onPress={findPath} />

            {addresses.length !== 0 ? addresses.map((add, index) => {
                return (
                    <View key={index}>
                        <Text>{index + 1} - {add.nome}</Text>
                    </View>
                )
            }) : <Text>Endereços</Text>}

            <TouchableOpacity onPress={onSharePress}>
                <Text>Compartilhar</Text>
            </TouchableOpacity>
        </View>
    );
};

export default App;
