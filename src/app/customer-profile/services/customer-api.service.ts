import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, throwError } from 'rxjs';
import { customerProfileApiResponseData } from '../models/customer-profile-response';
import { basicDetails } from '../models/basicDetails';

@Injectable({
  providedIn: 'root'
})
export class CustomerApiService {
  propertyManagement = environment.propertyManagement;
  bizProfile = environment.bizprofile;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private httpClient: HttpClient) { }

  imageUpload(file, id, create): Observable<any> {
    // Create form data
    const formData = new FormData();
    // Store form name as "file" with file data
    formData.append("file", file, file.name);
    formData.append("entityId", id);
    //formData.append("entityType", "Pax");
    return this.httpClient.post<any>(`${this.propertyManagement}/${create}`, formData);
  }
  createCreateProfile(data: any, create: string): Observable<customerProfileApiResponseData> {
    return this.httpClient.post<customerProfileApiResponseData>(this.bizProfile + create, JSON.stringify(data), this.httpOptions);
  }
  readCreateProfile(read: string): Observable<customerProfileApiResponseData> {
    return this.httpClient.get<customerProfileApiResponseData>(this.bizProfile + read, this.httpOptions);
  }
  findCreateProfileById(id: number, find: string): Observable<customerProfileApiResponseData> {
    return this.httpClient.get<customerProfileApiResponseData>(this.bizProfile + find + id, this.httpOptions);
  }
  fetchBizBasicDetailsById(id: string): Observable<any> {
    const url = `${this.bizProfile}/fetch-biz-basic-details/${id}`;
    return this.httpClient.get(url);
  }
  updateCreateProfile(data: basicDetails, update: string): Observable<customerProfileApiResponseData> {
    return this.httpClient.put<customerProfileApiResponseData>(this.bizProfile + update, JSON.stringify(data), this.httpOptions);
  }
  updateProfile(id: string, profileData: any): Observable<any> {
    const updateUrl = `${this.bizProfile}/save-update-biz-profile`; // Replace with the actual API endpoint for updating the profile

    // Make the HTTP PUT request to update the profile data
    return this.httpClient.put(updateUrl, profileData);
  }
  saveTab1Data(data: any) {
    // Here, you can define the API endpoint and perform an HTTP POST request with tab1Data
    const bizProfile = `${this.bizProfile}save-update-biz-profile`;
    return this.httpClient.post(bizProfile, data);
  }
  saveTab2Data(data: any) {
    // Here, you can define the API endpoint and perform an HTTP POST request with tab2Data
    const bizProfile =  `${this.bizProfile}biz-additional-details/saveAndUpdateBizAdditionalDetails`;
    return this.httpClient.post(bizProfile, data);
  }

  saveTab3Data(data: any) {
    // Here, you can define the API endpoint and perform an HTTP POST request with tab3Data
    const bizProfile = `${this.bizProfile}save-update-biz-emergency-contact`;
    return this.httpClient.post(bizProfile, data);
  }
  errorHandler(error) {
    let errorMessage = '';
    let errorRes = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
      errorRes = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      errorRes = `${error.error.message} `;
    }
    return throwError(errorRes);
  }
}
