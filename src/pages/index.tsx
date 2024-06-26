// Home.tsx
import React, { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css';
import Menu from '../components/Menu';
import Cards from '../components/Cards';
import Footer from '../components/Footer';

import { fetchAllPokemon, PokemonListItem } from '../services/pokeApi'; 

export default function Home() {
  const [pokemonList, setPokemonList] = useState<PokemonListItem[]>([]);

  useEffect(() => {
    async function fetchInitialPokemon() {
      try {
        const initialPokemon = await fetchAllPokemon();
        setPokemonList(initialPokemon);
      } catch (error) {
        console.error('Error fetching initial Pokémon:', error);
      }
    }

    fetchInitialPokemon();
  }, []);

  const loadMorePokemon = async () => {
    try {
      const additionalPokemon = await fetchAllPokemon(pokemonList.length, 12);
      setPokemonList((prevList) => [...prevList, ...additionalPokemon]);
    } catch (error) {
      console.error('Error fetching more Pokémon:', error);
    }
  };

  return (
    <div>
      <Menu/>
      <section>
        <Cards 
          initialPokemonList={pokemonList} 
          onLoadMore={loadMorePokemon}
        />
      </section>
      <Footer/>

    </div>
  );
}
