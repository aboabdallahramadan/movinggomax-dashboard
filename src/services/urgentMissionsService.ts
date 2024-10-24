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

const BASE_URL = 'https://api.example.com/urgent-missions';

export class UrgentMissionsService {
    // Get paginated urgent missions
    public async getPaginated(page: number, pageSize: number): Promise<{ data: Mission[], total: number }> {
        // API call would be here, returning dummy data for now
        return {
            data: [
                {
                    Id: 'guid-123',
                    Type: 'Urgent',
                    MissionResponsible: 'John Doe',
                    MissionResponsibleNumber: '+1234567890',
                    FromAddress: '123 Start St',
                    ToAddress: '456 End Ave',
                    City: 'Sample City',
                    Price: 1500.00,
                    ExecuteDateTime: new Date(),
                    State: 'Pending',
                    Description: 'Urgent delivery needed',
                    SellerId: 'seller-guid',
                    BuyerId: 'buyer-guid'
                }
            ],
            total: 1
        };
    }

    // Send notification to all users about urgent mission
    public async sendPublicationNotification(missionId: string): Promise<boolean> {
        // API call would be here
        Toast.fire({
            icon: "success",
            title: "Notification sent to all users"
        });
        return true;
    }

    // Start or get conversation for a mission
    public async handleConversation(missionId: string): Promise<{ chatId: string }> {
        // API call would be here
        Toast.fire({
            icon: "success",
            title: "Conversation started successfully"
        });
        return {
            chatId: 'chat-guid-123'
        };
    }

    // Edit urgent mission
    public async editMission(id: string, missionData: Partial<Mission>): Promise<Mission> {
        // API call would be here
        Toast.fire({
            icon: "success",
            title: "Mission updated successfully"
        });
        return {
            Id: id,
            Type: missionData.Type || 'Urgent',
            MissionResponsible: missionData.MissionResponsible || 'Updated Name',
            MissionResponsibleNumber: missionData.MissionResponsibleNumber || '',
            FromAddress: missionData.FromAddress || '',
            ToAddress: missionData.ToAddress || '',
            City: missionData.City || '',
            Price: missionData.Price || 0,
            ExecuteDateTime: missionData.ExecuteDateTime || new Date(),
            State: missionData.State || 'Updated',
            Description: missionData.Description || '',
            SellerId: missionData.SellerId || '',
            BuyerId: missionData.BuyerId || ''
        };
    }

    // Delete urgent mission
    public async deleteMission(id: string): Promise<boolean> {
        // API call would be here
        Toast.fire({
            icon: "success",
            title: "Mission deleted successfully"
        });
        return true;
    }
}

// Usage example
const urgentMissionsService = new UrgentMissionsService();

// You can now call methods like:
// urgentMissionsService.getPaginated(1, 10);
// urgentMissionsService.sendPublicationNotification('missionId');
// urgentMissionsService.handleConversation('missionId');
// urgentMissionsService.editMission('id', { ...missionData });
// urgentMissionsService.deleteMission('id');
