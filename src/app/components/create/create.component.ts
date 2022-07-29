import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PokemonService} from "../../service/pokemon.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [PokemonService]
})
export class CreateComponent implements OnInit {
  createFrom: FormGroup;
  submitted = false;
  id: string | null;
  title = 'Nuevo Pokémon';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: PokemonService,
    private aRoute: ActivatedRoute
  ) {
    this.createFrom = this.fb.group({
      nombre: ['', Validators.required],
      imagen: ['', Validators.required],
      ataque: ['', Validators.required],
      defensa: ['', Validators.required]
    })

    this.id = this.aRoute.snapshot.paramMap.get('id')
  }

  ngOnInit(): void {
    this.isEditing()
  }

  createPokemon(): void {
    const request: PokemonParams = {
      id: 0,
      name: this.createFrom.value.nombre,
      image: this.createFrom.value.imagen,
      attack: this.createFrom.value.ataque,
      defense: this.createFrom.value.defensa,
      hp: 0,
      type: "some type",
      idAuthor: Number(this.service.valueID),
    }
    this.service.createPokemon(request).subscribe(data => {
      console.log(data)
      this.router.navigate(['/list']).then(r => {})
    })
  }

  createEditPokemon(): void {
    this.submitted = true;
    if (this.createFrom.invalid) {
      return;
    }
    if (this.id === null) {
      this.createPokemon()
    } else {
      this.editPokemon(this.id)
    }
  }

  editPokemon(id: string) : void {
    const request: PokemonParams = {
      id: 0,
      name: this.createFrom.value.nombre,
      image: this.createFrom.value.imagen,
      attack: this.createFrom.value.ataque,
      defense: this.createFrom.value.defensa,
      hp: 0,
      type: "some type",
      idAuthor: 90
    }
    this.service.updatePokemon(request, id).subscribe(data => {
      alert("Updated object" + data)
      this.router.navigate(['/list']).then(r => {})
    })
  }

  isEditing() {
    if (this.id !== null) {
      this.title = 'Editar Pokémon'
      this.service.getPokemonWithID(this.id).subscribe(data => {
        console.log(data)
        this.createFrom.setValue({
          nombre: data.name,
          imagen: data.image,
          ataque: data.attack,
          defensa: data.defense
        })
      })
    }
  }
}

export interface PokemonParams {
  id: number,
  name: string,
  image: string,
  attack: number,
  defense: number,
  hp: number,
  type: string,
  idAuthor: number
}
