import axios, { AxiosResponse } from "axios";
import Swal from "sweetalert2";

export type MissionType = "Transfer" | "Cleaning" | "Warehousing" | "Emptycar";
export type PriceType = "Selling" | "Buying";

interface MissionPricing {
  Id: string;
  MissionType: MissionType;
  PriceType: PriceType;
  Price: number;
}

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

const BASE_URL = "https://api.example.com/mission-pricing";

export class MissionPricingService {
  // Get all mission pricing
  public async getAllPricing(): Promise<MissionPricing[]> {
    return [
      {
        Id: "price-1283",
        MissionType: "Transfer",
        PriceType: "Selling",
        Price: 1500.0,
      },
      {
        Id: "price-1233",
        MissionType: "Transfer",
        PriceType: "Buying",
        Price: 3500.0,
      },
      
      {
        Id: "price-4565",
        MissionType: "Cleaning",
        PriceType: "Selling",
        Price: 200.0,
      },
      {
        Id: "price-4568",
        MissionType: "Cleaning",
        PriceType: "Buying",
        Price: 800.0,
      },
      
     {
        Id: "price-7289",
        MissionType: "Warehousing",
        PriceType: "Selling",
        Price: 2000.0,
      }, {
        Id: "price-789",
        MissionType: "Warehousing",
        PriceType: "Buying",
        Price: 1000.0,
      },{
        Id: "price-1501",
        MissionType: "Emptycar",
        PriceType: "Selling",
        Price: 1400.0,
      },
      {
        Id: "price-1701",
        MissionType: "Emptycar",
        PriceType: "Buying",
        Price: 1200.0,
      },
      
    ];
  }

  // Update mission pricing
  public async updatePricing(
    id: string,
    missionType: MissionType,
    priceType: PriceType,
    price: number,
  ): Promise<MissionPricing> {
    Toast.fire({
      icon: "success",
      title: "Mission pricing updated successfully",
    });
    return {
      Id: id,
      MissionType: missionType,
      PriceType: priceType,
      Price: price,
    };
  }
}
