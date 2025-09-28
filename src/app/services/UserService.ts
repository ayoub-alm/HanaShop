import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, Observable} from 'rxjs';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserModelService {
  private apiUrl = 'http://localhost:8080'; // Replace this with your actual API endpoint

  constructor(private http: HttpClient) { }

  // Fetch all UserModels
  getUsers(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(`${this.apiUrl}/Users`).pipe(
      map(users => users.map(user => new UserModel(
        user.id,
        user.name,
        user.phoneNumber,
        user.addressId,
        user.emailAddress,
        user.password,
        user.sex,
        user.birthday
      )))
    );
  }

  // Get UserModel by ID
  getUserModelById(id: number): Observable<UserModel> {
    return this.http.get<UserModel>(`${this.apiUrl}/Users/${id}`).pipe(
      map(user => new UserModel(
        user.id,
        user.name,
        user.phoneNumber,
        user.addressId,
        user.emailAddress,
        user.password,
        user.sex,
        user.birthday)
      )
    )
  }

  // Create a new UserModel
  createUser(userModel: UserModel): Observable<UserModel> {
    return this.http.post<UserModel>(`${this.apiUrl}/Users`, userModel).pipe(
      map(user => new UserModel(
        user.id,
        user.name,
        user.phoneNumber,
        user.addressId,
        user.emailAddress,
        user.password,
        user.sex,
        user.birthday)
      )
    )
  }

  // Update an existing UserModel
  updateUser(userModel: UserModel): Observable<UserModel> {
    return this.http.put<UserModel>(`${this.apiUrl}/UserModels/${userModel.id}`, userModel).pipe(
        map(user => new UserModel(
          user.id,
          user.name,
          user.phoneNumber,
          user.addressId,
          user.emailAddress,
          user.password,
          user.sex,
          user.birthday)
        )
      )
  };


  // Delete a UserModel
  deleteUser(id: number): Observable<UserModel> {
    return this.http.delete<UserModel>(`${this.apiUrl}/UserModels/${id}`).pipe(
      map(user => new UserModel(
        user.id,
        user.name,
        user.phoneNumber,
        user.addressId,
        user.emailAddress,
        user.password,
        user.sex,
        user.birthday)
      ))
  }
}
