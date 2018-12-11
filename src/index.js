import React from 'react';
import { ReactDom, render } from 'react-dom';
import { Redirect, BrowserRouter as Router, Route, Link  } from 'react-router-dom'
import { isNull } from 'util';
//import AddNewRecipe from 'AddNewRecipe';


let items=[];
let App = props => {
  //items.push({userName:'StephenK', recipeTitle: 'Cowboy Ribeye Steak' , recipePicture:'file:///C:/VirtualChef/src/images/CowboyRibeyeSteak.png',  recipeInstructions:"2 cups olive oil, 2 cups A1 steak sauce, 2 large onions, coarsely chopped, 1 bunch fresh rosemary sprigs, 1 bunch fresh thyme sprigs, 10 cloves garlic, smashed, 2 18 ounce beef ribeye steaks, 1/4 cup sea salt, 1/4 cup coarsely ground black pepper, Cooking Steps: For the marinade, in a large bowl combine the oil, steak sauce, onions, rosemary, thyme, and garlic.Place the steaks in a resealable bag, set in a shallow bowl. Pour marinade over the steaks. Seal bag. Marinate in the refrigerator for 24 hours, turning occasionally. Drain steaks; discard marinade. Generously season steaks with the sea salt and the coarse black pepper.Preheat grill. Place steaks on the rack of an uncovered grill directly over medium coals. Grill for 15 to 19 minutes for medium-rare (145Â°F) or 18 to 20 minutes for medium (160Â°F), turning once." });
   
  return    <div> <center>  {appHeading} 
  <AppNav />
  <RecipeList items={items} />   </center> </div>; 
}; 

export default App;


const AppNav = () => (
<Router>

  <div  >
    <ul >
   <li><Link to="/">Home</Link></li>
   <li><Link to="/RecipeData">AddNewRecipe</Link></li>
    </ul>
   <Route exact path="/" component={Home} />
    <Route path="/RecipeData" component={RecipeData} />
   </div>

  </Router>
); 



const appHeading=<h1>Virtual Chef Recipes</h1>;
const Home = () => (
  <div>
    <h2>Latest Recipes</h2>
  </div>
);

class RecipeData extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
        RecipeID: 0,
        RecipeUserName: '',
        RecipeName: '',
        RecipeDirections: '',
        RecipePic: '',
        RecipeObject: null, 
        items: [],
        RecipeCount: 0,
      Submitted: false,

    UserRatings: {
        RecipeID: 0,
        RatedBy: '',
        RecipeRating: 0
      }
    };
  }



 postRecipe  ()  {
  this.setState( {Submitted: true });
  this.setState({RecipeObject: {recipeId: items.length + 1, userName: this.state.RecipeUserName, recipeTitle: this.state.RecipeName, recipePicture: this.state.RecipePic, recipeInstructions: this.state.RecipeDirections}});


 
   
  }
 
updateRecipeList () {
  if (!this.state.Submitted)
  {
    alert("PLEASE SUBMIT YOUR RECIPE!");
    return;
  }
  items.push(this.state.RecipeObject);
  this.setState(this);
  this.setState( {Submitted: false });
  this.setState({RecipeUserName: ''});
  this.setState({RecipeName: ''});
  this.setState({RecipeDirections: ''});
  this.setState({RecipePic: ''});
 


 
}

setRecipeRating (event) {
  this.setState({RecipeRating: event.target.value});
  let theRating=this.state.RecipeRating;
}
  
  listItems() {

    return (
      <div>
       {AppNav}
       
      <ul>
        {
         items.map((val, index) => {
            return (

              <li key={index}>
             <p style={{fontSize: '25px'}}><b>ID: {val.recipeId} {val.recipeTitle}</b> - {val.userName }</p> <br /> <img src={val.recipePicture} width="120" height="140" style={{paddingRight: "20"}} /><textarea rows="9" cols="30">{val.recipeInstructions}</textarea><br />
             <p>slide lever here for rating:</p><input type="number" value={this.state.RecipeRating}  onChange={event => this.setState({RecipeRating: event.target.value})} /> <input type="range"  onInput={event => this.setState({RecipeRating : event.target.value })} min="1" max="10" id="recipeRating" width="10px" height="10px" /><button onClick={this.setRecipeRating.bind(this)}>SUBMIT YOUR RATING</button>
              
              </li>
            );
          })
        }
      </ul>
      </div>
    );
  }
   
 
   render () {
    return (
      <div>
        <h1>Add New Recipe</h1>
      
        <table>
          <tr>
      <td>  UserName: </td> <td><input type="text" onChange={event => this.setState({ RecipeUserName: event.target.value })} id="userName" value={this.state.RecipeUserName}  /> </td>
      </tr>
      <tr>
      <td>  Recipe description: </td> <td><input type="text"  onChange={event => this.setState({ RecipeName: event.target.value })} id="recipeDescription" value={this.state.RecipeName} /></td>
      </tr>
      <tr>
      <td>  Recipe instructions: </td> <td> <textarea id="recipeInstructions" onChange={event => this.setState({ RecipeDirections: event.target.value })} value={this.state.RecipeDirections} rows="12" cols="50" ></textarea> </td> 
      </tr>
      <tr>
      <td>  Recipe picture (URL):</td> <td><input type="text" id="recipePicture" size="80" onChange={event => this.setState({ RecipePic: event.target.value })} value={this.state.RecipePic} /></td>
      </tr>
      <tr>
      <td>&nbsp; </td> <td><button onClick={this.postRecipe.bind(this)}>SUBMIT RECIPE </button></td>
      </tr> 
      <tr>
      <td>&nbsp; </td> <td><button id="updateButton" onClick={this.updateRecipeList.bind(this)}>REFRESH RECIPE LIST </button></td>
      </tr>            
        </table>
       {this.listItems()}
        </div>
  

    );
  }
}




let RecipeList = props => {
  let recipeItems=props.items.map((item,index) => (
    <li style={{padding: '25'}} key={index} >
    <p>{item.recipeId}</p>
   <p style={{fontSize:'25'}}> <b>{item.recipeTitle}</b> - {item.userName}</p>    <br /> <img src={item.recipePicture} width="120" height="140" style={{paddingRight: "20"}} /><textarea rows="9" cols="30">{item.recipeInstructions}</textarea>
   <input type="range" min="1" max="10" value="5" id="recipeRating" width="10px" height="10px" /><button>SUBMIT YOUR RATING</button>
      </li>
  ));
  return  <ul>{recipeItems} </ul>;
};





render(   <App />, document.getElementById('root'));
