var EventBus = new Vue;
Vue.component('app-icon',{
    template:'<span :class="cssClasses" aria-hidden="true"></span>',
    props:['img'],
    computed:{
        cssClasses: function(){
            return 'glyphicon glyphicon-'+this.img;
        }
    }
});
Vue.component('app-task',{
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
});
var vm = new Vue({
    el: '#app',
    data:{
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
});