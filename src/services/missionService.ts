import axios, { AxiosResponse } from "axios";
import {
  CreateCleaningMissionModel,
  CreateEmptyCarMissionModel,
  CreateTransferMissionModel,
  CreateWarehousingMissionModel,
  IndividualMission,
  Mission,
} from "@/types/BackendModels";
import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseenter = Swal.resumeTimer;
  },
});

const BASE_URL = "https://api.example.com/missions";

export class MissionService {
  // Get paginated missions
  public async getPaginated(
    page: number,
    pageSize: number,
  ): Promise<{ data: Mission[]; total: number }> {
    // API call would be here, returning dummy data for now
    /*
        const response: AxiosResponse = await axios.get(`${BASE_URL}?page=${page}&pageSize=${pageSize}`);
        return response.data;
        */
    return {
      data: [
        {
          Id: "guid-123",
          Type: "Transfer",
          MissionResponsible: "John Doe",
          MissionResponsibleNumber: "+1234567890",
          FromAddress: "123 Start St",
          ToAddress: "456 End Ave",
          City: "Sample City",
          Price: 1500.0,
          ExecuteDateTime: new Date(),
          State: "Active",
          Description: "Sample mission description",
          SellerId: "seller-guid-123",
          BuyerId: "buyer-guid-456",
        },
        {
          Id: "guid-456",
          Type: "Cleaning",
          MissionResponsible: "Jane Smith",
          MissionResponsibleNumber: "+9876543210",
          FromAddress: "789 Main St",
          ToAddress: "321 Side St",
          City: "Example City",
          Price: 800.0,
          ExecuteDateTime: new Date(),
          State: "Pending",
          Description: "Another mission description",
          SellerId: "seller-guid-789",
          BuyerId: "buyer-guid-012",
        },
      ],
      total: 2,
    };
  }
  public async getPaginatedIndividualMission(
    page: number,
    pageSize: number,
  ): Promise<{ data: IndividualMission[]; total: number }> {
    // API call would be here, returning dummy data for now
    /*
        const response: AxiosResponse = await axios.get(`${BASE_URL}?page=${page}&pageSize=${pageSize}`);
        return response.data;
        */
    return {
      data: [
        {
          Id: "guid-123",
          Type: "Transfer",
          MissionResponsible: "John Doe",
          MissionResponsibleNumber: "+1234567890",
          FromAddress: "123 Start St",
          ToAddress: "456 End Ave",
          City: "Sample City",
          ExecuteDateTime: new Date(),
          State: "Active",
          Description: "Sample mission description",
        },
        {
          Id: "guid-456",
          Type: "Cleaning",
          MissionResponsible: "Jane Smith",
          MissionResponsibleNumber: "+9876543210",
          FromAddress: "789 Main St",
          ToAddress: "321 Side St",
          City: "Example City",
          ExecuteDateTime: new Date(),
          State: "Pending",
          Description: "Another mission description",
        },
      ],
      total: 2,
    };
  }
  // Create a new mission
  public async createMission(mission: Omit<Mission, "Id">): Promise<Mission> {
    // API call would be here
    /*
        const response: AxiosResponse = await axios.post(`${BASE_URL}`, mission);
        return response.data;
        */
    Toast.fire({
      icon: "success",
      title: "Mission created successfully",
    });
    return {
      Id: "new-guid-789",
      ...mission,
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
      title: "Mission deleted successfully",
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
      Type: "Transfer",
      MissionResponsible: "John Doe",
      MissionResponsibleNumber: "+1234567890",
      FromAddress: "123 Start St",
      ToAddress: "456 End Ave",
      City: "Sample City",
      Price: 1500.0,
      ExecuteDateTime: new Date(),
      State: "Active",
      Description: "Sample mission description",
      SellerId: "seller-guid-123",
      BuyerId: "buyer-guid-456",
    };
  }

