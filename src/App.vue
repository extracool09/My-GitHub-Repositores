<template>
  <div class="container">
    <h1>My Github Repositories</h1>
    <div class="repositories">
      <div class="repository" v-for="repo in displayedRepositories" :key="repo.id">
        <h2>{{ repo.name }}</h2>
        <p>{{ repo.description }}</p>
        <p>Language: {{ repo.language }}</p>
        <p>Stars: {{ repo.stargazers_count }}</p>
      </div>
    </div>
    <div class="pagination">
      <button v-if="page > 1" @click="prevPage()">Prev</button>
      <button v-if="page * perPage < repositories.length" @click="nextPage()">Next</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      repositories: [],
      page: 1,
      perPage: 5
    }
  },
  mounted() {
    this.fetchRepositories()
  },
  computed: {
    displayedRepositories() {
      const start = (this.page - 1) * this.perPage
      const end = start + this.perPage
      return this.repositories.slice(start, end)
    }
  },
  methods: {
    fetchRepositories() {
      const apiUrl = 'https://api.github.com/users/extracool09/repos'

      fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
          this.repositories = data
        })
        .catch(error => console.error(error))
    },
    nextPage() {
      this.page++
    },
    prevPage() {
      this.page--
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

.repositories {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
}

.repository {
  border: 1px solid #8d2323;
  border-radius: 10px;
  padding: 20px;
  max-width: 300px;
}

.pagination {
  margin-top: 20px;
}
</style>
