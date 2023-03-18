<template>
    <div>
      <h1>{{ repository.name }}</h1>
      <p>{{ repository.description }}</p>
      <p>Language: {{ repository.language }}</p>
      <p>Stars: {{ repository.stargazers_count }}</p>
    </div>
  </template>
  
  <script>
  export default {
    name: 'RepositoryDetails',
    data() {
      return {
        repository: {}
      }
    },
    mounted() {
      this.fetchRepository()
    },
    methods: {
      fetchRepository() {
        const repoId = this.$route.params.repoId
        const apiUrl = `https://api.github.com/repositories/${repoId}`
  
        fetch(apiUrl)
          .then(response => response.json())
          .then(data => {
            this.repository = data
          })
          .catch(error => console.error(error))
      }
    }
  }
  </script>
  
  <style>
    h1 {
      font-size: 24px;
    }
    p {
      font-size: 18px;
      margin-bottom: 10px;
    }
  </style>
  