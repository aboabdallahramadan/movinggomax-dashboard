import axios, { AxiosResponse } from 'axios';
import { User } from '@/types/BackendModels';
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

const BASE_URL = 'https://api.example.com/users';

export class UsersService {

    public async getById(userId: string): Promise<User> {
        Toast.fire({
            icon: "success",
            title: "User details loaded successfully"
        });
        return {Id:"ss",UserName:"ss",Email:"ss",PhoneNumber:"ss",IsActive:true};
    }
    // Get paginated users
    public async getPaginated(page: number, pageSize: number): Promise<{ data: User[], total: number }> {
        return {
            data: [
                {
                    Id: 'user-123',
                    UserName: 'john_doe',
                    Email: 'john@example.com',
                    PhoneNumber: '+1234567890',
                    IsActive: true,
                },
                {
                    Id: 'user-456',
                    UserName: 'jane_smith',
                    Email: 'jane@example.com',
                    PhoneNumber: '+1987654321',
                    IsActive: true,
                }
            ],
            total: 2
        };
    }

    // Delete a user
    public async deleteUser(userId: string): Promise<boolean> {
        Toast.fire({
            icon: "success",
            title: "User deleted successfully"
        });
        return true;
    }

    // Pause/Suspend user account
    public async pauseUser(userId: string, isPaused: boolean): Promise<User> {
        Toast.fire({
            icon: "success",
            title: isPaused ? "User account suspended" : "User account activated"
        });
        return {
            Id: userId,
            UserName: 'john_doe',
            Email: 'john@example.com',
            PhoneNumber: '+1234567890',
            IsActive: !isPaused,
        };
    }

    // Reset user password
    public async resetUserPassword(userId: string): Promise<boolean> {
        Toast.fire({
            icon: "success",
            title: "Password reset link sent to user email"
        });
        return true;
    }

    // Send message to user
    public async messageUser(userId: string, message: string): Promise<boolean> {
        Toast.fire({
            icon: "success",
            title: "Message sent successfully"
        });
        return true;
    }

    // Grant free purchases
    public async grantFreePurchases(userId: string, amount: number, expiryDate: Date): Promise<boolean> {
        Toast.fire({
            icon: "success",
            title: `Free purchases worth ${amount} granted to user`
        });
        return true;
    }

    // Get user invoices by date range
    public async getUserInvoices(userId: string, startDate: Date, endDate: Date): Promise<any[]> {
        return [
            {
                invoiceId: 'inv-123',
                amount: 100,
                date: new Date(),
                status: 'paid'
            },
            {
                invoiceId: 'inv-456',
                amount: 200,
                date: new Date(),
                status: 'pending'
            }
        ];
    }
}

const userService = new UsersService();
