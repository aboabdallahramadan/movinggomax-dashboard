import axios, { AxiosResponse } from 'axios';
import { EmptyCarMission } from '@/types/VwModels';
import Swal from 'sweetalert2';

const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseenter = Swal.resumeTimer;
    }
});

const BASE_URL = 'https://api.example.com/emptyCarMissions';

export class EmptyCarMissionService {
    // Get EmptyCarMission by ID
    public async getById(id: string): Promise<EmptyCarMission> {
        // API call would be here
        /*
        const response: AxiosResponse = await axios.get(`${BASE_URL}/${id}`);
        return response.data;
        */
        
        // Returning dummy data for now
        return {
            Id: id,
            Type: 'Standard',
            MissionResponsible: 'John Doe',
            MissionResponsibleNumber: '+1234567890',
            FromAddress: '123 Start Street',
            ToAddress: '456 End Avenue',
            City: 'Metropolis',
            Price: 1500.00,
            ExecuteDateTime: new Date(),
            State: 'Pending',
            Description: 'Transport empty cars from location A to B',
            SellerId: 'seller-guid-123',
            BuyerId: 'buyer-guid-456',
            NumberOfCarsAvailable: 5,
            CarSize: 2,
            IsLocal: true
        };
    }

  
}

