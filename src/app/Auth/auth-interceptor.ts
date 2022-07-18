import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, map, Observable, take } from "rxjs";
import { AuthService } from "./authService.service";

@Injectable()
export class AuthInterService implements HttpInterceptor {
    constructor(private authService:AuthService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.authService.user.pipe(take(1),map((user) => {
            if(!user){
                return next.handle(req)
            }
            const modifiedReq = req.clone({params : new HttpParams().set('auth',user.token)});
            return next.handle(modifiedReq);

        }));

        return next.handle(req);
    }

}