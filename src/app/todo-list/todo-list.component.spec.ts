import { DebugElement } from "@angular/core";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { AppModule } from "../app.module";
import { TODOS } from "../test-data/todo.db";
import { TodoListComponent } from "./todo-list.component"

describe('TodoListComponent', () => {
    let component: TodoListComponent;
    let fixture: ComponentFixture<TodoListComponent>; //accesorio para debugear un componente
    let el: DebugElement; //nos permite recuperar el html de un component, acceder a él, etc

    beforeEach(waitForAsync(() => { //waitForAsync es para que todas las pruebas esperen hasta que se resuelva la promesa
        TestBed.configureTestingModule({
            imports: [AppModule], //en vez de importar TodoListComponent, TodoCardComponent, etc; importamos directamente AppModule
        }).compileComponents() //devuelve una promesa
            .then(() => {
                fixture = TestBed.createComponent(TodoListComponent); //genero un componente
                component = fixture.componentInstance; //le asigno una instancia
                el = fixture.debugElement;
            });
    }));

    //xit no ejecutar la prueba
    //fit ejecutar solo esta prueba
    xit('debería existir el componente', () => {
        expect(component).toBeTruthy();
    });

    it('debería mostrar la lista de tareas', () => {
        //le asignamos las tareas
        component.todos = TODOS;
        fixture.detectChanges(); //forzamos que los cambios se vean reflejados en el html

        //recuperamos todos los elementos que tengan la class card
        const cards = el.queryAll(By.css('.card')); //nos trae todos los elementos que coincidan con el predicado que pongamos

        expect(cards).toBeTruthy('no se pueden recuperar las cards');
        expect(cards.length).toBe(3, 'deberían ser 3 cards');
    })
})