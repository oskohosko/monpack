export class Driver {
    _id: string;
    driver_id: string;
    driver_name: string;
    driver_department: string;
    driver_licence: string;
    driver_createdAt: string;
    driver_isActive: boolean;
    assigned_packages: any[];

    constructor() {
        this._id = '';
        this.driver_id = '';
        this.driver_name = '';
        this.driver_department = '';
        this.driver_licence = '';
        this.driver_isActive = false;
        this.driver_createdAt = '';
        this.assigned_packages = [];
    }


}