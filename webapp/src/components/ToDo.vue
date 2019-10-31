<template>
  <div class="todo columns">
    <b-checkbox v-model="todo.done" v-on:input="handleCheck" />
    <span class="todo-title column">
      <b>{{getCatName(todo.category)}}</b> - {{ todo.title }}
    </span>
    <b-button v-on:click="handleDelete">Delete</b-button>
  </div>
</template>

<script>
export default {
  name: "ToDo",
  props: {
    todo: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  methods: {
    handleCheck: function(value) {
      this.$store.dispatch("updateTodo", { ...this.todo, done: value });
    },
    handleDelete: function() {
      this.$store.dispatch("deleteTodo", this.todo);
    },
    getCatName: function(catId) {
      const matches = this.$store.state.categories.filter(function(category){
        if(category.id == catId) {
          return category;
        }
       });
       return (matches.length > 0) ? matches[0].name : "None";
    }
  }
};
</script>
