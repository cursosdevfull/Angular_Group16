export class Auth {
  private name: string;
  private lastname: string;
  private email: string;
  private password: string;
  private roles: any[];

  constructor(
    name: string,
    lastname: string,
    email: string,
    password: string,
    roles: any[]
  ) {
    this.name = name;
    this.lastname = lastname;
    this.email = email;
    this.password = password;
    this.roles = roles;
  }

  get properties() {
    return {
      name: this.name,
      lastname: this.lastname,
      email: this.email,
      password: this.password,
      roles: this.roles,
    };
  }
}
