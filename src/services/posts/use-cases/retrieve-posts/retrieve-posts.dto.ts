export interface RetrievePostsResponseDTO {
  posts: Post[]
}

export interface Post {
  id: string
  user: User
  content: Content
}

export interface User {
  id: string
}

export interface Content {
  title: string
  body: string
}
