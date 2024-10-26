import { Grade } from "./grade.model"

export interface Levels {
    id: number
    name: string
    createdAt: string
    updatedAt: string
    deletedAt: string
    grades: Grade[]
  }