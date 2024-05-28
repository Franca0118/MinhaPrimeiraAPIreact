import React, { useState, useEffect } from 'react';
import './css.css';




function base() {
    let [dadosNorma, normalUseState] = useState([])
    let [dadosFav, favUseState] = useState([])
    let [messangemDeErro, setMenssagem] = useState('CARREGANDO')
    let ApiSucess = true


    useEffect(() => {
        API()
    }, []);

    function API() {
        try {
            fetch('https://restcountries.com/v2/all')
                .then(a => a.json())
                .then(data => {
                    ApiSucess = false
                    normalUseState(data)
                    document.querySelector("#carregando").style.display = 'none'
                })
                .catch((err) => {
                    console.error('Erro ao buscar dados da API' + err);
                    setMenssagem("ERRO")
                });
        } catch (err) {
            console.error('Erro ao buscar dados da API' + err);
            setMenssagem("ERRO")
        }
    }





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

    let valorNormal = () => {
        if (!ApiSucess) {
            return
        }

        let valorAux = 0
        let valorPais = 0
        dadosNorma.forEach(a => {
            valorAux += a.population
            valorPais += 1
            
        }
        )
        return [valorAux,valorPais]
    }

    let valorFav = () => {
        if (!ApiSucess) {
            return
        }
        let valorAux = 0
        let valorPais = 0
        dadosFav.forEach(a => {
            valorAux += a.population
            valorPais += 1
        }
        )
        return [valorAux,valorPais]
    }




    let carregarPaises = () => {
        if (!ApiSucess) {
            return
        }
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
                    <button onClick={() => Auxpais(true, num)}>favoritar</button>
                </div >
            )
        })
    }




    let carregarPaisesf = () => {
        if (!ApiSucess) {
            return
        }
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
                    <button onClick={() => Auxpais(false, num)}>remover </button>
                </div >
            )
        })
    }




    return (
        <span id="MeusPaises">

            <div id='carregando'>{messangemDeErro}</div>
            <section>
                <nav>
                    <h1 id='paisesnum'>PAISES ({valorNormal()[1]})</h1>
                    <h3 id='poptotal'>POPULACAO TOTAL ({valorNormal()[0]})</h3>
                </nav>
                <div>
                    {carregarPaises()}
                </div>

            </section>

            <section>
                <nav>
                    <h1 id='paisesnum'>PAISES ({valorFav()[1]})</h1>
                    <h3 id='poptotal2'>POPULACAO TOTAL ({valorFav()[0]}) </h3>
                </nav>
                <div id="paisesFav">
                    {carregarPaisesf()}
                </div>
            </section>
        </span>

    )

}
export default base