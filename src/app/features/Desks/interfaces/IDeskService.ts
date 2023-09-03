import { IDesk } from "./IDesk";

export interface IDeskService {
    getAllDesks() : Promise<IDesk[]>;
    deleteDesk(id: number) : Promise<IDesk>;
    updateDesk(desk: IDesk): Promise<IDesk>;
    create(desk: IDesk): Promise<IDesk>;
};