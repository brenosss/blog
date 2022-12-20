const token: string = "d861e6e59c496ee0b380b102668cce4565d8a54dc3f94539178fa0837278d518f2993010b886f13538e9b2730771045d2b46d038f8632c43a016bf1a58b1e9f2bb89bea44a02ad0032ecac4f91a188748e879e9b38f4c02e931fd07f39ec376b892f879b8388c39376d3009b90be3e07f720452d08bbfb3a5803619da7901750"
const baseUrl: string = "http://localhost:1337/api/"

export function get(resource: string) {
  return fetch(baseUrl + resource, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(res => res.json())
}