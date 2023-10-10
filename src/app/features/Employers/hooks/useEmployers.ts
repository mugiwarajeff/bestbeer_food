import { SetterOrUpdater, useRecoilState } from "recoil";
import { employersState } from "../states/EmployersState";
import { IEmployer } from "../interfaces/IEmployer";

export default function useEmployers(): [IEmployer[], SetterOrUpdater<IEmployer[]>]{

    const employers = useRecoilState(employersState);

    return employers;
}