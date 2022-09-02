import { DebugElement } from "@angular/core";
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { AppModule } from "../app.module";
import { HomeComponent } from "./home.component";

describe('HomeComponent', () => {

    let fixture: ComponentFixture<HomeComponent>; //para agregar instancias de este componente
    let component: HomeComponent; //componente que voy a instanciar
    let el: DebugElement; //nos permite recuperar el html de un component, acceder a él, etc

    //para que angular me gestione los componentes
    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [AppModule],
        }).compileComponents()
            .then(() => {
                fixture = TestBed.createComponent(HomeComponent);
                component = fixture.componentInstance;
                el = fixture.debugElement;
            });
    }));

    it('debería exisir el componente', () => {
        expect(component).toBeTruthy();
    });

    fit('debería agregar una nueva tarea', fakeAsync(() => { //fakeAsync es para que angular se encarge de toda la sincronicidad

        //inserto los datos en el form
        setInputValue('.form-control.autor', 'pruebaAutor2');
        setInputValue('.form-control.titulo', 'tituloAutor');
        setInputValue('.form-control.descripcion', 'descripcionAutor');

        //envío la tarea
        const boton = el.query(By.css('.btn.btn-success'));
        boton.nativeElement.click();
        fixture.detectChanges(); //forzar a que se detecten los cambios
        tick(); //esperar el tiempo suficiente para que angular detecte los cambios
    }));

    function setInputValue(selector: string, value: string) {
        fixture.detectChanges();
        tick();

        const inputAutor = el.query(By.css(selector));
        inputAutor.nativeElement.value = value;
        inputAutor.nativeElement.dispatchEvent(new Event('input'));
        tick();
    }

});