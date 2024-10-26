import axios, { AxiosResponse } from "axios";
import { Invoice, InvoiceVwModel } from "@/types/BackendModels";
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

const BASE_URL = "https://api.example.com/invoices";

export class InvoiceService {
  public async getPaginatedbyUser(
    currentPage: number,
    pageSize: number,
    id: string,
  ): Promise<{ data: InvoiceVwModel[]; total: number }> {
    return {
      data: [
        {
          Id: "guid-123",
          Amount: 1500.0,
          CreatedDate: new Date(),
          CompanyId: "company-guid-1",
          CompanyName: "Company A",
          MissionName: "Mission X",
        },
        {
          Id: "guid-456",
          Amount: 2500.0,
          CreatedDate: new Date(),
          CompanyId: "company-guid-2",
          CompanyName: "Company B",
          MissionName: "Mission Y",
        },
      ],
      total: 2,
    };
  }
  // Get paginated invoices with company and mission details
  public async getPaginated(
    page: number,
    pageSize: number,
  ): Promise<{ data: InvoiceVwModel[]; total: number }> {
    return {
      data: [
        {
          Id: "guid-123",
          Amount: 1500.0,
          CreatedDate: new Date(),
          CompanyId: "company-guid-1",
          CompanyName: "Company A",
          MissionName: "Mission X",
        },
        {
          Id: "guid-456",
          Amount: 2500.0,
          CreatedDate: new Date(),
          CompanyId: "company-guid-2",
          CompanyName: "Company B",
          MissionName: "Mission Y",
        },
      ],
      total: 2,
    };
  }

  // Create new invoice
  public async createInvoice(
    invoice: Omit<Invoice, "Id" | "CreatedDate">,
  ): Promise<Invoice> {
    Toast.fire({
      icon: "success",
      title: "Invoice created successfully",
    });
    return {
      Id: "new-guid",
      CreatedDate: new Date(),
      ...invoice,
    };
  }

  // Edit existing invoice
  public async editInvoice(
    id: string,
    invoice: Partial<Invoice>,
  ): Promise<Invoice> {
    Toast.fire({
      icon: "success",
      title: "Invoice updated successfully",
    });
    return {
      Id: id,
      Amount: invoice.Amount || 0,
      CreatedDate: invoice.CreatedDate || new Date(),
      CompanyId: invoice.CompanyId || "",
      MissionId: invoice.MissionId || "",
    };
  }

  // Delete invoice
  public async deleteInvoice(id: string): Promise<boolean> {
    Toast.fire({
      icon: "success",
      title: "Invoice deleted successfully",
    });
    return true;
  }

  // Send invoice (email/notification)
  public async sendInvoice(id: string): Promise<boolean> {
    Toast.fire({
      icon: "success",
      title: "Invoice sent successfully",
    });
    return true;
  }
}

// Create instance
const invoiceService = new InvoiceService();

// Usage examples:
// invoiceService.getPaginated(1, 10);
// invoiceService.createInvoice({Amount: 1000, CompanyId: 'company-id', MissionId: 'mission-id'});
// invoiceService.editInvoice('invoice-id', {Amount: 1500});
// invoiceService.deleteInvoice('invoice-id');
// invoiceService.sendInvoice('invoice-id');
