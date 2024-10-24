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

const BASE_URL = 'https://api.example.com/unsold-missions';

export class UnsoldMissionsService {
    // Get paginated unsold missions
    public async getPaginated(page: number, pageSize: number): Promise<{ data: Mission[], total: number }> {
        /*
        const response: AxiosResponse = await axios.get(`${BASE_URL}?page=${page}&pageSize=${pageSize}`);
        return response.data;
        */
        return {
            data: [
                {
                    Id: 'mission-123',
                    Type: 'Transfer',
                    MissionResponsible: 'John Doe',
                    MissionResponsibleNumber: '+1234567890',
                    FromAddress: '123 Start St',
                    ToAddress: '456 End Ave',
                    City: 'New York',
                    Price: 1500.00,
                    ExecuteDateTime: new Date(),
                    State: 'Available',
                    Description: 'Furniture transfer mission',
                    SellerId: 'seller-123',
                    BuyerId: ''
                }
            ],
            total: 1
        };
    }

    // Purchase mission by ID
    public async purchaseMission(missionId: string, buyerId: string): Promise<Mission> {
        /*
        const response: AxiosResponse = await axios.post(`${BASE_URL}/${missionId}/purchase`, { buyerId });
        return response.data;
        */
        Toast.fire({
            icon: "success",
            title: "Mission purchased successfully"
        });
        return {
            Id: missionId,
            Type: 'Transfer',
            MissionResponsible: 'John Doe',
            MissionResponsibleNumber: '+1234567890',
            FromAddress: '123 Start St',
            ToAddress: '456 End Ave',
            City: 'New York',
            Price: 1500.00,
            ExecuteDateTime: new Date(),
            State: 'Purchased',
            Description: 'Furniture transfer mission',
            SellerId: 'seller-123',
            BuyerId: buyerId
        };
    }

    // Delete mission by ID
    public async deleteMission(id: string): Promise<boolean> {
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

    // Edit mission
    public async editMission(id: string, missionData: Partial<Mission>): Promise<Mission> {
        /*
        const response: AxiosResponse = await axios.put(`${BASE_URL}/${id}`, missionData);
        return response.data;
        */
        Toast.fire({
            icon: "success",
            title: "Mission updated successfully"
        });
        return {
            Id: id,
            Type: missionData.Type || 'Transfer',
            MissionResponsible: missionData.MissionResponsible || 'John Doe',
            MissionResponsibleNumber: missionData.MissionResponsibleNumber || '+1234567890',
            FromAddress: missionData.FromAddress || '123 Start St',
            ToAddress: missionData.ToAddress || '456 End Ave',
            City: missionData.City || 'New York',
            Price: missionData.Price || 1500.00,
            ExecuteDateTime: missionData.ExecuteDateTime || new Date(),
            State: missionData.State || 'Available',
            Description: missionData.Description || 'Updated mission',
            SellerId: missionData.SellerId || 'seller-123',
            BuyerId: missionData.BuyerId || ''
        };
    }

    // Get publisher conversation
    public async getPublisherConversation(missionId: string): Promise<{ messages: string[] }> {
        /*
        const response: AxiosResponse = await axios.get(`${BASE_URL}/${missionId}/conversation`);
        return response.data;
        */
        return {
            messages: [
                'Initial inquiry about the mission',
                'Discussion about pricing',
                'Clarification of requirements'
            ]
        };
    }
}

export const unsoldMissionsService = new UnsoldMissionsService();