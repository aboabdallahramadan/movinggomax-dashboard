import axios, { AxiosResponse } from 'axios';
import { CleaningMission } from '@/types/VwModels';
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

const BASE_URL = 'https://api.example.com/cleaningMissions';

export class CleaningMissionService {
    public async getById(id: string): Promise<CleaningMission> {
        return {
            Id: id,
            Type: 'Cleaning',
            MissionResponsible: 'Mary Johnson',
            MissionResponsibleNumber: '+1234567890',
            FromAddress: '321 Clean Street',
            ToAddress: '654 Spotless Ave',
            City: 'Metropolis',
            Price: 800.00,
            ExecuteDateTime: new Date(),
            State: 'Pending',
            Description: 'Deep cleaning of apartment',
            SellerId: 'seller-guid-345',
            BuyerId: 'buyer-guid-678',
            IsHaveBalcony: true,
            ApartmentType: 'Studio'
        };
    }

}
