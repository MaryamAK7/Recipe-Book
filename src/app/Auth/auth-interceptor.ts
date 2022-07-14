import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, map, Observable, take } from "rxjs";
import { AuthService } from "./authService.service";
import * as fromApp from '../store/app.reducer';
import { Store } from "@ngrx/store";

@Injectable()
export class AuthInterService implements HttpInterceptor {
    constructor(private authService:AuthService, private store: Store<fromApp.AppState>){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // this.authService.user.pipe();
        this.store.select('auth').pipe(take(1),map(state => state.user), exhaustMap((user) => {
            if(!user){
                return next.handle(req)
            }
            const modifiedReq = req.clone({params : new HttpParams().set('auth',user.token)});
            return next.handle(modifiedReq);

        }));

        return next.handle(req);
    }

}