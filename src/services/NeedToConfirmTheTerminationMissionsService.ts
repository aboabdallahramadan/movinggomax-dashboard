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

const BASE_URL = 'https://api.example.com/termination-missions';

export class NeedToConfirmTheTerminationMissionsService {
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
                    City: 'Sample City',
                    Price: 1000,
                    ExecuteDateTime: new Date(),
                    State: 'Pending Termination',
                    Description: 'Mission needs termination confirmation',
                    SellerId: 'seller-guid',
                    BuyerId: 'buyer-guid'
                }
            ],
            total: 1
        };
    }

    // Confirm the termination of a mission
    public async confirmTermination(missionId: string): Promise<Mission> {
        Toast.fire({
            icon: "success",
            title: "Mission termination confirmed"
        });
        return {
            Id: missionId,
            Type: 'Transfer',
            State: 'Terminated',
            // ... other required fields
        } as Mission;
    }

    // Reject the termination request
    public async rejectTermination(missionId: string, reason: string): Promise<Mission> {
        Toast.fire({
            icon: "success",
            title: "Termination request rejected"
        });
        return {
            Id: missionId,
            Type: 'Transfer',
            State: 'Active',
            // ... other required fields
        } as Mission;
    }

    // Enter conversation for a mission
    public async enterConversation(missionId: string): Promise<{ chatUrl: string }> {
        Toast.fire({
            icon: "success",
            title: "Entering mission conversation"
        });
        return {
            chatUrl: `/chat/${missionId}`
        };
    }

    // Edit mission details
    public async editMission(missionId: string, updatedMission: Partial<Mission>): Promise<Mission> {
        Toast.fire({
            icon: "success",
            title: "Mission updated successfully"
        });
        return {
            Id: missionId,
            ...updatedMission,
            // ... other required fields
        } as Mission;
    }

    // Delete mission
    public async deleteMission(missionId: string): Promise<boolean> {
        Toast.fire({
            icon: "success",
            title: "Mission deleted successfully"
        });
        return true;
    }
}

// Create service instance
const terminationService = new NeedToConfirmTheTerminationMissionsService();

// Usage examples:
// terminationService.getPaginated(1, 10);
// terminationService.confirmTermination('missionId');
// terminationService.rejectTermination('missionId', 'rejection reason');
// terminationService.enterConversation('missionId');
// terminationService.editMission('missionId', { ...updatedFields });
// terminationService.deleteMission('missionId');
