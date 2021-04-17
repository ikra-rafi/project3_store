// import React, {createContext, useReducer, useContext} from 'react';

// const initialState = {john: 5};
// const store = createContext(initialState);
// const {Provider} = store;
// const StateProvider = ( { children})  => {
//     const [state, dispatch] = useReducer(( state, action) => {
//         switch(action.type) {
//             case 'change john':
// //                const newState = newState + 1;
//                 return initialState + 7;
//             default:
//                 throw new Error();
//         };
//     }, initialState)
//     return < Provider value={{state, dispatch}}>{children}</Provider>;
// };

// // const useStoreContext = () => {
// //     return useContext(store);
// // };

// export {StateProvider, store};


import React, { createContext, useReducer, useContext } from "react";

/* const CountContext = createContext();
const { Provider } = CountContext;

const reducer = (state, action) => {
  switch (action.type) {
  case "add":
    return { count: state.count + 1 };
  case "subtract":
    return { count: state.count - 1 };
  default:
    throw new Error(`Invalid action type: ${action.type}`);
  }
};

const CountProvider = ({  ...props }) => {
  const [state, dispatch] = useReducer(reducer, { count: 5 });

  return <Provider value={[state, dispatch]} {...props} />;
};

const useCountContext = () => {
  return useContext(CountContext);
};

export { CountProvider, useCountContext }; */

const TodoContext = createContext();
  const { Provider } = TodoContext;
  
  function reducer(state, action) {
    switch (action.type) {
    case "add":
      return (
 //        ...state,
        {
          count: state.count + 1,
          name: "john",
          test: state.test,
          orderTotal1: state.orderTotal
        }
    //    ];
      )
      case "subtract":
          console.log(action.orderTotal1);
          console.log(action);
          console.log(action.john);
          return (
           //    ...state,
              {
                  orderTotal1: action.orderTotal1,
                  count: state.count - 1,
                  name: action.john,
                  test: state.test
              }
       //    ];
       )
       case "cartTotal":
           return (
               {
                   orderTotal1: action.orderTotal1,
                   count: state.count,
                   name: action.john,
                   test: state.test
               }
           )
    //   case "remove":
    //   return state.filter((_, index) => {
    //     return index !== action.index;
    //   });
    // case "prioritize":
    //   return state.map((item, index) => {
    //     if (index === action.index) {
    //       return Object.assign({}, item, {
    //         priority: !item.priority
    //       });
    //     }
    //     return item;
    //   });
    default:
      return state;
    }
  }
  
  function TodoProvider({ count=5, ...props }) {
    const [state, dispatch] = useReducer(reducer, {
        count: 0,
        orderTotal1: 0,
        name: "",
        priority: false,
        test: ['a', 'c', 'e'],
      });
  
    return <Provider value={[state, dispatch]} {...props} />;
  }
  
  function useTodoContext() {
    return useContext(TodoContext);
  }
  
  export { TodoProvider, useTodoContext };