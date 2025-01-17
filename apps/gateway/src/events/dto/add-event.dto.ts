import { IsEnum, IsObject, IsOptional, IsString } from 'class-validator';
import { AddEventRequest, EventType } from 'shared';

export class AddEventRequestDto implements AddEventRequest {
  @IsString()
  clientId!: string;

  @IsString()
  testingId!: string;

  @IsString()
  versionId!: string;

  @IsEnum(EventType)
  eventType!: EventType;

  @IsObject()
  @IsOptional()
  payload?: object;
}
