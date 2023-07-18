import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import styles from "./CircularProgress.module.scss";
import { useState, useEffect } from "react";

export default function CircularProgress() {

    const [rotation, setRotation] = useState<number>(0);

    const animateProgressBar = () => {
        setRotation((oldValue) => oldValue += 0.01);
        if (rotation == 1) {
            setRotation(0);
        }
    };

    useEffect(() => { setTimeout(animateProgressBar, 10); }, [rotation]);




    return <CircularProgressbar
        className={styles.circularProgress}
        value={25}
        strokeWidth={8}
        counterClockwise={false}
        styles={
            buildStyles({ rotation: rotation, pathColor: "#1f1959", trailColor: "transparent" })
        }
    />;
}
