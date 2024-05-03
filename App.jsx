import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import { getDistance } from './src/services/API';


const insertionSort = (inputArr) => {
    let n = inputArr.length;
    for (let i = 1; i < n; i++) {
        let current = inputArr[i];
        let j = i - 1;
        while (j > -1 && current.distance < inputArr[j].distance) {
            inputArr[j + 1] = inputArr[j];
            j--;
        }
        inputArr[j + 1] = current;
    }
    return inputArr;
};


const App = () => {
    const [sortedAddresses, setSortedAddresses] = useState([]);
    const [originAddress, setOriginAddress] = useState('Rua Francisco Toczek 946, Afonso Pena, São José dos Pinhais, PR');

    const destinations = [
        'R. Santa Rita, 710 - Cidade Jardim, São José dos Pinhais - PR, 83035-250',
        'Av. Rocha Pombo - Águas Belas, São José dos Pinhais - PR, 83010-900',
        'Rua Anne Frank, 3944 - Carmo, Curitiba - PR, 81650-020',
        'Rua João Bortolan, 257 - Area Rural, São José dos Pinhais - PR, 83085-460',
        'Alameda Arpo, 1929 - Ouro Fino, São José dos Pinhais - PR, 83010-290',
        'R. William Booth, 265 - Boqueirão, Curitiba - PR, 81650-120',   
        'Av. Pres. Kennedy, 4121 - Portão, Curitiba - PR, 80610-010',
        'R. Konrad Adenauer, 370 - Tarumã, Curitiba - PR, 82821-020',
        'R. Alm. Alexandrino, 1445 - Afonso Pena, São José dos Pinhais - PR, 83040-420',
        'R. Itajubá, 673 - Portão, Curitiba - PR, 81070-190'
    ];

    const handleGetDistances = async () => {
        let req = [];

        for (const d of destinations) {
            const response = await getDistance(originAddress, d);

            req.push({
                address: response[1].destination_addresses[0],
                distance: response[0]
            });

            console.log(req);
        }

        const sortReq = insertionSort(req);
      
        setSortedAddresses(sortReq);
    };


    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Button title="Obter Distâncias" onPress={handleGetDistances} />
            {sortedAddresses.map((address, index) => (
                <View key={index}>
                    <Text>{index} - {address.address}</Text>
                    <Text>{`${address.distance} km`}</Text>
                </View>
            ))}
        </View>
    );
};

export default App;


