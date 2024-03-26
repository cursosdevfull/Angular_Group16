import { Observable } from 'rxjs';

import { Auth } from '../auth';

export interface AuthRepository {
  create(auth: Auth): Observable<any>;
}
