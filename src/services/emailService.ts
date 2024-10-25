import axios, { AxiosResponse } from 'axios';
import { Email } from '@/types/BackendModels';
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

const BASE_URL = 'https://api.example.com/emails';

export class EmailService {
    // Get paginated emails
    public async getPaginated(page: number, pageSize: number): Promise<{ data: Email[], total: number }> {
        // API call would be here, returning dummy data for now
        /*
        const response: AxiosResponse = await axios.get(`${BASE_URL}?page=${page}&pageSize=${pageSize}`);
        return response.data;
        */
        return {
            data: [
                {
                    Id:"ds13as2d1",
                    firstName: 'John',
                    lastName: 'Doe',
                    phoneNumber: '+1234567890',
                    email: 'john@example.com',
                    location: 'New York',
                    message: 'Sample message 1'
                },
                {
                    Id:"ds13as2d1",
                    firstName: 'Jane',
                    lastName: 'Smith',
                    phoneNumber: '+0987654321',
                    email: 'jane@example.com',
                    location: 'Los Angeles',
                    message: 'Sample message 2'
                }
            ],
            total: 2
        };
    }

    // Delete an email by ID
    public async deleteById(id: string): Promise<boolean> {
        // API call would be here
        /*
        const response: AxiosResponse = await axios.delete(`${BASE_URL}/${id}`);
        return response.status === 200;
        */
        Toast.fire({
            icon: "success",
            title: "Email deleted successfully"
        });
        return true;
    }
    public async getById(id: string): Promise<Email> {
        // API call would be here
        /*
        const response: AxiosResponse = await axios.delete(`${BASE_URL}/${id}`);
        return response.status === 200;
        */
        Toast.fire({
            icon: "success",
            title: "Email deleted successfully"
        });
        const exampleEmail: Email = {
            Id: "123e4567-e89b-12d3-a456-426614174000", // Example GUID
            firstName: "John",
            lastName: "Doe",
            phoneNumber: "+1234567890",
            email: "john.doe@example.com",
            location: "New York, NY",
            message: "Hello! I would like to inquire about your services."
        };
        return exampleEmail;
    }
}

// Create instance
const emailService = new EmailService();

// Usage example:
// emailService.getPaginated(1, 10);
// emailService.deleteById('id');
