import { TestBed } from "@angular/core/testing";
import { LoggerService } from "./logger.service"
import { TODOS } from "./test-data/todo.db";
import { TodoService } from "./todo.service"

describe('ToDoService', () => {

    let todoService: TodoService;
    let loggerSpy: any;

    //módulo que se ejecuta antes de las pruebas
    beforeEach(() => {
        loggerSpy = jasmine.createSpyObj('LoggerService', ['log']); //simulo la creacion de un servico

        //manera incorrecta:
        //todoService = new TodoService(loggerSpy);

        //manera correcta de generar una instancia de un servicio
        TestBed.configureTestingModule({
            providers: [
                TodoService,
                { provide: LoggerService, useValue: loggerSpy }
            ]
        });
        todoService = TestBed.inject(TodoService);
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
        todoService.todos = TODOS; //importo un array con info

        todoService.delete(2); //borro la tarea id=2

        expect(todoService.todos.length).toBe(2, 'El numero de tareas debería ser 2'); //compruebo largo del array
        expect(todoService.todos[1].autor).toEqual('Sara'); //ahora en la posicion 2 debería estar el id=3
    })
})