/**
 * generate element like below:
 * <li>
 *   <div class="todo-item">
 *     <p class="todo-item__name">${todoItemName}</p>
 *     <button class="button">Done!</button>
 *     <button class="button">remove</button>
 *   </div>
 * </li>
 * @param {String} todoItemName
 */
const createUndoneItem = (todoItemName) => {
  const li = document.createElement("li");

  const div = document.createElement("div");
  div.className = "todo-item";

  const p = document.createElement("p");
  p.className = "todo-item__name";
  p.innerText = todoItemName;

  const doneButton = document.createElement("button");
  doneButton.className = "button";
  doneButton.innerText = "Done!";
  doneButton.addEventListener("click", () =>
    done(removeButton.parentNode.parentNode, todoItemName)
  );

  const removeButton = document.createElement("button");
  removeButton.className = "button";
  removeButton.innerText = "remove";
  removeButton.addEventListener("click", () => {
    const self = removeButton.parentNode.parentNode;
    document.getElementById("undone-list").removeChild(self);
    if (document.getElementById("undone-list").childElementCount === 1) {
      document.getElementById("no-undone-item").classList.remove("hidden");
    }
  });

  div.appendChild(p);
  div.appendChild(doneButton);
  div.appendChild(removeButton);
  li.appendChild(div);
  return li;
};

function done(removeTarget, todoItemName) {
  document.getElementById("undone-list").removeChild(removeTarget);
  if (document.getElementById("undone-list").childElementCount === 1) {
    document.getElementById("no-undone-item").classList.remove("hidden");
  }

  document.getElementById("no-done-item").className = "hidden";
  document
    .getElementById("done-list")
    .appendChild(createDoneItem(todoItemName));
}

/**
 * generate element like below:
 * <li>
 *   <div class="todo-item">
 *     <p class="todo-item__name">${todoItemName}</p>
 *     <button class="button">undone</button>
 *   </div>
 * </li>
 * @param {String} todoItemName
 */
const createDoneItem = (todoItemName) => {
  const li = document.createElement("li");

  const div = document.createElement("div");
  div.className = "todo-item";

  const p = document.createElement("p");
  p.className = "todo-item__name";
  p.innerText = todoItemName;

  const undoneButton = document.createElement("button");
  undoneButton.className = "button";
  undoneButton.innerText = "undone";
  undoneButton.addEventListener("click", () =>
    undone(undoneButton.parentNode.parentNode, todoItemName)
  );

  div.appendChild(p);
  div.appendChild(undoneButton);
  li.appendChild(div);
  return li;
};

const undone = (removeTarget, todoItemName) => {
  document.getElementById("done-list").removeChild(removeTarget);
  if (document.getElementById("done-list").childElementCount === 1) {
    document.getElementById("no-done-item").classList.remove("hidden");
  }

  document.getElementById("no-undone-item").className = "hidden";
  document
    .getElementById("undone-list")
    .appendChild(createUndoneItem(todoItemName));
};

const addTodo = () => {
  const inputText = document.getElementById("input-todo").value;
  document.getElementById("input-todo").value = "";

  if (!inputText) {
    return;
  }

  document.getElementById("no-undone-item").className = "hidden";
  document
    .getElementById("undone-list")
    .appendChild(createUndoneItem(inputText));
};

document.getElementById("add-todo").addEventListener("click", () => addTodo());
