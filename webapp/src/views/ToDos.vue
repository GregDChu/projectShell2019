<template>
  <div class="todos">
    <div class="columns is-centered">
      <div class="column is-half is-block">
        <h5 class="is-5 title">My ToDos</h5>
      </div>
    </div>
    <div class="columns is-centered">
      <div class="column is-half">
        <template v-for="todo in todos">
          <ToDo :key="todo.id" :todo="todo"/>
        </template>
      </div>
    </div>
    <section class="newTodo columns is-centered">
      <div class="column is-half">
        <h5 class="title is-5">New ToDo</h5>
        <form v-on:submit.prevent="onSubmit">
          <b-field label="Title">
            <b-input v-model="newTodo.title" />
          </b-field>
          <b-field>
            <select id="cat-dropdown" text="Category" v-model="newTodo.category">
              <option disabled value="-1">Category</option>
              <option v-for="cat in cats" :key="cat.id" :value="cat.id">{{cat.name}}</option>
            </select>
          </b-field>
          <b-field>
            <div class="control is-block">
              <input type="submit" class="button is-link" value="Submit" />
            </div>
          </b-field>
        </form>
      </div>
    </section>
  </div>
</template>

<script>
import ToDo from "@/components/ToDo.vue";
export default {
  name: "ToDos",
  data: function() {
    return {
      newTodo: {
        title: null,
        category: -1
      }
    };
  },
  computed: {
    todos() {
      return this.$store.state.todos;
    },
    cats() {
      //return [{id: 1, name: "hello"}, {id: 2, name: "hi"}];
      return this.$store.state.categories;
    }
  },
  components: {
    ToDo
  },
  methods: {
    onSubmit() {
      this.$store.dispatch("addToDo", this.newTodo).then(() => {
        this.newTodo.title = null;
        this.newTodo.category = "-1";
      });
    }
  },
  mounted: function() {
    this.$store.dispatch("loadCategories").catch(() => {
      this.$router.push("/");
    })
    this.$store.dispatch("loadToDos").catch(() => {
      // if we are not logged in redirect home
      this.$router.push("/");
    })
  }
};
</script>

<style scoped>
#cat-dropdown {
  width: 100px;
  height: 30px;
  font-weight: bold;
  border-radius: 5px;
  background-color: #42b983;
  border-color: black;
}

#cat-dropdown option {
  background-color: white;
}
</style>