import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator'
import { i18nValidationMessage } from 'nestjs-i18n'
import { validatePhoneNumber } from '@lib/shared/utils'

export function IsVNPhoneNumber(
  config?: { required?: boolean; dependency?: string },
  validationOptions?: ValidationOptions,
) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [config?.required ?? false, config?.dependency],
      validator: IsVNPhoneNumberConstraint,
    })
  }
}

@ValidatorConstraint({ name: 'IsVNPhoneNumber' })
export class IsVNPhoneNumberConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const [required, dependency] = args.constraints
    if ((!required && !value) || (dependency && !args.object[dependency])) {
      return true
    }

    if (typeof value !== 'string') {
      return false
    }

    return validatePhoneNumber(value)
  }

  defaultMessage(args: ValidationArguments) {
    const [required] = args.constraints

    if (required && !args.value) {
      return 'messages.validation.phoneNumberRequired'
    }

    return 'messages.validation.phoneNumberInvalid'
  }
}
