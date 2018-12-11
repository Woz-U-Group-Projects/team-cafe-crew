import React from 'react';
import ReactDOM from 'react-dom';



const App = props => {
  const items=[
   {userName:'StephenK', recipeTitle:'Garden Salad', recipePicture:'file:///C:/VirtualChef/src/images/salad.png'},
   {userName:'StephenK', recipeTitle: 'Peach Cobbler' , recipePicture:'file:///C:/VirtualChef/src/images/PeachCobbler.png'}
  ];
  return <RecipeList items={items} />;
};



const RecipeList = props => {
  const recipeItems=props.items.map((item,index) => (
    <li key={index}>
     {item.userName} - {item.recipeTitle} <br /><img src={item.recipePicture} width="140" height="150" />
      </li>
  ));
  return <ul>{recipeItems}</ul>
};


ReactDOM.render(<App />, document.getElementById('root'));