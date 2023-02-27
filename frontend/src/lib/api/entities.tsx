type StrapiResponse<T> = {
  data: {
    attributes: T
    id: string
  }
  meta: {
    pagination: {
      page: number
      pageCount: number
      pageSize: number
      total: number
    }
  }
}
  
type Profile = {
}

type WorkExperience = {
}

type Articles = {
}

type Article = {
}

type TextSection = {
}
  
  