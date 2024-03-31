export const calculatePackagePrice = ({
  weight,
  length, 
  width,
  height,
}) : number => {
    const BASE_PRICE = 1 
    const VOLUME_INCREMENT = 5000
    const VOLUME_CHARGE = 0.50
    const WEIGHT_CHARGE =0.10

    const calculatedVolume =  (width * length * height )
    const totalVolumeCharge = Math.floor(calculatedVolume/VOLUME_INCREMENT) * VOLUME_CHARGE
    const totalWeightCharge = weight * WEIGHT_CHARGE

    return BASE_PRICE + totalVolumeCharge + totalWeightCharge
};
