export interface UserDto {
  id: number;
  name: string;
  phoneNumber: string;
  addressId: string;
  emailAddress: string;
  password: string;
  sex: Sex;
  birthday: Date;
}

export enum Sex {
  MALE = 'Male',
  FEMALE = 'Female',
  OTHER = 'Other'
}
