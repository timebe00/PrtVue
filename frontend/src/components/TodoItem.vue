<template>
    <div>
        <table>
            <tr v-for = "(txt, index) in todos" :key = "txt.id">
                <td>
                    <p v-if="txt.done" id="done" @click="TF(index)">true</p>
                    <p v-else id="done" @click="TF(index)">false</p>
                </td>
                <td>
                    <p>{{ txt.title }}</p>
                </td>
                <td>
                    <button>수정</button>
                </td>
                <td>
                    <button>삭제</button>
                </td>
            </tr> 
        </table>
    </div>
</template>
<script>
export default {
    name: "TodoItem",
    methods: {
        TF (index) {
            this.todos[index].done = !this.todos[index].done
            console.log("done : " + this.todos[index].done)
        },
    },
    props: {
        todos: {}
    }
}
</script>