import React, { useEffect, useRef } from 'react';

function Canvas(props) {
    const canvasRef = useRef(null);
    const pathsRef = useRef([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        let isDrawing = false;

        canvas.height = window.innerHeight / 2;
        canvas.width = window.innerWidth / 2;

        function startDrawing(event) {
            isDrawing = true;
            draw(event);
        }

        function stopDrawing() {
            isDrawing = false;
            pathsRef.current.push([]);
        }

        function draw(event) {
            if (!isDrawing) return;

            const currentPath = pathsRef.current[pathsRef.current.length - 1];
            const { clientX, clientY } = event;
            currentPath.push({ x: clientX - canvas.offsetLeft, y: clientY - canvas.offsetTop });

            context.clearRect(0, 0, canvas.width, canvas.height);

            pathsRef.current.forEach(path => {
                if (path.length > 0) {
                    context.beginPath();
                    context.moveTo(path[0].x, path[0].y);
                    path.forEach(point => {
                        context.lineTo(point.x, point.y);
                    });
                    context.strokeStyle = props.color; // Set color here
                    context.stroke();
                }
            });
        }

        canvas.addEventListener('mousedown', startDrawing);
        canvas.addEventListener('mousemove', startDrawing);
        canvas.addEventListener('mouseup', stopDrawing);
        canvas.addEventListener('mouseout', stopDrawing);

        return () => {
            canvas.removeEventListener('mousedown', startDrawing);
            canvas.removeEventListener('mousemove', draw);
            canvas.removeEventListener('mouseup', stopDrawing);
            canvas.removeEventListener('mouseout', stopDrawing);
        };
    }, [props.color]); // Include props.color in the dependency array

    return (
        <canvas ref={canvasRef} className='canvas bg-white'></canvas>
    );
}

export default Canvas;
