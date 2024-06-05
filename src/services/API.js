import axios from "axios";
import {API_MAP_KEY} from '@env'

export const getDistance = async (address, destination) => {
    const baseUrl = 'https://maps.googleapis.com/maps/api/distancematrix/json';

    const params = {
        origins: address,
        destinations: destination,
        mode: 'driving',
        key: API_MAP_KEY
    };

    try {
        
        const response = await axios.get(baseUrl, { params });
        const data = response.data;

        console.log(data.rows[0].elements[0])

        if (data.status === 'OK') {
            const distance = data.rows[0].elements[0].distance.value;
            const duration = data.rows[0].elements[0].duration.value / 60; 

            console.log(duration)

            return {'distancia': distance, 'tempo': duration };

        } else {
            console.log(data.status)
            throw new Error('Erro ao obter a distância');
        }

    } catch (error) {
        console.error(error.message);
    }
    
}