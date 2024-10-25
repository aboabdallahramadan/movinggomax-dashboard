import { AccountRequest } from '@/types/BackendModels';
import axios, { AxiosResponse } from 'axios';
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


export class AccountRequestsService {
  public async getPaginated(
    page: number,
    pageSize: number,
  ): Promise<{ data: AccountRequest[]; total: number }> {
    return {
      data: [
        {
          Id: "req-123",
          UserName: "john.smith",
          Email: "john.smith@company.com",
          PhoneNumber: "+1234567890",
          CompanyName: "Smith Industries",
          RequestDate: new Date(),
          Status: "Pending"
        },
        {
          Id: "req-456",
          UserName: "sarah.jones",
          Email: "sarah.jones@enterprise.com",
          PhoneNumber: "+9876543210",
          CompanyName: "Enterprise Solutions",
          RequestDate: new Date(),
          Status: "Pending"
        }
      ],
      total: 2
    };
  }

  public async approveRequest(id: string): Promise<boolean> {
    Toast.fire({
      icon: "success",
      title: "Account request approved successfully"
    });
    return true;
  }

  public async rejectRequest(id: string): Promise<boolean> {
    Toast.fire({
      icon: "success",
      title: "Account request rejected"
    });
    return true;
  }

  public async sendEmail(id: string, message: string): Promise<boolean> {
    Toast.fire({
      icon: "success",
      title: "Email sent successfully"
    });
    return true;
  }
}

export const accountRequestsService = new AccountRequestsService();
