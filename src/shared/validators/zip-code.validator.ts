import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export const IsZipCodeLength = (validationOptions?: ValidationOptions) => {
  return (object: Object, propertyName: string) => {
    registerDecorator({
      name: 'isZipCodeLength',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return (
            value &&
            typeof value === 'string' &&
            value.replace(/\s/g, '').length === 6
          );
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be 6 characters long (excluding spaces)`;
        },
      },
    });
  };
};
