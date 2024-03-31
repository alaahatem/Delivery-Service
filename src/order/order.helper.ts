import { pricingConfig } from './pricing.config';
export const calculatePackagePrice = ({
  weight,
  length,
  width,
  height,
}): number => {
  const { BASE_PRICE, VOLUME_INCREMENT, VOLUME_CHARGE, WEIGHT_CHARGE } =
    pricingConfig;

  const calculatedVolume = width * length * height;
  const totalVolumeCharge =
    Math.floor(calculatedVolume / VOLUME_INCREMENT) * VOLUME_CHARGE;
  const totalWeightCharge = weight * WEIGHT_CHARGE;
  return BASE_PRICE + totalVolumeCharge + totalWeightCharge;
};
