import { v4 as uuidv4 } from "uuid";

export default function todoReducer(currenttodo, action) {
  switch (action.type) {
    case "added": {
      const updatedtodos = [
        ...currenttodo,
        {
          title: action.payload.titletexte,
          details: "تجربة",
          id: uuidv4(),
          iscompleted: false,
        },
      ];

      localStorage.setItem("todos", JSON.stringify(updatedtodos));

      return updatedtodos;
    }
    case "delete": {
      const updatedtodos = currenttodo.filter(
        (t) => t.id !== action.payload.idtodo.id,
      );

      localStorage.setItem("todos", JSON.stringify(updatedtodos));

      return updatedtodos;
    }

    case "edite": {
      const updatedtodos = currenttodo.map((t) => {
        if (t.id === action.payload.idtodo.id) {
          return {
            ...t,
            title: action.payload.title,
            details: action.payload.details,
          };
        } else {
          return t;
        }
      });
      localStorage.setItem("todos", JSON.stringify(updatedtodos));
      console.log(updatedtodos);

      return updatedtodos;
    }
    case "completed": {
      const updatedtodos = currenttodo.map((t) => {
        if (t.id == action.payload.todo.id) {
          return({...t,iscompleted : !t.iscompleted}) ;
        }
        return t;
      });
      localStorage.setItem("todos", JSON.stringify(updatedtodos));
      return updatedtodos
      
    }
    default: {
      throw new Error(" type not defined");
    }
    case "get": {
      // هذه الحالة تأخذ البيانات الجاهزة وتضعها في الـ State
      return action.payload;
    }
  }
}
