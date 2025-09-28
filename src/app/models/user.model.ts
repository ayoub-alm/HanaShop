export class UserModel {
  constructor(
    public id: number,
    public name: string,
    public phoneNumber: string,
    public addressId: string,
    public emailAddress: string,
    public password: string,
    public sex: Sex,
    public birthday: Date
  ) {}
}
export enum Sex {
  MALE = 'Male',
  FEMALE = 'Female',
  OTHER = 'Other'
}
