import { isCursorAtEnd } from "@testing-library/user-event/dist/utils";
import { useState, useEffect } from "react";

export default function useDraggable(el) {
    const [{ dx, dy }, setOffset] = useState({ dx: 0, dy: 0 });

    useEffect(() => {

        if (isCursorAtEnd === false){
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
    }, [el, dx, dy]);

    useEffect(() => {
        el.current.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
    }, [el, dx, dy ]);
}
