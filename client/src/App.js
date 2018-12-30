import React from 'react';
import {  render } from 'react-dom';
import { BrowserRouter as Router, Route, Link  } from 'react-router-dom';
//import { isNull } from 'util';
import Axios from 'axios';

var idCount=0;

class RecipeList extends React.Component {
  constructor () {
    super();
    this.state = {
      data: [],
      recipeId: 0,
      recipeName: '',
      recipeRating: 0

    
  }; 
}
viewAllRecipes = () => {
  fetch("/api/viewAllRecipes")
      .then(data => data.json())
      .then(res => this.setState({ data: res.data }))
      
  }

  setRecipeRating () {

      
   
      this.setState({recipeRating: this.state.recipeRating });
      this.setState({recipeId: this.state.recipeId});
      this.setState({recipeName: this.state.recipeName});
      let theRating=this.state.recipeRating;
      let theID=this.state.recipeId;
      let theName=this.state.recipeName;

      Axios.post("api/submitRatingToDB",
      {
        recipeRating: theRating,
        recipeId: theID,
        recipeName: theName
      }
   
    
    ) 
       console.log("RATING: " + theRating + " ID: " + theID + " NAME: " + theName);
      //this.setState({RatingsObject: {ratingsID: ratings.length + 1, theRecipeID:  this.state.RecipeID, rater: this.state.RatedBy, ratingNumber: theRating } });
      this.setState (this);
     // ratings.unshift(this.state.RatingsObject);
      alert("Your rating successfully submitted.");
  }
 // .catch((error) => {
  //  console.log(error)
  //});

/* 
viewAllRecipes = () => {
    console.log('Out data are fetched');
    fetch("/api/viewAllRecipes")

  .then(res => {
    console.log(res);
    return res;
 })

.then(data => { 
    console.log(data); 
    this.setState({ data })
 });
                <h1>Users</h1>
                {this.state.users.map(user =>
                <div key={user.id}>user: {user.name} Password: {user.password}</div>
              )}
}
*/


/*
componentDidMount() {
  this.viewAllRecipes();
  fetch('/api/viewAllRecipes') 
  .then(response => response.json())
      .then(data => this.setState({ data }))
     .then( data => console.log(data))
     
  }
*/
/*
 componentDidMount(){
   this.viewAllRecipes();
   if (!this.state.intervalIsSet) {
    let interval = setInterval(this.getDataFromDb, 1000);
    this.setState({ intervalIsSet: interval });
  }
   
 }

 

  */

 componentDidMount() {
  if (!this.state.intervalIsSet) {
    let interval = setInterval(this.viewAllRecipes, 1000);
    this.setState({ intervalIsSet: interval });
  }
}
 // never let a process live forever 
  // always kill a process everytime we are done using it

  componentWillUnmount() {
    if (this.state.intervalIsSet) {
      clearInterval(this.state.intervalIsSet);
      this.setState({ intervalIsSet: null });
    }
  }

 render () {
  const { data } = this.state;

   return (
     <div>
       <h1>RECIPES</h1>
      
       <div style={{height: '300px', width:'900px', border:'1px solid #ccc', font:'16px/26px Georgia, Garamond, Serif', overflow:'auto'}}>
       <ul>
         <h2>{ idCount= data.length} recipes:</h2>
          {data.length <= 0
            ? "NO DB ENTRIES YET"
            : data.map(dat => (
                <li style={{ padding: "10px" }} key={data.recipeInstructions} > 
                  <span> <b>Recipe ID:</b> </span> <input type="number" value= {dat.recipeId} style={{width: '30px'}} readonly  onClick={event => this.setState({ recipeId: event.target.value })}/> <b>Enter a rating:</b> <input type="number" min="1" max="5" onChange={event => this.setState({ recipeRating: event.target.value })} /><button onClick={this.setRecipeRating.bind(this)}>SUBMIT RATING</button><br />
                  <span> <b> User:</b> </span> {dat.recipeUser} <br />
                  <span > <b> Category:</b> </span>{dat.recipeCategory} <br />
                  <span > <b> Recipe Name: </b></span> <input value= {dat.recipeName} onClick={event => this.setState({ recipeName: event.target.value })}/> <br />
                  <span > <b> Instructions:</b> </span><textarea rows="8" cols="35">{dat.recipeInstructions}</textarea> <b> Illustration:</b> <img src={dat.recipePicture} width="130" height="100" style={{paddingRight: "20"}}  alt={dat.recipeName} />               
                  
                </li>
              ))}
        </ul>
         </div>
      
   </div>
   );
 }
}


