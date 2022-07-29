import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateComponent } from './create.component';

describe('CreateComponent', () => {
  let component: CreateComponent;
  let fixture: ComponentFixture<CreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should return invalid Form', () => {

    // Arrange
    
    const mockList = {
      nombre: 'Charmander',
      imagen: 'https://www.pngmart.com/files/13/Charmander-PNG-HD.png',
      ataque: 70,
      defensa: 70,
    }
    const nameForm : any= component.createFrom.get('nombre')
    const imagenForm: any = component.createFrom.get('imagen')
    const attackForm: any = component.createFrom.get('ataque')
    const defensaForm: any = component.createFrom.get('defensa')
    //Act
    
    nameForm.setValue(mockList.nombre)
    imagenForm.setValue(mockList.imagen)
    attackForm.setValue(mockList.imagen)
    defensaForm.setValue(mockList.imagen)
    //Assert
    
        expect(component.createFrom.valid).toEqual(true);
      });
});
