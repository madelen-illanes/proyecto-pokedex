import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {PokemonParams} from "../components/create/create.component";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private http: HttpClient) {
  }

  valueID = "90"

  createPokemon(request: PokemonParams): Observable<any>{
    return this.http
      .post(
        "https://bp-pokemons.herokuapp.com/?idAuthor=" + this.valueID,
        JSON.stringify(request),
        httpHeaders)
  }

  getPokemonWithAuthorID(value: string): Observable<any> {
    return this.http
      .get(
        "https://bp-pokemons.herokuapp.com/7?idAuthor=" + value)
  }

  deletePokemon(id: number): Observable<any> {
    return this.http.delete(
      "https://bp-pokemons.herokuapp.com/" + id
    )
  }

  getPokemonWithID(value: string): Observable<any> {
    return this.http
      .get(
        "https://bp-pokemons.herokuapp.com/" + value)
  }

  updatePokemon(request: PokemonParams, id: string): Observable<any> {
    request.idAuthor = Number(this.valueID)
    return this.http
      .put(
        "https://bp-pokemons.herokuapp.com/" + id,
        JSON.stringify(request),
        httpHeaders)
  }
}

const httpHeaders = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};
