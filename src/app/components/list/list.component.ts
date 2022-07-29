import { Component, OnInit } from '@angular/core';
import {PokemonService} from "../../service/pokemon.service";
import {PokemonParams} from "../interface/pokemonparams"

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  providers: [PokemonService]
})
export class ListComponent implements OnInit {

  pokemons: PokemonParams[] = [];

  constructor(private service: PokemonService) { }

  ngOnInit(): void {
  }

  listPokemons(value: string): void {
    this.pokemons = [];
    this.service.getPokemonWithAuthorID(value).subscribe(data => {
      data.forEach((element: any) => {
        this.pokemons.push({
          name: element.name,
          ...element
        })
      })
    })
  }

  deletePokemon(id: number): void {
    this.service.deletePokemon(id).subscribe(data => {
      alert("Pokemon eliminado " + data.toString())
    })
  }
}
