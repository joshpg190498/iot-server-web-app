export interface IThresholdAlert {
  id?: number
  id_device?: string
  id_parameter?: string
  table_pointer?: string
  id_reference?: number
  data?: string
  email_sent?: boolean
  created_at_utc?: string
}

export class ThresholdAlert implements IThresholdAlert {
  constructor(
    public id?: number,
    public id_device?: string,
    public id_parameter?: string,
    public table_pointer?: string,
    public id_reference?: number,
    public data?: string,
    public email_sent?: boolean,
    public created_at_utc?: string
  ) {}
}