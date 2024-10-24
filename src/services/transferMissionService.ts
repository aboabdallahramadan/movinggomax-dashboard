import axios, { AxiosResponse } from 'axios';
import { TransferMission } from '@/types/VwModels';
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

const BASE_URL = 'https://api.example.com/transferMissions';

export class TransferMissionService {
    public async getById(id: string): Promise<TransferMission> {
        return {
            Id: id,
            Type: 'Transfer',
            MissionResponsible: 'John Smith',
            MissionResponsibleNumber: '+1234567890',
            FromAddress: '123 Moving Street',
            ToAddress: '456 New Home Ave',
            City: 'Metropolis',
            Price: 1200.00,
            ExecuteDateTime: new Date(),
            State: 'Pending',
            Description: 'Apartment moving service',
            SellerId: 'seller-guid-123',
            BuyerId: 'buyer-guid-456',
            ApartmentType: '2-Bedroom',
            ApartmentArea: '80m²',
            IsElevatorAvailable: true,
            IsWrapping: true,
            FromAddressFloor: '3',
            ToAddressFloor: '5'
        };
    }
}
