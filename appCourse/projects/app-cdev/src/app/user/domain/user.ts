export interface UserEssentials {
  name: string;
  lastname: string;
  email: string;
  password: string;
  roles: { roleId: string }[];
}

export interface UserOptionals {
  userId: string;
  image: string;
}

export type UserProperties = UserEssentials & Partial<UserOptionals>;

export class User {
  private readonly userId: string | undefined;
  private name: string;
  private lastname: string;
  private email: string;
  private image: string | undefined;
  private password: string;
  private roles: { roleId: string }[];

  constructor(props: UserProperties) {
    Object.assign(this, props);
  }

  get properties() {
    return {
      name: this.name,
      lastname: this.lastname,
      email: this.email,
      image: this.image,
      password: this.password,
      roles: this.roles,
      userId: this.userId,
    };
  }
}
