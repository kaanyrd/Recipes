import React from "react";

function AddRecipe() {
  return (
    <div>
      <form>
        <div>
          <label>Title</label>
          <input type="text" />
        </div>
        <div>
          <label>image_url</label>
          <input type="text" />
        </div>
        <div>
          <label>Sourece_url</label>
          <input type="text" />
        </div>
        <div>
          <label>Publisher</label>
          <input type="text" />
        </div>
        <div>
          <label>Prep Timer</label>
          <input type="text" />
        </div>
        <div>
          <label>Servings</label>
          <input type="number" />
        </div>
        <div>
          <label>Ingredinets</label>
          <input type="text" />
        </div>
      </form>
    </div>
  );
}

export default AddRecipe;
