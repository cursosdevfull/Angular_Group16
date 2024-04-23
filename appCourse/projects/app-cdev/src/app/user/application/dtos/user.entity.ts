export class UserEntity {
  userId: string;
  name: string;
  lastname: string;
  email: string;
  image: string | undefined;
  password: string;
  roles: { roleId: string }[];
}
