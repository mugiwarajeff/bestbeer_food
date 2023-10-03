import { IDesk } from "./IDesk";

export interface IDeskService {
    getAllDesks(): Promise<IDesk[]>;
    deleteDesk(id: number): Promise<IDesk | undefined>;
    updateDesk(desk: IDesk): Promise<IDesk | undefined>;
    create(desk: {description: string, available: boolean}): Promise<IDesk | undefined>;
}