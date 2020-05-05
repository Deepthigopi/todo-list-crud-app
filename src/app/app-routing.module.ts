import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodoComponent } from './todo/todo.component';
import { TodoAddComponent } from './todo-add/todo-add.component';
import { TodoEditComponent } from './todo-edit/todo-edit.component';


const routes: Routes = [
  { path: '', component: TodoComponent, data: { title: 'List of todos' }},
  { path: 'todo/add', component: TodoAddComponent,  data: { title: 'Add todo' }},
  { path: 'todo/delete', component: TodoEditComponent, data: { title: 'Edit todo' } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
