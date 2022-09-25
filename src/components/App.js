import React, {useState, useEffect} from "react";
import Header from "./Header";
import PizzaForm from "./PizzaForm";
import PizzaList from "./PizzaList";

function App() {

  const [pizzaList, setPizzaList] = useState([])
  const [form, setForm] = useState({id: 0, topping: "", size: "Small", vegetarian: false})


    fetch(`http://localhost:3001/pizzas`)
    .then((res)=>res.json())
    .then((obj)=>setPizzaList(obj))


  function sendForm(event){
    const id = event.target.id
    let thePizza = pizzaList.filter((pizza)=>{
      if(pizza.id == id){
        return pizza
      }
    })
    setForm(thePizza[0])
  }

  function handleChange(event){
    const name = event.target.name
    const value = event.target.value

    if(name == "vegetarian"){
      setForm({
        ...form,
        [name]: !form.vegetarian
      })}else if(value == "notVeg"){
        setForm({
          ...form,
          [name]: false
        })
      }
     else{
      setForm({
        ...form,
        [name]: value
    })
    }

  }


  function handleSubmit(id){
    fetch(`http://localhost:3001/pizzas/${id}`,{
      method: "PATCH",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify(form)
    })
    .then((res)=>res.json())
    .then((obj)=>setPizzaList(obj))
  }


  return (
    <>
      <Header />
      <PizzaForm form={form} handleChange={handleChange} handleSubmit2={handleSubmit}/>
      <PizzaList pizzaList={pizzaList} sendForm={sendForm}/>
    </>
  );
}

export default App;


/* Components:

    App set the state here
    |_Header
    |_PizzaForm
    |_PizzaList
      |_Pizza
      

    1. Fetch the pizzas in the App D
    2. Set the state in the App D
    3. Pass a callback funtion in the Pizza that triggers function that sets state. 
    4. When the state is set in step three the Form component is rerendered
    5. In the form data is set as a state and onClick the state is passed back to the app
    6. The form component makes a Patch rrequest to the API
    7. App maps through the pizza state to alter the specific pizza component.
    */
