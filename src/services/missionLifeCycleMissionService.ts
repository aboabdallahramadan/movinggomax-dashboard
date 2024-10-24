import axios, { AxiosResponse } from 'axios';
import { MissionLifeCycleMission } from '@/types/VwModels';
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

const BASE_URL = 'https://api.example.com/missionLifeCycleMissions';

export class MissionLifeCycleMissionService {
    // Get MissionLifeCycleMission by ID
    public async getById(id: string): Promise<MissionLifeCycleMission> {
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
            State: 'Active',
            Description: 'Mission lifecycle tracking',
            SellerId: 'seller-guid-123',
            BuyerId: 'buyer-guid-456',
            Status: 'In Progress',
            StatusChangeDateTime: new Date(),
            MissionId: 'mission-guid-789'
        };
    }

}
