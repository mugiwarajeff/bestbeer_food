import { icons } from "react-icons";
import IModule from "../../Interfaces/IModule";
import styles from "./AsideMenu.module.scss";
import MenuItem from "./MenuItem/MenuItem";
import { FaUserAlt, FaUsers } from "react-icons/fa";
import { useState } from "react";

export default function AsideMenu(){

    const [selectedModule, setSelectedModule] = useState<IModule>();

    const modules: IModule[] = [
        {
            name: "Mesas", 
            link: "desks",
            icon: FaUserAlt
        }, 
        {
            name: "Pedidos",
            link: "orders",
            icon: FaUserAlt
        },
        {
            name: "Produtos",
            link: "products",
            icon: FaUserAlt
        },
        {
            name: "Estoque",
            link: "stocks",
            icon: FaUserAlt
        },
        {
            name: "Funcionários",
            link: "employers",
            icon: FaUsers
        }
    ];

    function testModulesEquals(module: IModule, selectedModule: IModule | undefined) : boolean {
        if(selectedModule !== undefined){
            if(module.icon === selectedModule.icon && module.name === selectedModule.name) {
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
                setModule={ () => {
                    console.log(module.name);
                    setSelectedModule(module);
                }}
                />
        )};

    </div>;
}