import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap} from 'rxjs/operators';
import { Todo } from './todo';

// can provide backend api in place of "apiUrl", fake api is being used here
const apiUrl = "https://jsonplaceholder.typicode.com/todos";
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  //apiUrl: string = "https://jsonplaceholder.typicode.com/todos";
  constructor(private http: HttpClient) { }
 

  getTodos (): Observable<Todo[]> {
    return this.http.get<Todo[]>(apiUrl, httpOptions)
      .pipe(
        tap(heroes => console.log('fetched todos')),
        catchError(this.handleError('getTodos', []))
      );
  }
   
  getTodo(id: number): Observable<Todo> {
    const url = `${apiUrl}?id=${id}`;
    return this.http.get<Todo>(url).pipe(
      tap(_ => console.log(`fetched todo id=${id}`)),
      catchError(this.handleError<Todo>(`getTodo id=${id}`))
    );
  }
   
  addTodo (todo): Observable<Todo> {
     
    return this.http.post<Todo>(`${apiUrl}/create.php`, todo, httpOptions).pipe(
      tap((todo: Todo) => console.log(`added todo w/ id=${todo.id}`)),
      catchError(this.handleError<Todo>('addTodo'))
    );
  }
   
  updateTodo (id, todo): Observable<any> {
    const url = `${apiUrl}/update.php?id=${id}`;
    return this.http.put(url, todo, httpOptions).pipe(
      tap(_ => console.log(`updated todo id=${id}`)),
      catchError(this.handleError<any>('updateTodo'))
    );
  }
   
  deleteTodo (id): Observable<Todo> {
    const url = `${apiUrl}/delete.php?id=${id}`;
   
    return this.http.delete<Todo>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted todo id=${id}`)),
      catchError(this.handleError<Todo>('deletetodo'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