let items=[];
let ratings=[];
let App = props => {
  //items.push({userName:'StephenK', recipeTitle: 'Cowboy Ribeye Steak' , recipePicture:'file:///C:/VirtualChef/src/images/CowboyRibeyeSteak.png',  recipeInstructions:"2 cups olive oil, 2 cups A1 steak sauce, 2 large onions, coarsely chopped, 1 bunch fresh rosemary sprigs, 1 bunch fresh thyme sprigs, 10 cloves garlic, smashed, 2 18 ounce beef ribeye steaks, 1/4 cup sea salt, 1/4 cup coarsely ground black pepper, Cooking Steps: For the marinade, in a large bowl combine the oil, steak sauce, onions, rosemary, thyme, and garlic.Place the steaks in a resealable bag, set in a shallow bowl. Pour marinade over the steaks. Seal bag. Marinate in the refrigerator for 24 hours, turning occasionally. Drain steaks; discard marinade. Generously season steaks with the sea salt and the coarse black pepper.Preheat grill. Place steaks on the rack of an uncovered grill directly over medium coals. Grill for 15 to 19 minutes for medium-rare (145Â°F) or 18 to 20 minutes for medium (160Â°F), turning once." });
   
  return    <div> <center>  {appHeading} 
  <AppNav  />

<RecipeList /> </center> </div>
}; 

//export default App;


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


/*
const fetchNewRecipes = () => {
  fetch("/api/viewAllRecipes")
  .then(data => data.json())
  .then(res => this.setState({ data: res.data }));
  console.log(data);
  
    };
*/
class RecipeData extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
        RecipeID: 0,
        RecipeUserName: '',
        RecipeCategory: 'Main Dish',
        RecipeName: '',
        RecipeDirections: '',
        RecipePic: '',
        RecipeObject: {}, 
        items: [],
        RecipeCount: 0,
        Submitted: false,
        Response: '',
       RatingsObject: null,
        RatingsID: 0,
        RatedBy: '',
        RecipeRating: 0,
        ratings: [], 
        visibility: 'hidden'
       
    };
  }



 postRecipe  ()  {
  this.setState( {Submitted: true });
  this.setState({RecipeID: this.state.RecipeID + 1});
  this.setState({RecipeObject: {recipeId: items.length + 1, userName: this.state.RecipeUserName, category: this.state.RecipeCategory, recipeTitle: this.state.RecipeName, recipePicture: this.state.RecipePic, recipeInstructions: this.state.RecipeDirections, recipeRating: this.state.RecipeRating}});
this.setState(this);
idCount++;
let theRecipeId = idCount;

let theRecipeUser=this.state.RecipeUserName;
let theRecipeCategory=this.state.RecipeCategory;
let theRecipeTitle=this.state.RecipeName;
let theRecipeInstructions= this.state.RecipeDirections;
let theRecipePicture=this.state.RecipePic;
let theRecipeRating=0;
const theRecipeObj={recipeId:theRecipeId, userName: theRecipeUser, category:theRecipeCategory, recipeTitle:theRecipeTitle, recipePicture: theRecipePicture, recipeInstructions: theRecipeInstructions};
console.log(theRecipeObj.recipeTitle + " " + theRecipeObj.category);
console.log("POSTING: " + theRecipeId + " " + theRecipeUser + " " + theRecipeCategory + " " + theRecipeTitle + " " + theRecipePicture );
//Axios.post("mongodb://skmeyer19:wozu2019@ds259001.mlab.com:59001/exeter",{theRecipe})
Axios.post("/api/putData", 
{
  recipeId: theRecipeId,
  recipeUser: theRecipeUser,
 recipeCategory: theRecipeCategory,
  recipeName: theRecipeTitle,
  recipeInstructions: theRecipeInstructions,
   recipePicture: theRecipePicture,
   recipeRating: theRecipeRating
  
  }

  );
  this.setState( {Submitted: false });
  this.setState({RecipeUserName: ''});
  this.setState({RecipeName: ''});
  this.setState({RecipeDirections: ''});
  this.setState({RecipePic: ''});
 this.setState({visibility: 'hidden'});
 };
  
   

