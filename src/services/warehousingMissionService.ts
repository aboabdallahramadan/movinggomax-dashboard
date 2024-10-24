import axios, { AxiosResponse } from 'axios';
import { WarehousingMission } from '@/types/VwModels';
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

const BASE_URL = 'https://api.example.com/warehousingMissions';

export class WarehousingMissionService {
    public async getById(id: string): Promise<WarehousingMission> {
        return {
            Id: id,
            Type: 'Warehousing',
            MissionResponsible: 'Jane Smith',
            MissionResponsibleNumber: '+1234567890',
            FromAddress: '789 Storage Lane',
            ToAddress: '101 Warehouse Blvd',
            City: 'Metropolis',
            Price: 2500.00,
            ExecuteDateTime: new Date(),
            State: 'Pending',
            Description: 'Store items in warehouse facility',
            SellerId: 'seller-guid-789',
            BuyerId: 'buyer-guid-012',
            StorageDuration: 30,
            AreaInCubicMeter: 100.5
        };
    }
}
