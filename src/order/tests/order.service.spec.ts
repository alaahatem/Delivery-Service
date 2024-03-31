import { calculatePackagePrice } from '../order.helper'; // Assuming the function is in order.helper
import { pricingConfig } from '../pricing.config';
import { OrderStateService } from '../order-state.service';
import { OrderStatus } from '../interfaces/enums';

describe('OrderStateService', () => {
  let orderStateService: OrderStateService;

  beforeEach(() => {
    orderStateService = new OrderStateService();
  });

  describe('canTransitionTo', () => {
    it('should return true if transition is allowed', () => {
      expect(orderStateService.canTransitionTo(OrderStatus.CREATED, OrderStatus.PICKED_UP)).toBe(true);
    });

    it('should return true if transition is allowed', () => {
      expect(orderStateService.canTransitionTo(OrderStatus.CREATED, OrderStatus.CANCELLED)).toBe(true);
    });
    it('should return true if transition is allowed', () => {
      expect(orderStateService.canTransitionTo(OrderStatus.PICKED_UP, OrderStatus.DELIVERED)).toBe(true);
    });
    it('should return true if transition is allowed', () => {
      expect(orderStateService.canTransitionTo(OrderStatus.PICKED_UP, OrderStatus.RETURNING)).toBe(true);
    });

    it('should return true if transition is allowed', () => {
      expect(orderStateService.canTransitionTo(OrderStatus.RETURNING, OrderStatus.RETURNED)).toBe(true);
    });

    it('should return false if transition is not allowed', () => {
      expect(orderStateService.canTransitionTo(OrderStatus.CREATED, OrderStatus.DELIVERED)).toBe(false);
    });

    it('should return false if current status is not defined in transitions', () => {
      expect(orderStateService.canTransitionTo('INVALID_STATUS' as OrderStatus, OrderStatus.PICKED_UP)).toBe(false);
    });

    it('should return false if next status is not defined in transitions for current status', () => {
      expect(orderStateService.canTransitionTo(OrderStatus.PICKED_UP, 'INVALID_STATUS' as OrderStatus)).toBe(false);
    });
    it('should return false if transition is not allowed', () => {
      expect(orderStateService.canTransitionTo(OrderStatus.CANCELLED, OrderStatus.CREATED)).toBe(false);
    });
    it('should return false if transition is not allowed', () => {
      expect(orderStateService.canTransitionTo(OrderStatus.DELIVERED, OrderStatus.PICKED_UP)).toBe(false);
    });

  });
});

describe('calculatePackagePrice', () => {
  const { BASE_PRICE, VOLUME_INCREMENT , VOLUME_CHARGE , WEIGHT_CHARGE} = pricingConfig; 

  it('should return base price for a small package', () => {
    const packageInfo = {
      weight: 10,
      length: 10,
      width: 10,
      height: 10,
    };

    const price = calculatePackagePrice(packageInfo);

    expect(price).toBe(2); 
  });


  it('should calculate price with both volume and weight charges', () => {
    const packageInfo = {
      weight: 5,
      length: 20,
      width: 20,
      height: 20,
    };

    const expectedVolumeCharge = Math.floor((20 * 20 * 20) / VOLUME_INCREMENT) * VOLUME_CHARGE;
    const expectedWeightCharge = packageInfo.weight * WEIGHT_CHARGE;
    const expectedPrice = BASE_PRICE + expectedVolumeCharge + expectedWeightCharge;

    const price = calculatePackagePrice(packageInfo);

    expect(price).toBe(expectedPrice);
  });
});
