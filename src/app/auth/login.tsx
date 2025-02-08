"use client"
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";



type Props ={
  onLogin: () => void;
}


const Login= ({ onLogin } :Props)  => {
  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
      <Card className="w-full max-w-md dark:bg-gray-800">
        <CardContent className="p-6">
          <h1 className="text-2xl font-bold mb-6 text-center dark:text-white">Login</h1>
          <form onSubmit={handleSubmit} className="space-y-4  dark:text-white">
            <div>
              <label className="block text-sm font-medium mb-1 ">Email</label>
              <Input type="email" placeholder="seu@email.com" required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Senha</label>
              <Input type="password" placeholder="********" required />
            </div>
            <Button type="submit" className="w-full">
              Entrar
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;