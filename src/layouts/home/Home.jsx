import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import './home.css'
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch-dom';

const searchClient = algoliasearch('ARWCM8CU9O', 'b6b398b5999aa9effe5153513bcf2f92');

const Search = () => (
  <InstantSearch searchClient={searchClient} indexName="demo_ecommerce">
    <SearchBox showLoadingIndicator 
               translations={{
                    placeholder: 'Search from 400,000+ products'
                    }}
                    />
  </InstantSearch>
);


export default function Home() {
  return (
    <div>
        <Navbar/>
        <div className='hero text-center mt-5 d-flex flex-column align-items-center'>
          <Search/>
          <h5>Reliability and passion for warmhearted engagement made us what we are today</h5>
          <h1>One of the leading suppliers <br/> in the cruiseline industry</h1>
        </div>
    </div>
  )
}
