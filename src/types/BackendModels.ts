// types.ts

// Utilities
type GUID = string;
type DateTime = string | Date;
export type Decimal = number;

// Model: Advertisements
export interface Advertisement {
  Id: GUID;
  Title: string;
  Description: string;
  ImageUrl: string;
  StartDate: DateTime;
  EndDate: DateTime;
  IsActive: boolean;
}

// Model: AspNetUsers
export interface User {
  Id: GUID;
  UserName?: string;
  Email?: string;
  PhoneNumber?: string;
  IsActive: boolean;
}

// Model: ChatParticipants
export interface ChatParticipant {
  Id: GUID;
  ChatId: GUID;
  UserId: GUID;
  IsAdmin: boolean;
  JoinedAt: DateTime;
  LeftAt?: DateTime;
}

// Model: Chats
export interface Chat {
  Id: GUID;
  IsSupportChat: boolean;
  MissionId?: GUID;
}

// Model: Cleanings
export interface Cleaning {
  Id: GUID;
  IsHaveBalcony: boolean;
  ApartmentType: string;
}

// Model: Companies
export interface Company {
  Id: GUID;
  ActiveonCode?: string;
  NameOfResponsiblePerson: string;
  CompanyAddress: string;
  CompanyType: number;
  LogoPic?: string;
  LicensingPdf?: string;
  InsurancePdf?: string;
  IsAgreeToTerms: boolean;
  IsActiveNow: boolean;
  LastSeen?: DateTime;
  IsApproval: boolean;
  ApprovalDateTime?: DateTime;
  Wallet: Decimal;
  ApiClientId?: GUID;
}

// Model: EmptyCars
export interface EmptyCar {
  Id: GUID;
  NumberOfCarsAvailable: number;
  CarSize: number;
  IsLocal: boolean;
}

// Model: Invoices
export interface Invoice {
  Id: GUID;
  Amount: Decimal;
  CreatedDate: DateTime;
  CompanyId: GUID;
  MissionId: GUID;
}
export interface InvoiceVwModel {
  Id: GUID;
  Amount: Decimal;
  CreatedDate: DateTime;
  CompanyId: GUID;
  CompanyName: string;
  MissionName: string;
}

// Model: Messages
export interface Message {
  Id: GUID;
  Content: string;
  SentAt: DateTime;
  SenderId: GUID;
  ChatId: GUID;
}

// Model: MissionLifeCycles
export interface MissionLifeCycle {
  Id: GUID;
  Status: string;
  StatusChangeDateTime: DateTime;
  MissionId: GUID;
}

// Model: Missions
export interface Mission {
  Id: GUID;
  Type: string;
  MissionResponsible: string;
  MissionResponsibleNumber: string;
  FromAddress: string;
  ToAddress: string;
  City: string;
  Price: Decimal;
  ExecuteDateTime: DateTime;
  State: string;
  Description: string;
  SellerId: GUID;
  BuyerId: GUID;
}

// Model: Notifications
export interface Notification {
  Id: GUID;
  Content: string;
  IsRead: boolean;
  Date: DateTime;
  UserId?: GUID;
  IsGlobal: boolean;
  MissionId?: GUID;
  InvoiceId?: GUID;
}
export interface NotificationVwModel {
  Id: GUID;
  Content: string;
  Date: DateTime;
  UserId?: GUID;
  MissionId?: GUID;
  MissionName?: string;
  InvoiceId?: GUID;
  InvoiceName?: string;
}
// Model: Payments
export interface Payment {
  Id: GUID;
  Amount: Decimal;
  PaymentDate: DateTime;
  CompanyId: GUID;
  InvoiceId: GUID;
}

// Model: Transfers
export interface Transfer {
  Id: GUID;
  ApartmentType: string;
  ApartmentArea: string;
  IsElevatorAvailable: boolean;
  IsWrapping: boolean;
  FromAddressFloor: string;
  ToAddressFloor: string;
}

// Model: Warehousings
export interface Warehousing {
  Id: GUID;
  StorageDuration: number;
  AreaInCubicMeter: Decimal;
}

export interface Email {
  Id: GUID;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  location: string;
  message: string;
}

export interface JobApplicationForm {
  Id: GUID;
  name: string;
  email: string;
  address: string;
  academicAchievement: string;
  courses: string;
  experienceCertificates: string;
  typeOfWork: string;
  skills: string;
  previousCompanies: string;
  cv: string;
  nationality: string;
  maritalStatus: "Single" | "Married";
  gender: "Male" | "Female";
}


export interface CreateWarehousingMissionModel {
    Type: string;
    MissionResponsible: string;
    MissionResponsibleNumber: string;
    FromAddress: string;
    ToAddress: string;
    City: string;
    Price: Decimal;
    ExecuteDateTime: DateTime;
    State: string;
    Description: string;
    SellerId: GUID;
    BuyerId: GUID;
  StorageDuration: number;
  AreaInCubicMeter: Decimal;
}
// Model: Warehousings
export interface CreateTransferMissionModel {
  Type: string;
  MissionResponsible: string;
  MissionResponsibleNumber: string;
  FromAddress: string;
  ToAddress: string;
  City: string;
  Price: Decimal;
  ExecuteDateTime: DateTime;
  State: string;
  Description: string;
  SellerId: GUID;
  BuyerId: GUID;
  ApartmentType: string;
  ApartmentArea: string;
  IsElevatorAvailable: boolean;
  IsWrapping: boolean;
  FromAddressFloor: string;
  ToAddressFloor: string;
}
export interface CreateCleaningMissionModel {
  Type: string;
  MissionResponsible: string;
  MissionResponsibleNumber: string;
  FromAddress: string;
  ToAddress: string;
  City: string;
  Price: Decimal;
  ExecuteDateTime: DateTime;
  State: string;
  Description: string;
  SellerId: GUID;
  BuyerId: GUID;
  IsHaveBalcony: boolean;
  ApartmentType: string;
}
export interface CreateEmptyCarMissionModel {
  Type: string;
  MissionResponsible: string;
  MissionResponsibleNumber: string;
  FromAddress: string;
  ToAddress: string;
  City: string;
  Price: Decimal;
  ExecuteDateTime: DateTime;
  State: string;
  Description: string;
  SellerId: GUID;
  BuyerId: GUID;
  NumberOfCarsAvailable: number;
  CarSize: number;
  IsLocal: boolean;
}