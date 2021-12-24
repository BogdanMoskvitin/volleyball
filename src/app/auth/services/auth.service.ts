import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../models/auth.model";
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private token = null;
    url:string = 'https://api.dev.freeteamcollaboration.ru/auth/jwt/create/';
    urlReg:string = 'https://api.dev.freeteamcollaboration.ru/auth/users/';

    constructor(private http: HttpClient){}

    registration(user: User): Observable<User>{
        return this.http.post<User>(this.urlReg, user);
    }

    login(user: User): Observable<{access: string}> {
        return this.http.post<{access: string}>(this.url, user)
            .pipe(
                tap(
                    ({access}) => {
                        localStorage.setItem('auth-token', 'Bearer ' + access);
                        this.setToken(access);
                    }
                )
            )
    }

    setToken(token: string) {
        this.token = token;
    }

    getToken(): string{
        return this.token;
    }

    isAuthenticated(): boolean {
        return !!this.token;
    }

    logout() {
        this.setToken(null);
        localStorage.clear();
    }
}