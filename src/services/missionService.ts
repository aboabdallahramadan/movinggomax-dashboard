import axios, { AxiosResponse } from 'axios';
import { Mission } from '@/types/BackendModels';
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

const BASE_URL = 'https://api.example.com/missions';

export class MissionService {
    // Get paginated missions
    public async getPaginated(page: number, pageSize: number): Promise<{ data: Mission[], total: number }> {
        // API call would be here, returning dummy data for now
        /*
        const response: AxiosResponse = await axios.get(`${BASE_URL}?page=${page}&pageSize=${pageSize}`);
        return response.data;
        */
        return {
            data: [
                {
                    Id: 'guid-123',
                    Type: 'Transfer',
                    MissionResponsible: 'John Doe',
                    MissionResponsibleNumber: '+1234567890',
                    FromAddress: '123 Start St',
                    ToAddress: '456 End Ave',
                    City: 'Sample City',
                    Price: 1500.00,
                    ExecuteDateTime: new Date(),
                    State: 'Active',
                    Description: 'Sample mission description',
                    SellerId: 'seller-guid-123',
                    BuyerId: 'buyer-guid-456'
                },
                {
                    Id: 'guid-456',
                    Type: 'Cleaning',
                    MissionResponsible: 'Jane Smith',
                    MissionResponsibleNumber: '+9876543210',
                    FromAddress: '789 Main St',
                    ToAddress: '321 Side St',
                    City: 'Example City',
                    Price: 800.00,
                    ExecuteDateTime: new Date(),
                    State: 'Pending',
                    Description: 'Another mission description',
                    SellerId: 'seller-guid-789',
                    BuyerId: 'buyer-guid-012'
                }
            ],
            total: 2
        };
    }

    // Create a new mission
    public async createMission(mission: Omit<Mission, 'Id'>): Promise<Mission> {
        // API call would be here
        /*
        const response: AxiosResponse = await axios.post(`${BASE_URL}`, mission);
        return response.data;
        */
        Toast.fire({
            icon: "success",
            title: "Mission created successfully"
        });
        return {
            Id: 'new-guid-789',
            ...mission
        };
    }

    // Delete a mission by ID
    public async deleteMission(id: string): Promise<boolean> {
        // API call would be here
        /*
        const response: AxiosResponse = await axios.delete(`${BASE_URL}/${id}`);
        return response.status === 200;
        */
        Toast.fire({
            icon: "success",
            title: "Mission deleted successfully"
        });
        return true;
    }

    // Get mission by ID
    public async getMissionById(id: string): Promise<Mission | null> {
        // API call would be here
        /*
        const response: AxiosResponse = await axios.get(`${BASE_URL}/${id}`);
        return response.data;
        */
        return {
            Id: id,
            Type: 'Transfer',
            MissionResponsible: 'John Doe',
            MissionResponsibleNumber: '+1234567890',
            FromAddress: '123 Start St',
            ToAddress: '456 End Ave',
            City: 'Sample City',
            Price: 1500.00,
            ExecuteDateTime: new Date(),
            State: 'Active',
            Description: 'Sample mission description',
            SellerId: 'seller-guid-123',
            BuyerId: 'buyer-guid-456'
        };
    }
}

// Usage example
const missionService = new MissionService();

// You can now call methods like:
// missionService.getPaginated(1, 10);
// missionService.createMission({...});
// missionService.deleteMission('id');
// missionService.getMissionById('id');
