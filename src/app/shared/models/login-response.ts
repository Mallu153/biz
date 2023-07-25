export class LoginResponse {
  access_token: string;
  expires_in: number;
  refresh_expires_in: number;
  refresh_token: string;
  token_type: string;
  session_state: string;
  scope: string;
  userId: number;
  fullName: string;
  email: string;
  phoneNo: string;
  customerId: number;
  customer: string;
  orgId: number;
  organization: string;
  roleKeys: string[];
  permissionKeys: any[];
  userType: string[];
  empId: string;
  empName: string;
}
export class UserResponse {
  userId: number;
  userName: string;
  empId: string;
  empName: string;
  email: string;
  phoneNo: string;
  customerId: number;
  customerName: string;
  organizationId: number;
  organizationName: string;
  roleKeys: string[];
  permissionKeys: string[];
}

export class RefreshTokenResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
  session_state: string;
  scope: string;
}

export const TOKEN_TYPE = {
  token: "token",
  tokenType: "refreshToken"
}
