import './App.css'
import { useEffect, useState } from 'react'






function App() {



  const [toDo, setTodo] = useState('');
  const [activetodo, setActivetodo] = useState(
    localStorage.getItem("activetodo")
      ? JSON.parse(localStorage.getItem("activetodo"))
      : []
  );
  const [removedtodo, setRemovedtodo] = useState(
    localStorage.getItem("removedtodo")
      ? JSON.parse(localStorage.getItem("removedtodo"))
      : []
  );

  useEffect(() => {
    localStorage.setItem("activetodo", JSON.stringify(activetodo));
    localStorage.setItem("removedtodo", JSON.stringify(removedtodo));
  }, [activetodo, removedtodo]);

  const handleRemove = (data) =>{
    setRemovedtodo([...removedtodo,data]);
    var items = activetodo.filter((item)=>{
      return item !==data;
    });
    setActivetodo();
  };


  const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']




  return (

    <>
    
    <div className="app">

      

      <div className="mainHeading">
        <h1 className='gradient-text'>ToDo List</h1>
      </div>

      <div className="subHeading center">
        <br />
        <h2 className='gradient-text2 center'>Hey, it's {weekday[new Date().getDay()]}  </h2>
      </div>

      <div className="input">
        <input 
              type="text"
              placeholder="🖊️ Plan something..." 
              onChange={(e) => setTodo(e.target.value)} 
              value={toDo}  />
        <i onClick={() => setTodo('')} class="fa-solid fa-eraser"></i>
        <i onClick={() => setActivetodo([...activetodo, { id: Date.now(), text: toDo }])} className="fas fa-plus"></i>
      </div>

      <div className="todos">
        {activetodo.map((data,key) => {


          if (!data.status){


        return (
          <div key={key} className="todo">

            <div  className="left">

              <input
              type="checkbox"
              name="checkbox"
              className="checkbox"
              checked={data.status}

              onChange={(e) => {
                
                setActivetodo(activetodo.filter(obj2 => {
                  if (obj2.id === data.id) {
                    obj2.status = e.target.checked;
                  }
                  return obj2;
                })
                );

              }}  />
              <span className="todoText">{data.text}</span>
            </div>

            <div className="right">
              <span onClick={() => {
                        let isdelete = window.confirm(
                          "deleted items can't be restored"
                        );
                        if (isdelete) {
                          var items = activetodo.filter((item) => {
                            return item !== data;
                          });
                          setActivetodo(items);
                        }
                      }}
                      className="closeButton delete">
                    
                       Delete
              </span>
            </div>
        
          </div> )
          } ;
        })}
      </div>
      
    </div>

  
    
    
     
  
    </>  );
}



export default App;
