<template>
    <div class="card">
      <h1>My GitHub Repositories</h1>
      <ul>
        <li v-for="repo in repositories" :key="repo.id">
          <router-link :to="{ 
            name: 'RepositoryDetails', 
            params: { repoId: repo.id } }" 
            target = "_blank">{{ repo.name }}</router-link>
        </li>
      </ul>
      <div v-if="totalPages > 1">
        <button :disabled="page === 1" @click="previousPage">Previous</button>
        <button :disabled="page === totalPages" @click="nextPage">Next</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'RepositoryList',
    data() {
      return {
        repositories: [],
        page: 1,
        perPage: 5,
        totalPages: 1
      }
    },
    mounted() {
      this.fetchRepositories()
    },
    methods: {
      fetchRepositories() {
        const apiUrl = `https://api.github.com/users/extracool09/repos?page=${this.page}&per_page=${this.perPage}`
  
        fetch(apiUrl)
          .then(response => {
            const linkHeader = response.headers.get('Link')
            if (linkHeader) {
              const links = linkHeader.split(', ')
              const lastPageLink = links.find(link => link.includes('rel="last"'))
              if (lastPageLink) {
                const lastPageUrl = lastPageLink.match(/<([^>]+)>/)[1]
                const lastPageParams = new URLSearchParams(lastPageUrl.split('?')[1])
                this.totalPages = parseInt(lastPageParams.get('page'))
              }
            }
            return response.json()
          })
          .then(data => {
            this.repositories = data
          })
          .catch(error => console.error(error))
      },
      previousPage() {
        this.page--
        this.fetchRepositories()
      },
      nextPage() {
        this.page++
        this.fetchRepositories()
      }
    }
  }
  </script>
  
  <style>
  * {
  box-sizing: border-box;
  margin: 20;
  padding: 10;
}

    h1 {
      font-size: 24px;
    }
    li {
  border: 1px solid #8d1919;
  border-radius: 5px;
  padding: 10px;
  margin: 10px;
  width: 300px;
  min-height: 30px;
  text-align: center;
    }

  </style>
  