import axios, { AxiosResponse } from 'axios';
import { JobApplicationForm } from '@/types/BackendModels';
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

const BASE_URL = 'https://api.example.com/job-applications';

export class JobApplicationFormService {
    // Get paginated job applications
    public async getPaginated(page: number, pageSize: number): Promise<{ data: JobApplicationForm[], total: number }> {
        // API call would be here, returning dummy data for now
        return {
            data: [
                {
                    Id: "ja123456",
                    name: "John Smith",
                    email: "john.smith@example.com",
                    address: "123 Main St, City",
                    academicAchievement: "Bachelor's in Computer Science",
                    courses: "Web Development, Cloud Computing",
                    experienceCertificates: "AWS Certified, Google Cloud",
                    typeOfWork: "Full-time",
                    skills: "React, TypeScript, Node.js",
                    previousCompanies: "Tech Corp, Innovation Inc",
                    cv: "path/to/cv.pdf",
                    nationality: "American",
                    maritalStatus: "Single",
                    gender: "Male"
                },
                {
                    Id: "ja789012",
                    name: "Sarah Johnson",
                    email: "sarah.j@example.com",
                    address: "456 Oak Ave, Town",
                    academicAchievement: "Master's in Business",
                    courses: "Project Management, Leadership",
                    experienceCertificates: "PMP, Scrum Master",
                    typeOfWork: "Part-time",
                    skills: "Project Management, Team Leadership",
                    previousCompanies: "Business Solutions Ltd",
                    cv: "path/to/cv2.pdf",
                    nationality: "Canadian",
                    maritalStatus: "Married",
                    gender: "Female"
                }
            ],
            total: 2
        };
    }

    // Delete a job application by ID
    public async deleteById(id: string): Promise<boolean> {
        // API call would be here
        Toast.fire({
            icon: "success",
            title: "Job application deleted successfully"
        });
        return true;
    }
}

// Create instance
const jobApplicationFormService = new JobApplicationFormService();

export default jobApplicationFormService;
