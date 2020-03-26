import React from 'react';

import './style.css';

function DevItem ( { dev } ) {

  return (
    <li key={ dev._id } className="dev-item">
      <header>
        <img src={ dev.avatar_url } alt={ dev.name }/>
        <div className="user-info">
          <strong>{ dev.name}</strong>
          <span>{ dev.techs.join(', ') }</span>
        </div>
      </header>
      <p>{ dev.bio }</p>
      <a href={`https://github.com/${ dev.github_username }/`}> Acessar perfil no Github </a>
    </li>
  )
}

/* mesma coisa que o de cima { devs.map(dev => { return ()}
          { devs.map(dev => {
            return (
              <li className="dev-item">
                <header>
                  <img src="https://avatars1.githubusercontent.com/u/42449809?v=4" alt="Murilo Daleffe"/>
                  <div className="user-info">
                    <strong>Murilo Daleffe</strong>
                    <span>Pyhton, Java, R, React, AngularJS</span>
                  </div>
                </header>
                <p>Engenheiro mecânico, cientista de dados e analista de sistemas</p>
                <a href="https://github.com/MuriloDaleffe/"> Acessar perfil no Github </a>
              </li>
            )
          })} */

export default DevItem;