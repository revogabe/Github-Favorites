export class GithubUser {
  static search(username) {
    const endpoint = `https://api.github.com/users/${user.name}`

    return fetch(endpoint)
    .then(data => data.json())
    .then(data => ({
      login: data.login,
      name: data.name,
      public_repos: data.public_repos,
      followers: data.followers
    }))
  }
}


export class Favorites {
  constructor(root) {
    this.root = document.querySelector(root)
    this.load()
  }

  load() {
    this.entries = JSON.parse(localStorage.getItem
      ("@github-favorites:")) || [] 
  }

  delete(user) {
    // higher-order functions
    const filterEntries = this.entries.filter(
      (entry) => entry.login !== user.login
    )

    this.entries = filterEntries
    this.update()
  }
}

// Classe que cria visualização
export class FavoritesView extends Favorites {
  constructor(root) {
    super(root)

    this.tbody = this.root.querySelector("table tbody")

    this.update()
  }

  update() {
    this.removeAllTr()

    this.entries.forEach((user) => {
      const row = this.creteRow()

      row.querySelector(
        ".user img"
      ).src = `https://github.com/${user.login}.png`
      row.querySelector(".user img").alt = `Profile image by ${user.name}`
      row.querySelector(".user p").textContent = user.name
      row.querySelector(".user span").textContent = `@${user.login}`
      row.querySelector(".repository").textContent = user.public_repos
      row.querySelector(".followers").textContent = user.followers

      row.querySelector(".buttonTrash").onclick = () => {
        const isOk = confirm("Tem certeza que deseja remover este usuário?")

        if (isOk) {
          this.delete(user)
        } else {
        }
      }

      this.tbody.append(row)
    })
  }

  creteRow() {
    const tr = document.createElement("tr")

    tr.innerHTML = `
              <td class="user">
                <img
                  src="https://github.com/maykbrito.png"
                  alt="Profile Image"
                />
                <a href="https://github.com/maykbrito">
                  <p>Daniel Gabriel</p>
                  <span>@gabezin</span>
                </a>
              </td>
              <td class="repository">26</td>
              <td class="followers">134</td>
              <td>
                <button class="buttonTrash">
                  <ion-icon name="trash"></ion-icon>
                </button>
              </td>
            </tr>
    `

    return tr
  }

  removeAllTr() {
    this.tbody.querySelectorAll("tr").forEach((tr) => {
      tr.remove()
    })
  }
}
