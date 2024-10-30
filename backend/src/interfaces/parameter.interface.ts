export interface Parameter {
  id_parameter: string
  default_period: number
  table_pointer: string
  description: string
  has_threshold: boolean
  default_threshold_value: number | null
}