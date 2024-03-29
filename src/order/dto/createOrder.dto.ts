// create-order.dto.ts
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { IsZipCodeLength } from 'src/shared/validators/zip-code.validator';

class PackageDto {
  @IsNumber()
  @IsNotEmpty()
  weight: number;

  @IsNumber()
  @IsNotEmpty()
  height: number;

  @IsNumber()
  @IsNotEmpty()
  width: number;

  @IsNumber()
  @IsNotEmpty()
  length: number;
}

class AddressDto {
  @IsNotEmpty()
  @IsString()
  address: string;
  @IsNotEmpty()
  @IsString()
  city: string;
  @IsNotEmpty()
  @IsString()
  country: string;
  @IsNotEmpty()
  @IsString()
  email: string;
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsZipCodeLength()
  zipcode: string;

  @IsNotEmpty()
  @IsString()
  phonenumber: string;
}
export class CreateOrderDto {
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => PackageDto)
  @IsArray()
  packages: PackageDto[];

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => AddressDto)
  @IsNotEmpty()
  pickup: AddressDto;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => AddressDto)
  @IsNotEmpty()
  dropoff: AddressDto;
}
