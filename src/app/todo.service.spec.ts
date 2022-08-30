import { LoggerService } from "./logger.service"
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
})