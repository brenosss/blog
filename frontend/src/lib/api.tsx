const token: string = "ebdb046e41abf67f74a87b3499ec45211a350125a0809bbf0c9628872ad636c792a162890ed9346f4ba311e82ebff25a5cb2b8fd13f7a7a218d706f01721d7427ce42045c458da61fab2c0f2ae6938128f11159fa3d0de2e8a428e7d3d15e03a6705383043b48d8e8c02866a94d2d19c67d0dacfcd977f9fd9546d4e660c2c49"
const baseUrl: string = "http://localhost:1337/api/"

export function get(resource: string) {
  return fetch(baseUrl + resource, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(res => res.json())
}