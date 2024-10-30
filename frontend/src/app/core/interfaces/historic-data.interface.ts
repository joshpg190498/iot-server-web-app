export interface IHistoricData {
  oneDay?: any;
  sevenDays?: any;
  oneMonth?: any;
  sixMonths?: any
}

export class HistoricData implements IHistoricData {
  constructor(
    public oneDay?: any,
    public sevenDays?: any,
    public oneMonth?: any,
    public sixMonths?: any
  ) {}
}