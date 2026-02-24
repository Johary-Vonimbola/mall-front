export class BestProduct {
  constructor(
    public _id: string,
    public name: string,
    public quantity: number
  ){}
}

export class SalesByMonth {
  constructor(
    public month: number,
    public total: number
  ){}
}

export class DashboardShop {
  constructor(
    public chiffreAffaire: number,
    public previousMonthCA: number,
    public evolutionCA: number,
    public bestProduct: BestProduct | null,
    public rent: number,
    public profit: number,
    public salesByMonth: SalesByMonth[]
  ){}
}