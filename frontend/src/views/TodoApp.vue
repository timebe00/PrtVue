<template>
    <div>
        <todo-creator 
            @create-todo = "createTodo" 
            @create-reset = "Reset" 
            @create-all-true = "allTrue" 
            @create-all-false = "allFalse"
            :allTF = "allTF"/>
        <todo-item :todos = "initdata"/>
    </div>
</template>
<script>
import lowdb from 'lowdb'
import LocalStrage from 'lowdb/adapters/LocalStorage'
import cryptoRandomString from 'crypto-random-string'

import TodoCreator from '@/components/TodoCreate' 
import TodoItem from '@/components/TodoItem'

export default {
    name: "TodoApp",
    components: {
        TodoCreator,
        TodoItem
    },
    methods: {
        initDB () {
            const adapter = new LocalStrage('todo-app') //  DB
            this.db = lowdb(adapter)
            console.log(this.db)
            //  로컬 DB초기화
            this.db.defaults({
                todos: []   //  넣을 것 : Collection
            }).write()
        },
        createTodo (title) {
            console.log("createTodo")
            const newTodo = {
                //  랜덤 문자열 생성(10개 문자 생성)
                id: cryptoRandomString({length: 10}),
                title,
                createAt: new Date(),
                updatedAt: new Date(),
                done: false
            }
            this.db
                .get('todos')   //  lodsh
                .push(newTodo)  //  lodsh
                .write()        //  lodsh
            this.initdata = []
            for(let i = 0; i < this.db.get('todos').value().length; i++) {
                this.initdata.push(this.db.get('todos').value()[i])
            }
        },
        Reset () {
            this.db.get('todos').remove().write()
            this.initdata.splice(0)
        },
        allTrue (allTF) {
            this.initdata = []
            for(let i = 0; i < this.db.get('todos').value().length; i++) {
                if(!this.db.done) {
                     this.db.get('todos').value()[i].done = true
                }
                this.initdata.push(this.db.get('todos').value()[i])
            }
                this.allTF = !allTF
        },
        allFalse (allTF) {
            console.log("allFalse : " + this.allTF)
            this.initdata = []
            for(let i = 0; i < this.db.get('todos').value().length; i++) {
                if(!this.db.done) {
                   this.db.get('todos').value()[i].done = false
                }
                this.initdata.push(this.db.get('todos').value()[i])
            }
                this.allTF = !allTF
        }
    },
    data () {
        return{
            db: null,
            setTodo: [],
            initdata: null,
            allTF: false
        }
    },
    created () {
        this.initDB()
    },
    mounted() {
        console.log("mounted")
        this.initdata = this.db.get('todos').value()
        console.log(this.db.get('todos').value().length)
    }

}
</script>