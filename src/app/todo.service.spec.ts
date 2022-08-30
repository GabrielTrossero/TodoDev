import { LoggerService } from "./logger.service"
import { TODOS } from "./test-data/todo.db";
import { TodoService } from "./todo.service"

describe('ToDoService', () => {
    it('debería agregar una nueva tarea', () => {
        //creo un objeto y llamo a la funcion log. Lo comentado es de la forma tradicional, y la 3er linea es de una forma independiente. (Por alguna razon no me anda estas pruebas)
        //const logger = new LoggerService();
        //spyOn(logger, 'log');
        const logger = jasmine.createSpyObj('LoggerService', ['log']);

        const todoService = new TodoService(new LoggerService());
        todoService.add({ autor: 'PruebaAutor', titulo: 'PruebaTitulo', descripcion: 'PruebaDescripcion' });

        //acá empezamos a realizar las pruebas
        expect(todoService.todos.length).toBe(1, 'Deberíamos tener una única tarea');
        expect(todoService.todos[0].id).toBe(1, 'El id autoincremental debería ser 1');
        expect(todoService.autoIncrementId).toBe(2, 'El autoincremental debería haber subido a 2');
        expect(todoService.todos[0].titulo).toEqual('PruebaTitulo', 'El título debería ser "PruebaTitulo"');

        //para controlar la cantidad de veces que se llama a la funcion logger.log
        expect(logger.log).toHaveBeenCalledTimes(0);
    });

    it('debería borrar una tarea', () => {
        const logger = jasmine.createSpyObj('LoggerService', ['log']);
        const todoService = new TodoService(logger);

        todoService.todos = TODOS; //importo un array con info

        todoService.delete(2); //borro la tarea id=2

        expect(todoService.todos.length).toBe(2, 'El numero de tareas debería ser 2'); //compruebo largo del array
        expect(todoService.todos[1].autor).toEqual('Sara'); //ahora en la posicion 2 debería estar el id=3
    })
})