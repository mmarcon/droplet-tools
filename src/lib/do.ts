export const DO_REGIONS = 'https://api.digitalocean.com/v2/regions';
export const DO_SIZES = 'https://api.digitalocean.com/v2/sizes?per_page=150';
export type Region = {
  slug: string;
  name: string;
  description: string;
  available: boolean;
  features: string[];
  sizes: string[];
};

export type Size = {
  description: string;
  slug: string;
  memory: number;
  vcpus: number;
  disk: number;
  transfer: number;
  price_monthly: number;
  price_hourly: number;
};

export type Droplet = {
  name: string;
  region: string;
  size: string;
  image: string;
  user_data: string;
  tags: string[];
};