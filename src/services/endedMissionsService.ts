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

const BASE_URL = 'https://api.example.com/ended-missions';

export class EndedMissionsService {
    // Get paginated ended missions
    public async getPaginated(page: number, pageSize: number): Promise<{ data: Mission[], total: number }> {
        // API call would go here
        return {
            data: [
                {
                    Id: 'guid-123',
                    Type: 'Transfer',
                    MissionResponsible: 'John Doe',
                    MissionResponsibleNumber: '+1234567890',
                    FromAddress: '123 Start St',
                    ToAddress: '456 End Ave',
                    City: 'Example City',
                    Price: 1500.00,
                    ExecuteDateTime: new Date(),
                    State: 'Ended',
                    Description: 'Completed mission example',
                    SellerId: 'seller-guid',
                    BuyerId: 'buyer-guid'
                }
            ],
            total: 1
        };
    }

    // Conversation with publisher
    public async startConversation(missionId: string): Promise<boolean> {
        // API call would go here
        /*
        const response: AxiosResponse = await axios.post(`${BASE_URL}/${missionId}/conversation`);
        return response.status === 200;
        */
        Toast.fire({
            icon: "success",
            title: "Conversation started with publisher"
        });
        return true;
    }

    // Cancel mission ending
    public async cancelEnding(missionId: string): Promise<Mission> {
        // API call would go here
        /*
        const response: AxiosResponse = await axios.patch(`${BASE_URL}/${missionId}/cancel-ending`);
        return response.data;
        */
        Toast.fire({
            icon: "success",
            title: "Mission ending cancelled successfully"
        });
        return {
            Id: missionId,
            Type: 'Transfer',
            MissionResponsible: 'John Doe',
            MissionResponsibleNumber: '+1234567890',
            FromAddress: '123 Start St',
            ToAddress: '456 End Ave',
            City: 'Example City',
            Price: 1500.00,
            ExecuteDateTime: new Date(),
            State: 'Active',
            Description: 'Mission reactivated',
            SellerId: 'seller-guid',
            BuyerId: 'buyer-guid'
        };
    }

    // Delete ended mission
    public async deleteMission(missionId: string): Promise<boolean> {
        // API call would go here
        /*
        const response: AxiosResponse = await axios.delete(`${BASE_URL}/${missionId}`);
        return response.status === 200;
        */
        Toast.fire({
            icon: "success",
            title: "Mission deleted successfully"
        });
        return true;
    }
}

// Usage example:
const endedMissionsService = new EndedMissionsService();

// You can now call methods like:
// endedMissionsService.getPaginated(1, 10);
// endedMissionsService.startConversation('missionId');
// endedMissionsService.cancelEnding('missionId');
// endedMissionsService.deleteMission('missionId');
