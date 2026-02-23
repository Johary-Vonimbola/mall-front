export class DashboardStats {
    constructor(
        public totalShops: number,
        public activeShops: number,
        public totalUsers: number
    ){}
}

export class MonthlyRent {
    constructor(
        public month: number,
        public paid: number,
        public unpaid: number
    ){}
}

export class ShopSummary {
    constructor(
        public shopId: string,
        public shopName: string,
        public totalPaid: number,
        public totalUnpaid: number
    ){}
}

export class AdminDashboard {
    constructor(
        public stats: DashboardStats,
        public monthlyRent: MonthlyRent[],
        public shopSummary: ShopSummary[]
    ){}
}