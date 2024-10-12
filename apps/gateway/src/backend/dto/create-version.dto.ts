import { Type } from 'class-transformer';
import { IsString, ValidateNested } from 'class-validator';

export class CreateVersionRequestDto {
  @ValidateNested()
  @Type(() => Detail)
  details!: Detail[];
}

export class Detail {
  @IsString()
  key!: string;

  @IsString()
  value!: string;
}
