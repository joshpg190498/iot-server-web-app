export interface IParameter {
  id_parameter?: string;
  default_period?: number;
  table_pointer?: string;
  description?: string;
  has_threshold?: boolean;
  default_threshold_value?: number | null
}

export class Parameter implements IParameter {
  constructor(
    public id_parameter?: string,
    public default_period?: number,
    public table_pointer?: string,
    public description?: string,
    public has_threshold?: boolean,
    public default_threshold_value?: number | null
  ) {}
}