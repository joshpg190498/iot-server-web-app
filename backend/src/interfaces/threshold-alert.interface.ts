export interface ThresholdAlert {
  id: number
  id_device: string
  id_parameter: string
  table_pointer: string
  id_reference: number
  data: string
  email_sent: boolean
  created_at_utc: string
}