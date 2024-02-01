import { MathService } from '@/Domain/Service/MathService';

export class ProductService {
  static getStepFromQuantity(quantity: number, splittable = true): number{
    if(typeof quantity !== 'number' || quantity < 0){
      throw new Error('wrong input');
    }

    if(MathService.hasDecimal(quantity)){
      return MathService.round2(this.getStepFromQuantity(quantity*10)/10);
    } else if(MathService.isMultipleOfTen(quantity)){
      return MathService.round2(this.getStepFromQuantity(quantity/10)*10);
    } else {
      return 1;
    }
  }
}