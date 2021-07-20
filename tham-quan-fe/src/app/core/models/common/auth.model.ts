export interface AuthModel {
  avatar: string;
  token: string;
  expired: number;
  roles: string[];
  fullName: string;
}

export class UserGoogle {
  name: string;
  photoUrl: string;
  email: string;
  constructor(name: string, photoUrl: string, email: string) {
    this.name = name;
    this.photoUrl = photoUrl;
    this.email = email;
  }
}

export class LoginFormModel {
  username: string;
  password: string;
}
