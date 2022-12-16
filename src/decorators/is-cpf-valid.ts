import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'cpfValidation', async: false })
export class IsCpfValid implements ValidatorConstraintInterface {
  validate(cpf: string) {
    const regex = /^\d{3}.\d{3}.\d{3}-\d{2}$/;
    return regex.test(cpf);
  }

  defaultMessage() {
    return 'O CPF deve ter um formato válido.';
  }
}
