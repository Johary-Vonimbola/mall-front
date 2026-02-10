export class AuditField{
    
    constructor(
        public createdAt: Date,
        public updatedAt: Date
    ){
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

}