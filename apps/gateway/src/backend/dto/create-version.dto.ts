import { Type } from 'class-transformer';
import { IsString, ValidateNested } from 'class-validator';

export class CreateVersionRequestDto {
  @IsString()
  product!: string;

  @ValidateNested()
  @Type(() => Details)
  details!: Details[];
}

export class Details {
  @IsString()
  key!: string;

  @IsString()
  value!: string;
}
