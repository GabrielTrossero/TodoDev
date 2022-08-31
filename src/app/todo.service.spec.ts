import { TestBed } from "@angular/core/testing";
import { LoggerService } from "./logger.service"
import { TODOS } from "./test-data/todo.db";
import { TodoService } from "./todo.service";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";

describe('ToDoService', () => {

    let todoService: TodoService;
    let loggerSpy: any;
    let httpTestingController: HttpTestingController;

    //módulo que se ejecuta antes de las pruebas
    beforeEach(() => {
        loggerSpy = jasmine.createSpyObj('LoggerService', ['log']); //simulo la creacion de un servico

        //manera incorrecta:
        //todoService = new TodoService(loggerSpy);

        //manera correcta de incluir los servicios a las pruebas
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule], //módulo de pruebas http
            providers: [
                TodoService,
                { provide: LoggerService, useValue: loggerSpy }
            ]
        });
        todoService = TestBed.inject(TodoService);
        httpTestingController = TestBed.inject(HttpTestingController);
    })

    it('debería agregar una nueva tarea', () => {
        todoService.add({ autor: 'PruebaAutor', titulo: 'PruebaTitulo', descripcion: 'PruebaDescripcion' });

        //acá empezamos a realizar las pruebas
        expect(todoService.todos.length).toBe(1, 'Deberíamos tener una única tarea');
        expect(todoService.todos[0].id).toBe(1, 'El id autoincremental debería ser 1');
        expect(todoService.autoIncrementId).toBe(2, 'El autoincremental debería haber subido a 2');
        expect(todoService.todos[0].titulo).toEqual('PruebaTitulo', 'El título debería ser "PruebaTitulo"');

        //para controlar la cantidad de veces que se llama a la funcion logger.log
        expect(loggerSpy.log).toHaveBeenCalledTimes(1);
    });

    it('debería borrar una tarea', () => {
        const todoBorrar = [...TODOS]; //importo un array con info y hago una copia para que no se modifique el original
        todoService.todos = todoBorrar;

        todoService.delete(2); //borro la tarea id=2

        expect(todoService.todos.length).toBe(2, 'El numero de tareas debería ser 2'); //compruebo largo del array
        expect(todoService.todos[1].autor).toEqual('Sara'); //ahora en la posicion 2 debería estar el id=3
    });

    it('debería traer todas las tareas', () => {
        todoService.getAll().subscribe(todos => {
            expect(todos).toBeTruthy('No existen las tareas');
            expect(todos.length).toBe(3, 'La longitud debería ser de 3 tareas');

            const todo = todos.find(item => item.id === 2);
            expect(todo.titulo).toEqual('Compra de mueble', 'El título debe ser el especificado en las pruebas');
        });
        const req = httpTestingController.expectOne('http://localhost:3000/api/todos/all');
        expect(req.request.method).toBe('GET');
        req.flush(TODOS); //definimos todos los datos que va a recibir la llamada de arriba (subscribe)
    });
})