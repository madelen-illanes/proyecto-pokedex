import { TestBed } from '@angular/core/testing';
import { PokemonService } from './pokemon.service';
import { environment } from 'src/environments/environment';
import { PokemonParams } from '../components/interface/pokemonparams';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('PokemonService', () => {
  let service: PokemonService;
  const valueID = "90"
  const httpController = TestBed.inject(HttpTestingController);
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
   
    service = TestBed.inject(PokemonService);
  });

  
  it('should be created Pokemn', () => {
    expect(service).toBeTruthy();
  });
  it('should be create a new Pokemon', () => {

    const mockBody = {
      id: 20,
      name: 'string',
      image: 'string',
      attack: 20,
      defense: 20 ,
      hp: 20,
      type: 'string',
      idAuthor: 90

    }

    const mockResponse = {
      success: false,
      type: "name_missing",
      data: "The name is missing"
    }
    
    service.createPokemon(mockBody)
      .subscribe()
    let url = "https://bp-pokemons.herokuapp.com/?idAuthor=" + valueID
    let req = httpController.expectOne(url)
    let request = req.request
    
    expect(
      request.method
    ).toBe('POST')
    req.flush(mockResponse)
  })
});
