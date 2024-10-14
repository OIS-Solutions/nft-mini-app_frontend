'use client'
import { FC, useEffect, useRef, useState } from "react";
import { classNames } from "@/shared/lib/helpers/classNames";
import Image from "next/image";

type TImageProgressWrapperProps = {
    loading: boolean,
    imageUrl: string | undefined,
}
export const ImageProgressWrapper: FC<TImageProgressWrapperProps> = ({ imageUrl, loading }) => {
    const [isProgressing, setIsProgressing] = useState<boolean>(false);
    const [isCompleted, setIsCompleted] = useState<boolean>(false);
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const [angle, setAngle] = useState<number>(0); // Угол анимации
    const duration = 5; // Длительность анимации
    const animationRef = useRef<number>(0); // Ссылка для requestAnimationFrame

    const percentage = Math.round((angle / 360) * 100); // Вычисляем проценты

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

    useEffect(() => {
        loading && handleStart()
    }, [loading])

    const conicEffectStyle = {
        position: "relative",
        zIndex: 1,
        borderRadius: "21.5px",
        background: `conic-gradient(#4f46e5 ${angle}deg, transparent ${angle}deg)` // Используем шаблонные строки
    } as React.CSSProperties;

    return (
        <div className="flex flex-col items-center w-full h-full">
            <div className="conic-effect w-full h-full p-1 flex justify-center items-center" style={conicEffectStyle}>
                <div className="relative w-full h-full bg-background border border-gray-300 shadow-sm rounded-[18px] flex items-center justify-center overflow-hidden">
                    <div className="absolute text-green-500 font-bold">
                        {isProgressing && <span>{percentage}%</span>} {/* Упрощенное условие */}
                    </div>
                    {imageUrl && <Image
                        src={imageUrl}
                        alt="image"
                        width={100}
                        height={100}
                        className={classNames(
                            "w-full aspect-square object-contain",
                            "transition duration-500 ease-in-out",
                        )}
                        onLoad={() => setIsImageLoaded(true)}
                    />}
                </div>
            </div>
        </div>
    );
};