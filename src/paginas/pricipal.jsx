import React, { useState, useEffect  } from 'react';
import './css.css';




function API() {
    return fetch('https://restcountries.com/v2/all')
      .then(response => response.json())
      .then(data => data)
      .catch(() => {
        console.error('Erro ao buscar dados da API');
        return [];
      });
  }





function base() {
    let [dadosNorma, normalUseState] = useState([])
    let [dadosFav, favUseState] = useState([])


    useEffect(() => {
        API().then(data => {
            normalUseState(data);
        });
      }, []);
    




    function Auxpais(is, id) {
        if (is) {
            favUseState([...dadosFav, dadosNorma[id]])
            normalUseState(dadosNorma.filter((a, b) => b != id))
        }
        else {
            normalUseState([...dadosNorma, dadosFav[id]])
            favUseState(dadosFav.filter((a, b) => b != id))
        }
    }

    let valorNormal = () =>
        {
            let valorAux = 0
            dadosNorma.forEach(a =>
                valorAux += a.population
            )
            return valorAux
        }

        let valorFav = () =>
            {
                let valorAux = 0
                dadosFav.forEach(a =>
                    valorAux += a.population
                )
                return valorAux
            }
    

 

    let carregarPaises = () => {
        
        let auxPnorm = dadosNorma
        auxPnorm.sort((a, b) => {
            if (a.name > b.name) {
                return 1
            } else if (a.name < b.name) {
                return -1
            } else {
                return 0
            }
        })

        
        return auxPnorm.map((pais, num) => {
            
            return (
                <div key={num}>
                    <h1>{pais.name}</h1>
                    <img src={pais.flag} />
                    <h2>{pais.population}</h2>
                    <button onClick={() => Auxpais(true, num)}> </button>
                </div >
            )
        })
    }
    
    
    

    let carregarPaisesf = () => {
        
        let auxPnorm = dadosFav
        auxPnorm.sort((a, b) => {
            if (a.name > b.name) {
                return 1
            } else if (a.name < b.name) {
                return -1
            } else {
                return 0
            }
        })

        
        return dadosFav.map((pais, num) => {
            
            return (
                <div key={num}>
                    <h1>{pais.name}</h1>
                    <img src={pais.flag} />
                    <h2>{pais.population}</h2>
                    <button onClick={() => Auxpais(false, num)}>aqui ola </button>
                </div >
            )
        })
    }




    return (
        <span id="MeusPaises">

            <section>
                <nav>
                    <h1 id='paisesnum'>PAISES</h1>
                    <h3 id='poptotal'>POPULACAO TOTAL ({  valorNormal() })</h3>
                </nav>
                <div>
                    {carregarPaises()}
                </div>

            </section>

            <section>
                <nav>
                    <h1 id='paisesnum'>PAISES</h1>
                    <h3 id='poptotal2'>POPULACAO TOTAL ({valorFav()}) </h3>
                </nav>
                <div id="paisesFav">
                    {carregarPaisesf()}
                </div>
            </section>
        </span>

    )
    
}
export default base