const token: string = process.env.BACKEND_TOKEN
const baseUrl: string = process.env.BACKEND_URL

export function getStrapiProfile(): Promise<StrapiResponse<Profile>> {
  const PATH = 'perfil?populate=*'
  return get(PATH)
}

export function getWorkExperiences(): Promise<StrapiResponse<WorkExperience>>{
  const PATH = 'work-experiences/?populate=*'
  return get(PATH)
}

export function getArticles(): Promise<StrapiResponse<Articles>>{
  const PATH = 'articles/'
  return get(PATH)
}

export function getArticle(id: string): Promise<StrapiResponse<Article>>{
  const PATH = 'articles/'
  return get(PATH)
}

export function getTextSection(page: string): Promise<StrapiResponse<TextSection>>{
  const PATH = `text-sections/?filters[page][$eq]=${page}&populate=*`
  return get(PATH)
}

export function get(resource: string) {
  return fetch(baseUrl + resource, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(res => res.json())
}