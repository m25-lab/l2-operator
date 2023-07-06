import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator'
import { validationEthAddress } from '@lib/shared/utils'

export function IsEthAddress(
  config?: { required?: boolean; dependency?: string },
  validationOptions?: ValidationOptions,
) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [config?.required ?? false, config?.dependency],
      validator: IsEthAddressConstraint,
    })
  }
}

@ValidatorConstraint({ name: 'IsEthAddress' })
export class IsEthAddressConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const [required, dependency] = args.constraints
    if ((!required && !value) || (dependency && !args.object[dependency])) {
      return true
    }

    if (typeof value !== 'string') {
      return false
    }

    return validationEthAddress(value)
  }

  defaultMessage(args: ValidationArguments) {
    const [required] = args.constraints

    if (required && !args.value) {
      return 'messages.validation.ethAddressRequired'
    }

    return 'messages.validation.ethAddressInvalid'
  }
}
