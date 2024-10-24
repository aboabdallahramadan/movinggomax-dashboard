import axios, { AxiosResponse } from 'axios';
import Swal from 'sweetalert2';

export type MissionType = 'Transfer' | 'Cleaning' | 'Warehousing' | 'Emptycar';
export type PriceType = 'Selling' | 'Buying';

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
  }
});

const BASE_URL = 'https://api.example.com/mission-pricing';

export class MissionPricingService {
    // Get all mission pricing
    public async getAllPricing(): Promise<MissionPricing[]> {
        return [
            {
                Id: 'price-123',
                MissionType: 'Transfer',
                PriceType: 'Selling',
                Price: 1500.00
            },
            {
                Id: 'price-456',
                MissionType: 'Cleaning',
                PriceType: 'Buying',
                Price: 800.00
            },
            {
                Id: 'price-789',
                MissionType: 'Warehousing',
                PriceType: 'Selling',
                Price: 2000.00
            },
            {
                Id: 'price-101',
                MissionType: 'Emptycar',
                PriceType: 'Buying',
                Price: 1200.00
            }
        ];
    }

    // Update mission pricing
    public async updatePricing(id:string, missionType: MissionType,priceType: PriceType, price: number): Promise<MissionPricing> {
        Toast.fire({
            icon: "success",
            title: "Mission pricing updated successfully"
        });
        return {
            Id: id,
            MissionType: missionType,
            PriceType: priceType,
            Price: price
        };
    }
}