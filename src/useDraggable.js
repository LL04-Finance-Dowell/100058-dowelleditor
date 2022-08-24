import { useState, useEffect } from "react";
import { useStateContext } from "./contexts/contextProvider";

export default function useDraggable(el) {
    const [{ dx, dy }, setOffset] = useState({ dx: 0, dy: 0 });

    const { isResizing } = useStateContext();


    useEffect(() => {
        if (isResizing === false) {
            const handleMouseDown = e => {
                const startX = e.pageX - dx;
                const startY = e.pageY - dy;

                const handleMouseMove = e => {
                    const newDx = e.pageX - startX;
                    const newDy = e.pageY - startY;
                    setOffset({ dx: newDx, dy: newDy });
                }

                document.addEventListener("mousemove", handleMouseMove);

                document.addEventListener("mouseup", () => {
                    document.removeEventListener("mousemove", handleMouseMove);
                },
                    { once: true }
                );
            }

            el.current.addEventListener("mousedown", handleMouseDown);

            return () => {
                el.current.removeEventListener("mousedown", handleMouseDown);
            };
        }
    }, [isResizing, el, dx, dy, setOffset]);


    useEffect(() => {
        if (isResizing === false) {
            el.current.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
        }
    }, [isResizing, el, dx, dy]);

}
