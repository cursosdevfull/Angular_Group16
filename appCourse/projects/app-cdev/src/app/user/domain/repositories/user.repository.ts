import { Observable } from 'rxjs';

import { UserAPIPageDto } from '../../application/dtos/user-page.dto';
import { User } from '../user';

export interface UserRepository {
  create(user: User): Observable<any>;
  update(user: User): Observable<any>;
  delete(userId: string): Observable<any>;
  get(userId: string): Observable<any>;
  getAll(): Observable<any>;
  getByPage(page: number, pageSize: number): Observable<UserAPIPageDto>;
}
