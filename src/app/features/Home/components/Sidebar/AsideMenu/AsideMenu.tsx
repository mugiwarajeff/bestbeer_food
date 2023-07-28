
import styles from "./AsideMenu.module.scss";
import MenuItem from "./MenuItem/MenuItem";
import { FaUsers, FaTruckRampBox, FaMoneyCheckDollar } from "react-icons/fa6";
import { BsBoxSeam } from "react-icons/bs";
import { SiAirtable } from "react-icons/si";
import { useState } from "react";
import IModule from "app/features/Home/Interfaces/IModule";

export default function AsideMenu() {

    const [selectedModule, setSelectedModule] = useState<IModule>();

    const modules: IModule[] = [
        {
            name: "Mesas",
            link: "desks",
            icon: SiAirtable
        },
        {
            name: "Pedidos",
            link: "orders",
            icon: FaMoneyCheckDollar
        },
        {
            name: "Produtos",
            link: "products",
            icon: BsBoxSeam
        },
        {
            name: "Estoque",
            link: "stocks",
            icon: FaTruckRampBox
        },
        {
            name: "Funcionários",
            link: "employers",
            icon: FaUsers
        }
    ];

    function testModulesEquals(module: IModule, selectedModule: IModule | undefined): boolean {
        if (selectedModule !== undefined) {
            if (module.icon === selectedModule.icon && module.name === selectedModule.name) {
                return true;
            }
        }

        return false;
    }

    return <div className={styles.asideMenu}>
        {modules.map(
            (module) => <MenuItem
                key={module.name}
                icon={module.icon}
                navigateTo={module.link}
                label={module.name}
                selected={testModulesEquals(module, selectedModule)}
                setModule={() => {
                    console.log(module.name);
                    setSelectedModule(module);
                }}
            />
        )};

    </div>;
}