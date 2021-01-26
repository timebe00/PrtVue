<template>
    <div>
        <button @click="createTodo">추가</button>
        <input 
            :value="title"
            placeholder="할 일 작성"
            type="text"
            @input="title = $event.target.value"
            @keypress.enter="createTodo(title)"/>
        <button @click="ATF(allTF)">{{ allTF }}</button>
        <button @click="Reset()">초기화</button>
    </div>
</template>
<script>
export default {
    name: "TodoCreate",
    data () {
        return {
            title: '',
            placeholder: "할 일 추가"
        }
    },
    methods: {
        createTodo () {
            const validatedTitle = this.title && this.title.trim()
            if(!validatedTitle) {
                console.log("유효 X"),
                validatedTitle.trim()
                return
            }
            this.$emit('create-todo', this.title)
            this.title = ''
        },
        Reset() {
            this.$emit('create-reset')
        },
        ATF (allTF) {
            console.log("ATF : " + allTF);
            if(allTF) {
                this.$emit('create-all-false', this.allTF)
            } else {
                this.$emit('create-all-true', this.allTF)
            }
        }
    },
    props: {
        allTF: Boolean
    }
}
</script>