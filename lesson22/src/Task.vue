<template>
    <li             
        class="list-group-item"
        :class="{editing:editing, completed:!task.pending}">
        <a @click="toggleStatus">
            <app-icon :img="task.pending ? 'unchecked':'check'"></app-icon>
        </a>

        
        <template v-if="!editing">
            <span  class="description">{{task.description}}</span>
            <div>
                <a @click="edit">
                    <app-icon img="edit"></app-icon>                             
                </a>
                <a @click="remove">
                    <app-icon img="trash"></app-icon>                                
                </a>
            </div>
        </template>
        <template v-else>
            <input  type="text" v-model="draft">
            <div>                
                <a @click="update" href="#">
                    <app-icon img="ok"></app-icon>                               
                </a>
                <a @click="discard">
                    <app-icon img="remove"></app-icon>                                
                </a>
            </div>
        </template>                                    
    </li>
</template>
<script>
import EventBus from './event-bus.js'
import Icon from './icon.vue'
export default    {
    components:{
        'app-icon':Icon
    },
    data: function(){
        return{
            editing:false,
            draft:'',
        }
    },
    template:'#task-template',
    props:['task','index'],
    created:function(){
        
        EventBus.$on('editando',function(index){
            console.log("asdasd")
            if(this.index!=index)
                this.discard();
        }.bind(this));
    },
    methods:{
        toggleStatus:function(){
           this. task.pending=!this.task.pending
        },
        edit:function(){
            /*
            this.tasks.forEach(function(task) {
                task.editing=false
            }, this);*/
            EventBus.$emit('editando',this.index)
            this.editing=true;
            this.draft=this.task.description;
        
        },
        update:function(){
            this.task.description=this.draft;
            this.editing=false;
        },
        discard:function(){
            this.editing=false
        },
        remove:function(){
            //vm.tasks.splice(this.index,1);
            this.$emit('removertarea',this.index);
        },
       
    }
}
</script>
<style>
.tasks {
    margin-bottom: 40px;
}

.tasks a {
    text-decoration: none;
}

.tasks li {
    display: flex;
    justify-content: space-between;
}

.tasks li.editing {
    box-shadow: inset 0 0 5px #999;
}

.tasks input, .tasks .description {
    flex: 1;
    padding: 0 5px;
}

.tasks input {
    border: 0;
}

.tasks input:focus {
    outline: none;
}

.completed .description {
    text-decoration: line-through;
}

.completed, .completed a {
    color: #999;
}
</style>