updateRecipeList () {
  if (!this.state.Submitted)
  {
    alert("PLEASE SUBMIT YOUR RECIPE!");
    return;
  }
  items.unshift(this.state.RecipeObject);
   this.setState( {Submitted: false });
  this.setState({RecipeUserName: ''});
  this.setState({RecipeName: ''});
  this.setState({RecipeDirections: ''});
  this.setState({RecipePic: ''});
 
}




setRecipeRating () {
  try
  {
    
 
    this.setState({RatedBy: 'StephenK'});
    this.setState({RecipeRating: this.state.RecipeRating });
    let theRating=this.state.RecipeRating;
    this.setState({RatingsObject: {ratingsID: ratings.length + 1, theRecipeID:  this.state.RecipeID, rater: this.state.RatedBy, ratingNumber: theRating } });
    this.setState (this);
    ratings.unshift(this.state.RatingsObject);
    alert("Your rating successfully submitted.");
}
  catch (err)
  {
    alert(err.toString());
  }
}
  
  listItems() {
    return (

      <div>
      
      <ul>
        {

         items.map((val, index) => {
            return (
              <li key={index}>
             <p style={{fontSize: '25px'}}># {val.recipeId} {val.category}: <b><u>{val.recipeTitle}</u></b> - {val.userName }</p> <br /> <img src={val.recipePicture} width="120" height="140" style={{paddingRight: "20"}} alt="img" /><textarea rows="9" cols="30">{val.recipeInstructions}</textarea><br />
            <p>Enter your rating here (scale 1 - 5):</p> <input type="number"  onBlur={this.setRecipeRating.bind(this)} min="1" max="5"/>
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
  
        <h2>Add New Recipe</h2>
   
        <table>
      <tr>
      <td>  UserName: </td> <td><input type="text" onChange={event => this.setState({ RecipeUserName: event.target.value })} id="userName" value={this.state.RecipeUserName}  /> </td>
      </tr>
      <tr>
      <td>  Category: </td> <td><select  onChange={event => this.setState({ RecipeCategory: event.target.value })}><option value="Main Dish">Main Dish</option><option value="Side Dish">Side Dish</option><option value="Salad">Salad</option><option value="Dessert">Dessert</option></select> </td>
      </tr>    
      <tr>
      <td>  Recipe description: </td> <td><input type="text"  onChange={event => this.setState({ RecipeName: event.target.value })} id="recipeDescription" value={this.state.RecipeName} size="50" /></td>
      </tr>
      <tr>
      <td>  Recipe instructions: </td> <td> <textarea id="recipeInstructions" onChange={event => this.setState({ RecipeDirections: event.target.value })} value={this.state.RecipeDirections} rows="4" cols="75" ></textarea> </td> 
      </tr>
      <tr>
      <td>  Recipe picture (URL):</td> <td><input type="text" id="recipePicture" size="80" onChange={event => this.setState({ RecipePic: event.target.value })} value={this.state.RecipePic} /></td>
      </tr>
      <tr>
      <td>&nbsp; </td> <td><button onClick={this.postRecipe.bind(this)}>SUBMIT RECIPE</button></td>
      </tr> 
      <tr>
      <td>&nbsp; </td> <td><button id="updateButton" onClick={this.updateRecipeList.bind(this)} style={{visibility: 'hidden'}}>REFRESH RECIPE LIST </button></td>
      </tr>   
           
        </table>
     
       {this.listItems()}
        </div>
  

    );
  }

}



/*
let RecipeList = props => {
  let recipeItems=props.items.map((item,index) => (
    <li style={{padding: '25'}} key={index} >
    <p>#{item.recipeId}</p>
   <p style={{fontSize:'25'}}> {item.category} <b><u>{item.recipeTitle}</u></b> - {item.userName}</p>    <br /> <img src={item.recipePicture} width="120" height="140" style={{paddingRight: "20"}}  alt="img" /><textarea rows="9" cols="30">{item.recipeInstructions}</textarea>
   <input type="range" min="1" max="10" value="5" id="recipeRating" width="10px" height="10px" /><button>SUBMIT YOUR RATING</button>
      </li>
  ));
  return  <ul>{recipeItems} </ul>;
};
*/

render(   <App />, document.getElementById('root'));
export default App;