  // Add this method to the MissionService class
  public async createWarehousingMission(
    mission: CreateWarehousingMissionModel,
  ): Promise<Mission> {
    // API call would be here
    /*
    const response: AxiosResponse = await axios.post(`${BASE_URL}/warehousing`, mission);
    return response.data;
    */
    Toast.fire({
      icon: "success",
      title: "Warehousing mission created successfully",
    });
    return {
      Id: "new-guid-789",
      Type: mission.Type,
      MissionResponsible: mission.MissionResponsible,
      MissionResponsibleNumber: mission.MissionResponsibleNumber,
      FromAddress: mission.FromAddress,
      ToAddress: mission.ToAddress,
      City: mission.City,
      Price: mission.Price,
      ExecuteDateTime: mission.ExecuteDateTime,
      State: mission.State,
      Description: mission.Description,
      SellerId: mission.SellerId,
      BuyerId: mission.BuyerId,
    };
  }
  public async createTransferMission(
    mission: CreateTransferMissionModel,
  ): Promise<Mission> {
    Toast.fire({
      icon: "success",
      title: "Transfer mission created successfully",
    });
    return {
      Id: "new-guid-789",
      Type: mission.Type,
      MissionResponsible: mission.MissionResponsible,
      MissionResponsibleNumber: mission.MissionResponsibleNumber,
      FromAddress: mission.FromAddress,
      ToAddress: mission.ToAddress,
      City: mission.City,
      Price: mission.Price,
      ExecuteDateTime: mission.ExecuteDateTime,
      State: mission.State,
      Description: mission.Description,
      SellerId: mission.SellerId,
      BuyerId: mission.BuyerId,
    };
  }
  public async createCleaningMission(
    mission: CreateCleaningMissionModel,
  ): Promise<Mission> {
    Toast.fire({
      icon: "success",
      title: "Cleaning mission created successfully",
    });
    return {
      Id: "new-guid-789",
      Type: mission.Type,
      MissionResponsible: mission.MissionResponsible,
      MissionResponsibleNumber: mission.MissionResponsibleNumber,
      FromAddress: mission.FromAddress,
      ToAddress: mission.ToAddress,
      City: mission.City,
      Price: mission.Price,
      ExecuteDateTime: mission.ExecuteDateTime,
      State: mission.State,
      Description: mission.Description,
      SellerId: mission.SellerId,
      BuyerId: mission.BuyerId,
    };
  }

  public async createEmptyCarMission(
    mission: CreateEmptyCarMissionModel,
  ): Promise<Mission> {
    Toast.fire({
      icon: "success",
      title: "Empty car mission created successfully",
    });
    return {
      Id: "new-guid-789",
      Type: mission.Type,
      MissionResponsible: mission.MissionResponsible,
      MissionResponsibleNumber: mission.MissionResponsibleNumber,
      FromAddress: mission.FromAddress,
      ToAddress: mission.ToAddress,
      City: mission.City,
      Price: mission.Price,
      ExecuteDateTime: mission.ExecuteDateTime,
      State: mission.State,
      Description: mission.Description,
      SellerId: mission.SellerId,
      BuyerId: mission.BuyerId,
    };
  }

  // Convert IndividualMission to normal Mission
  public async convertIndividualMissionToMission(
    individualMission: IndividualMission,
  ): Promise<Mission> {
    const mission: Mission = {
      Id: individualMission.Id,
      Type: individualMission.Type,
      MissionResponsible: individualMission.MissionResponsible,
      MissionResponsibleNumber: individualMission.MissionResponsibleNumber,
      FromAddress: individualMission.FromAddress,
      ToAddress: individualMission.ToAddress,
      City: individualMission.City,
      Price: 0, // Assuming price is not applicable for IndividualMissions
      ExecuteDateTime: individualMission.ExecuteDateTime,
      State: individualMission.State,
      Description: individualMission.Description,
      SellerId: "", // Assuming SellerId is not applicable
      BuyerId: "", // Assuming BuyerId is not applicable
    };

    // Here you would typically call an API to save the mission
    /*
        const response: AxiosResponse = await axios.post(`${BASE_URL}`, mission);
        return response.data;
    */

    Toast.fire({
      icon: "success",
      title: "Individual mission converted to normal mission successfully",
    });

    return mission;
  }

  // Delete IndividualMission by ID
  public async deleteIndividualMission(id: string): Promise<boolean> {
    // API call would be here
    /*
        const response: AxiosResponse = await axios.delete(`${BASE_URL}/individual/${id}`);
        return response.status === 200;
    */

    Toast.fire({
      icon: "success",
      title: "Individual mission deleted successfully",
    });

    return true;
  }
}

// Usage example
const missionService = new MissionService();

// You can now call methods like:
// missionService.getPaginated(1, 10);
// missionService.createMission({...});
// missionService.deleteMission('id');
// missionService.getMissionById('id');
