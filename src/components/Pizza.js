import React from "react";

function Pizza({pizza, sendForm}) {
  const {id, topping, size, vegetarian} = pizza
  return (
    <tr>
      <td>{topping}</td>
      <td>{size}</td>
      <td>{vegetarian ? "Yes" : "No"}</td>
      <td>
        <button type="button" id={id} onClick={(e)=>sendForm(e)} className="btn btn-primary">
          Edit Pizza
        </button>
      </td>
    </tr>
  );
}

export default Pizza;
