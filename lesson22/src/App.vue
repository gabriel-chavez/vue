<template>
  <div id="app" class="container">
    <h2>Tareas uso de componentes para limpiar el codigo</h2>

    <ul class="list-group tasks">
      
        <li is="app-task"  v-for="(task, index) in tasks" :task="task" :index="index" :tasks="tasks" @removertarea="deleteTask"></li>

    </ul>

    <p>
        <a @click="deleteCompleted">Eliminar tareas competadas</a>
    </p>
    <form @submit.prevent="createTask" class="new-task-form">
        <input v-model="new_task" type="text" class="form-control">
        <button class="btn btn-primary">Crear tarea</button>
    </form>

    <footer class="footer">
        <p>&copy; 2017 Styde.net.</p>
    </footer>
  </div>
</template>

<script>
import Task from './Task.vue'
export default {
  components:{
    'app-task':Task,
  },
    data: function(){
      return {
          new_task:'',       
          tasks:[
              {
                  description:'Aprender Vue.js',
                  pending:true,
                  
              },
              {
                  description:'Suscribirse en Styde',
                  pending:true,
                  
              },
              {
                  description:'Crear una API',
                  pending:false,
                  
              }
          ]
      }
    },
    
    methods:{
        createTask: function(){
            this.tasks.push({
                description:this.new_task,
                pending:true,
                editing:false
            })
            this.new_task='';
        },
         deleteCompleted:function(){
            this.tasks=this.tasks.filter(function(task){
                return task.pending;
            });
        },
        deleteTask:function(index){
            this.tasks.splice(index,1);
        }
        
    }
}
</script>
<style>
body {
    margin: 10px;
}

.container {
    max-width: 650px;
}

.container h2 {
    margin-bottom: 20px;
}



.new-task-form {
    display: flex;
}

.new-task-form input {
    margin-right: 10px;
}

.container footer {
    margin: 40px 0;
    padding-top: 20px;
    border-top: 1px solid #ccc;
    color: #999;
}
</style>