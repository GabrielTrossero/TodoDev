import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { AppModule } from "../app.module";
import { TodoListComponent } from "./todo-list.component"

describe('TodoListComponent', () => {
    let component: TodoListComponent;
    let fixture: ComponentFixture<TodoListComponent>; //accesorio para debugear un componente

    beforeEach(waitForAsync(() => { //waitForAsync es para que todas las pruebas esperen hasta que se resuelva la promesa
        TestBed.configureTestingModule({
            imports: [AppModule], //en vez de importar TodoListComponent, TodoCardComponent, etc; importamos directamente AppModule
        }).compileComponents() //devuelve una promesa
            .then(() => {
                fixture = TestBed.createComponent(TodoListComponent); //genero un componente
                component = fixture.componentInstance; //le asigno una instancia
            });
    }));

    it('debería existir el componente', () => {
        expect(component).toBeTruthy();
    });
})