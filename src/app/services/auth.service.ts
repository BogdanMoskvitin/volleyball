import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Login, Register } from "../models/auth.model";
import { tap } from 'rxjs/operators';
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private token = null;
    url:string = environment.apiUrl;

    constructor(private http: HttpClient){}

    registration(user: Register): Observable<Register>{
        return this.http.post<Register>(this.url + 'reg/', user);
    }

    login(user: Login): Observable<{access: string}> {
        return this.http.post<{access: string}>(this.url + 'token/jwt/create/', user)
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