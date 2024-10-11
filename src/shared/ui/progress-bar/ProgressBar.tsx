'use client'
import { FC, useEffect, useRef, useState } from "react";
import { classNames } from "@/shared/lib/helpers/classNames";
import Image from "next/image";

const ProgressBar: FC = () => {
    const [isProgressing, setIsProgressing] = useState<boolean>(false);
    const [isCompleted, setIsCompleted] = useState<boolean>(false);
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const [angle, setAngle] = useState<number>(0); // Угол анимации
    const duration = 5; // Длительность анимации
    const animationRef = useRef<number>(0); // Ссылка для requestAnimationFrame

    const percentage = Math.round((angle / 360) * 100); // Вычисляем проценты
    const imageUrl = "https://i.imghippo.com/files/huQ0U1728667022.jpg";

    const handleStart = () => {
        // Если анимация уже идет, ничего не делаем
        if (isProgressing) {
            return;
        }

        // Подготовка к анимации
        setIsProgressing(true);
        setIsCompleted(false);
        setAngle(0); // Сброс угла
        startAnimation(); // Запуск анимации
    };

    const handleAnimationEnd = () => {
        // По завершении анимации
        setIsCompleted(true);
        setIsProgressing(false); // Останавливаем анимацию после завершения
        cancelAnimationFrame(animationRef.current)
    };

    const startAnimation = () => {
        // Функция для запуска анимации
        const step = () => {
            setAngle((prevAngle) => {
                console.log(prevAngle);
                if (prevAngle >= 360) {
                    handleAnimationEnd(); // Завершение анимации
                    return 360; // Чтобы не превышать
                }
                return prevAngle + (360 / (duration * 60)); // Обновляем угол
            });
            animationRef.current = requestAnimationFrame(step);
        };
        animationRef.current = requestAnimationFrame(step); // Запускаем анимацию
    };

    useEffect(() => {
        return () => {
            cancelAnimationFrame(animationRef.current); // Очищаем анимацию при размонтировании
        };
    }, []);

    const conicEffectStyle = {
        position: "relative",
        zIndex: 1,
        borderRadius: "21.5px",
        background: `conic-gradient(#22c55e ${angle}deg, transparent ${angle}deg)` // Используем шаблонные строки
    } as React.CSSProperties;

    return (
        <div className="flex flex-col items-center mt-10">
            <button onClick={handleStart} className="mb-4 p-2 bg-blue-500 text-white rounded">
                Старт
            </button>
            <button onClick={() => setAngle(Math.random() * 360)} className="mb-4 p-2 bg-blue-500 text-white rounded">
            random
            </button>
            <div className="conic-effect w-48 h-48 p-1 flex justify-center items-center" style={conicEffectStyle}>
                <div className="relative w-full h-full bg-background border border-gray-300 rounded-[18px] flex items-center justify-center overflow-hidden">
                    <div className="absolute text-green-500 font-bold">
                        {isProgressing && <span>{percentage}%</span>} {/* Упрощенное условие */}
                    </div>
                    <Image
                        src={imageUrl}
                        alt="image"
                        width={100}
                        height={100}
                        className={classNames(
                            "w-full aspect-square object-cover",
                            "transition duration-500 ease-in-out",
                            isImageLoaded && isCompleted ? "opacity-100" : "opacity-0"
                        )}
                        onLoad={() => setIsImageLoaded(true)}
                    />
                </div>
            </div>
        </div>
    );
};

export default ProgressBar;
