import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import {
  EsquemasCantosService,
  TipoEsquemasLiturgicosService,
} from '@app/_services';
@Component({
  selector: 'app-esquemas-cantos',
  templateUrl: './component.html',
})
export class DragAndDrop implements OnInit {
  paises: any = [];
  @Input() receivedParentItem: any;
  @Output() messageToEmit = new EventEmitter<boolean>();

  public ListArraglo: Array<object>;
  public ListArragloWatched: Array<object>;

  constructor(
    private apiServiceEsquemasCantos: EsquemasCantosService,
    private apiService: TipoEsquemasLiturgicosService
  ) {}

  ngOnInit() {
    console.log(this.receivedParentItem);

    this.consultaEsquemasCantos();
    this.ListArragloWatched = this.receivedParentItem.esquemasCantos;
  }

  private consultaEsquemasCantos(): void {
    this.apiServiceEsquemasCantos.consulta().subscribe((data) => {
      var exist = 0;
      var parentArray = [];

      data.jsonResultado.forEach((element) => {
        let idAdd = element._id;
        this.ListArragloWatched.forEach((element: any) => {
          if (idAdd === element._id) {
            exist = 1;
          }
        });
        if (exist == 0) {
          parentArray.push(element);
        }
        exist = 0;
      });
      this.ListArraglo = parentArray;
    });
  }

  sendMessageToParent() {
    //Enviamos mensage a el padre
    this.messageToEmit.emit(false);
  }

  onDrop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      //Se mueve sobre la misma columna
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      //Se mueve en diferentes columna
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  saveNewDate() {
    console.log(this.receivedParentItem);

    //Enviamos mensage a el padre
    console.log(this.ListArraglo);
    console.log(this.ListArragloWatched);

    let arrayEdit = [];

    this.ListArragloWatched.forEach((element:any) => {
        arrayEdit.push(element._id);
    });

    let objSaveEdit = {
      titulo: this.receivedParentItem.titulo,
      esquemasCantos:arrayEdit 
    }

    this.apiService
      .editar(objSaveEdit, this.receivedParentItem._id)
      .subscribe(
        (data) => {
          console.log(data);
          this.sendMessageToParent();
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
