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

export class SoldMissionsService {
    // Get paginated missions
    public async getPaginated(page: number, pageSize: number): Promise<{ data: Mission[], total: number }> {
        return {
            data: [
                {
                    Id: 'guid-123',
                    Type: 'Transfer',
                    MissionResponsible: 'John Doe',
                    MissionResponsibleNumber: '+1234567890',
                    FromAddress: '123 Start St',
                    ToAddress: '456 End Ave',
                    City: 'Metropolis',
                    Price: 1500.00,
                    ExecuteDateTime: new Date(),
                    State: 'Active',
                    Description: 'Urgent delivery needed',
                    SellerId: 'seller-guid',
                    BuyerId: 'buyer-guid'
                }
            ],
            total: 1
        };
    }

    // Edit mission
    public async editMission(id: string, missionData: Partial<Mission>): Promise<Mission> {
        Toast.fire({
            icon: "success",
            title: "Mission updated successfully"
        });
        return {
            Id: id,
            ...missionData,
            Type: missionData.Type || 'Transfer',
            MissionResponsible: missionData.MissionResponsible || 'John Doe',
            MissionResponsibleNumber: missionData.MissionResponsibleNumber || '',
            FromAddress: missionData.FromAddress || '',
            ToAddress: missionData.ToAddress || '',
            City: missionData.City || '',
            Price: missionData.Price || 0,
            ExecuteDateTime: missionData.ExecuteDateTime || new Date(),
            State: missionData.State || 'Active',
            Description: missionData.Description || '',
            SellerId: missionData.SellerId || '',
            BuyerId: missionData.BuyerId || ''
        };
    }

    // Delete mission
    public async deleteMission(id: string): Promise<boolean> {
        Toast.fire({
            icon: "success",
            title: "Mission deleted successfully"
        });
        return true;
    }

    // Cancel sale
    public async cancelSale(id: string): Promise<Mission> {
        Toast.fire({
            icon: "success",
            title: "Sale cancelled successfully"
        });
        return {
            Id: id,
            State: 'Cancelled',
            Type: 'Transfer',
            MissionResponsible: 'John Doe',
            MissionResponsibleNumber: '+1234567890',
            FromAddress: '123 Start St',
            ToAddress: '456 End Ave',
            City: 'Metropolis',
            Price: 1500.00,
            ExecuteDateTime: new Date(),
            Description: 'Cancelled mission',
            SellerId: 'seller-guid',
            BuyerId: 'buyer-guid'
        };
    }

    // Enter chat (returns chat ID)
    public async enterChat(missionId: string): Promise<string> {
        Toast.fire({
            icon: "success",
            title: "Entered mission chat"
        });
        return `chat-${missionId}`;
    }

    // End mission
    public async endMission(id: string): Promise<Mission> {
        Toast.fire({
            icon: "success",
            title: "Mission ended successfully"
        });
        return {
            Id: id,
            State: 'Completed',
            Type: 'Transfer',
            MissionResponsible: 'John Doe',
            MissionResponsibleNumber: '+1234567890',
            FromAddress: '123 Start St',
            ToAddress: '456 End Ave',
            City: 'Metropolis',
            Price: 1500.00,
            ExecuteDateTime: new Date(),
            Description: 'Completed mission',
            SellerId: 'seller-guid',
            BuyerId: 'buyer-guid'
        };
    }

    // Freeze mission
    public async freezeMission(id: string): Promise<Mission> {
        Toast.fire({
            icon: "success",
            title: "Mission frozen successfully"
        });
        return {
            Id: id,
            State: 'Frozen',
            Type: 'Transfer',
            MissionResponsible: 'John Doe',
            MissionResponsibleNumber: '+1234567890',
            FromAddress: '123 Start St',
            ToAddress: '456 End Ave',
            City: 'Metropolis',
            Price: 1500.00,
            ExecuteDateTime: new Date(),
            Description: 'Frozen mission',
            SellerId: 'seller-guid',
            BuyerId: 'buyer-guid'
        };
    }
}

// Export a singleton instance
export const soldMissionsService = new SoldMissionsService();
