'use client';

import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '@/components/core/button';
import { login } from './actions';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { LoginFormInputs, loginSchema } from './schema';
import { Image } from '@/components/core/image';
import Typography from '@/components/core/typography';

// Define the validation schema using zod

export default function LoginPageContent() {
  const { control, handleSubmit, formState: { errors }, setError } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });
  const searchParams = useSearchParams();
  const errorMessage = searchParams.get('error');
  const [toast, setToast] = useState<string | null>(null);

  // Show error message in a toast when there's an error query parameter
  useEffect(() => {
    if (errorMessage) {
      setToast(errorMessage);
      // Automatically hide toast after 3 seconds
      const timeout = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timeout);
    }
  }, [errorMessage]);

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const response = await login(data); 
      if (response?.error) {
        if (response?.error.code === 'invalid_credentials')
          console.log('sssssss')
        setError('email', {
          message: 'Email dan password salah'
        });
      } 
    } catch (err) {
      setToast('Failed to login. Please try again.');
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-white">
      {/* Toast Notification */}
      {toast && (
        <div className="absolute top-5 w-96 max-w-full px-4 py-2 text-white bg-red-500 rounded-md shadow-lg">
          {toast}
        </div>
      )}

      {/* Login Form */}
      <form
        className="flex flex-col items-center gap-4  rounded-md"
        style={{ maxWidth: "400px", width: '100%' }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <Image 
            src='/logo.png'
            alt='Logo'
            width={200}
            height={100}
            fill={false}
          />
        </div>
        <div className="flex flex-col gap-6 w-full" style={{ maxWidth: "400px" }}>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <div className="flex flex-col">
                <label htmlFor="email">
                  <Typography variant='body1'>
                    Email
                  </Typography>
                </label>
                <input
                  {...field}
                  id="email"
                  type="email"
                  placeholder="Tulis email disini"
                  className={`border outline-1 outline p-2 rounded-md ${errors.email ? 'border-red-500' : ''}`}
                />
                {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
              </div>
            )}
          />

          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <div className="flex flex-col">
                <Typography variant='body1'>
                    Password
                  </Typography>
                <input
                  {...field}
                  id="password"
                  type="password"
                  placeholder="Tulis password disini"
                  className={`border p-2 outline-1 outline rounded-md ${errors.password ? 'border-red-500' : ''}`}
                />
                {errors.password && (
                  <span className="text-red-500 text-sm">{errors.password.message}</span>
                )}
              </div>
            )}
          />
        </div>
        <Button type="submit" color="secondary" className='w-full uppercase'>
          Login
        </Button>
      </form>
    </div>
  );
}
