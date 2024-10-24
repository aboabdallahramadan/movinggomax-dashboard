import axios, { AxiosResponse } from "axios";
import { NotificationVwModel, Notification } from "@/types/BackendModels";
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

const BASE_URL = "https://api.example.com/notifications";

export class NotificationsService {
  // Get paginated notifications
  public async getPaginated(
    page: number,
    pageSize: number,
  ): Promise<{ data: NotificationVwModel[]; total: number }> {
    // API call would be here, returning dummy data for now
    return {
      data: [
        {
          Id: "guid-123",
          Content: "New mission assigned",
          Date: new Date(),
          UserId: "user-123",
          MissionId: "mission-123",
          MissionName: "Project Alpha",
        },
        {
          Id: "guid-456",
          Content: "Invoice generated",
          Date: new Date(),
          UserId: "user-456",
          InvoiceId: "invoice-456",
          InvoiceName: "INV-2023-001",
        },
      ],
      total: 2,
    };
  }

  // Get notification details
  public async getNotificationDetails(
    id: string,
  ): Promise<NotificationVwModel> {
    // API call would be here
    return {
      Id: id,
      Content: "Detailed notification content",
      Date: new Date(),
      UserId: "user-123",
      MissionId: "mission-123",
      MissionName: "Project Alpha",
      InvoiceId: "invoice-123",
      InvoiceName: "INV-2023-001",
    };
  }

  // Create and send custom notification
  public async createCustomNotification(notification: {
    content: string;
    userIds: string[];
    missionId?: string;
    invoiceId?: string;
    isGlobal: boolean;
  }): Promise<Notification> {
    // API call would be here
    Toast.fire({
      icon: "success",
      title: "Notification sent successfully",
    });

    return {
      Id: "new-guid-789",
      Content: notification.content,
      IsRead: false,
      Date: new Date(),
      UserId: notification.userIds[0],
      IsGlobal: notification.isGlobal,
      MissionId: notification.missionId,
      InvoiceId: notification.invoiceId,
    };
  }

  // Mark notification as read
  public async markAsRead(id: string): Promise<boolean> {
    // API call would be here
    Toast.fire({
      icon: "success",
      title: "Notification marked as read",
    });
    return true;
  }

  // Delete notification
  public async deleteNotification(id: string): Promise<boolean> {
    // API call would be here
    Toast.fire({
      icon: "success",
      title: "Notification deleted successfully",
    });
    return true;
  }
}

// Export a singleton instance
export const notificationsService = new NotificationsService();
