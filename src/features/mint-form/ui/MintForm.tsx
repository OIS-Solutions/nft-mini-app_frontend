'use client'; // Компонент клиентский

import React, { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { classNames } from '@/shared/lib/helpers/classNames';
import Image from 'next/image';
import { TFormData } from '../types';
import { CustomButton } from '@/shared/ui/CustomButton';

type TNftFormProps = {
    onSubmit: (data: TFormData) => void;
    loading: boolean;
    isFinished: boolean;
}

export const NFTForm: FC<TNftFormProps> = ({ onSubmit, loading=false, isFinished=false }) => {
    const { register, handleSubmit, formState: { errors }, setError, clearErrors, reset } = useForm<TFormData>();
    //const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [previewImage, setPreviewImage] = useState<string>();
    const [imageFile, setImageFile] = useState<File>();

    // Функция для скрытия клавиатуры — убирает фокус
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' || e.key === 'Return') { // Для мобильных клавиатур
            e.preventDefault(); // Отменяем стандартное поведение (отправка формы)
            (e.target as HTMLInputElement).blur(); // Убираем фокус с инпута, что скрывает клавиатуру
        }
    };

    // Предварительный просмотр изображения
    const handleImagePreview = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            // Валидация типа файла
            const validFormats = ['image/jpeg', 'image/png', 'image/webp'];
            if (!validFormats.includes(file.type)) {
                setError('imageFile', { type: 'manual', message: 'Invalid file format. Only JPEG and PNG are allowed.' });
                return;
            }

            // Валидация размера файла (например, не больше 5MB)
            const maxSizeInMB = 5;
            if (file.size / (1024 * 1024) > maxSizeInMB) {
                setError('imageFile', { type: 'manual', message: `File size exceeds ${maxSizeInMB}MB limit.` });
                return;
            }

            // Если все ок, очищаем ошибки
            clearErrors('imageFile');
            setImageFile(file)
            const previewUrl = URL.createObjectURL(file);
            setPreviewImage(previewUrl);
        }
    };

    // Отправка формы
    const handleSubmitForm = async (data: TFormData) => {

        if (!imageFile/*  || !data.imageFile || !data.imageFile[0] */) {
            alert("Please select an image.");
            return;
        }
        try {
            const nftData = {
                name: data.name,
                imageFile: imageFile,
            };
            onSubmit(nftData);
        } catch (error) {
            console.error('Error creating NFT:', error);
        }
    };

    useEffect(() => {
        console.log('jwt', process.env.NEXT_PUBLIC_PINATA_JWT);
        
        if (isFinished) {
            reset()
            setImageFile(undefined)
            setPreviewImage(undefined)
        }
    }, [isFinished, reset])

    return (
        <div className="max-w-lg w-full p-6 bg-background">
            <form onSubmit={handleSubmit(handleSubmitForm)}>
                {/* Поле имени */}
                <div className="mb-4">
                    <input
                        type="text"
                        inputMode="text"
                        enterKeyHint='next'
                        className={`mt-1 block w-full px-3 py-2 bg-gray-100 border ${errors.name ? 'border-red-300' : 'border-gray-300'} rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300`}
                        {...register('name', { required: true, maxLength: 100 })}
                        placeholder="Enter NFT name"
                        autoComplete="off"
                        onKeyDown={handleKeyDown}
                        capture
                    />
                    {errors.name?.type === 'required' && <p className="text-red-300 text-sm mt-1">Name is required.</p>}
                    {errors.name?.type === 'maxLength' && <p className="text-red-300 text-sm mt-1">Name cannot exceed 100 characters.</p>}
                </div>

                {/* Поле загрузки изображения */}
                <div className="mb-4 aspect-square bg-background relative">
                    <label htmlFor="image" className='relative flex w-full h-full border rounded-xl overflow-hidden border-gray-500'>
                        {!previewImage && (
                            <p className={classNames(
                                'absolute z-10 top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 font-bold text-2xl uppercase text-center',
                                errors.imageFile ? "text-red-300" : "text-gray-300",
                            )}>
                                {errors.imageFile
                                    ? "Please, choose the image"
                                    : "Tap here to upload image"
                                }
                            </p>
                        )}
                        {previewImage && <Image src={previewImage} alt='preview' width={100} height={100} className='w-full h-full object-contain' />}
                    </label>
                    <input
                        type="file"
                        hidden
                        id="image"
                        className='absolute w-full h-full opacity-0 cursor-pointer'
                        {...register('imageFile', { required: 'Image is required' })}
                        onChange={handleImagePreview}
                    />
                </div>

                {/* Кнопка отправки */}
                <div className='flex flex-col'>
                    <CustomButton htmlType='submit' color="purple" extraClass="text-white" disabled={loading}>
                        {loading ? "Booping" : "Boop NFT"}
                    </CustomButton>
                </div>
            </form>
        </div>
    );
}