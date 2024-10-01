import { ClassConstructor } from 'class-transformer';
import { registerDecorator, ValidationOptions } from 'class-validator';

import { MatchConstraint } from './validatos.constraint';

export const MatchesWithProperty = <T>(
  type: ClassConstructor<T>,
  property: (o: T) => unknown,
  validationOptions?: ValidationOptions
) => {
  return (object: unknown, propertyName: string) => {
    registerDecorator({
      target: (object as object).constructor,
      propertyName,
      options: validationOptions,
      constraints: [property],
      validator: MatchConstraint,
    });
  };
};
