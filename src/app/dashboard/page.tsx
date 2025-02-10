"use client"
import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, DollarSign, TrendingUp, ShoppingCart, Search } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ThemeToggle from '@/components/ThemeToggle';


type Props = {
    onLogout: () => void;
}



 const  Dashboard = ({ onLogout }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 5;

  const chartData = [
    { name: 'Jan', vendas: 4000, clientes: 2400 },
    { name: 'Fev', vendas: 3000, clientes: 1398 },
    { name: 'Mar', vendas: 2000, clientes: 9800 },
    { name: 'Abr', vendas: 2780, clientes: 3908 },
    { name: 'Mai', vendas: 1890, clientes: 4800 },
    { name: 'Jun', vendas: 2390, clientes: 3800 },
  ];

  const usuarios = [
    { id: 1, nome: 'João Silva', email: 'joao@email.com', status: 'Ativo', ultimoAcesso: '2024-02-06' },
    { id: 2, nome: 'Maria Santos', email: 'maria@email.com', status: 'Inativo', ultimoAcesso: '2024-02-05' },
    { id: 3, nome: 'Pedro Costa', email: 'pedro@email.com', status: 'Ativo', ultimoAcesso: '2024-02-06' },
    { id: 4, nome: 'Ana Oliveira', email: 'ana@email.com', status: 'Ativo', ultimoAcesso: '2024-02-04' },
    { id: 5, nome: 'Carlos Souza', email: 'carlos@email.com', status: 'Inativo', ultimoAcesso: '2024-02-03' },
    { id: 6, nome: 'Julia Lima', email: 'julia@email.com', status: 'Ativo', ultimoAcesso: '2024-02-02' },
    { id: 7, nome: 'Lucas Mendes', email: 'lucas@email.com', status: 'Ativo', ultimoAcesso: '2024-02-01' },
  ];

  const filteredUsers = usuarios.filter(user => 
    user.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pageCount = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold dark:text-white">Dashboard</h1>
          <div className="flex items-center gap-4">
          <ThemeToggle />
          <Button 
           onClick={onLogout}>Sair</Button>
        </div>
        </div>
        
        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-white dark:bg-gray-800">
        <CardContent className="p-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500 dark:text-gray-400 font-semibold">Vendas Totais</p>
              <p className="text-2xl font-bold dark:text-white">R$ 54.350</p>
              <p className="text-sm text-green-500">+12% em relação ao mês anterior</p>
            </div>
            <DollarSign className="text-blue-500" size={24} />
          </div>
        </CardContent>
      </Card>
          
          <Card  className="bg-white dark:bg-gray-800">
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-500 dark:text-gray-400 font-semibold">Novos Clientes</p>
                  <p className="text-2xl font-bold dark:text-white">145</p>
                  <p className="text-sm text-green-500">+5% em relação ao mês anterior</p>
                </div>
                <Users className="text-green-500" size={24} />
              </div>
            </CardContent>
          </Card>
          
          <Card  className="bg-white dark:bg-gray-800">
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-500 dark:text-gray-400 font-semibold">Taxa de Conversão</p>
                  <p className="text-2xl font-bold dark:text-white">12.5%</p>
                  <p className="text-sm text-red-500">-2% em relação ao mês anterior</p>
                </div>
                <TrendingUp className="text-purple-500" size={24} />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white dark:bg-gray-800">
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-500 dark:text-gray-400 font-semibold">Pedidos</p>
                  <p className="text-2xl font-bold dark:text-white">290</p>
                  <p className="text-sm text-green-500">+8% em relação ao mês anterior</p>
                </div>
                <ShoppingCart className="text-orange-500" size={24} />
              </div>
            </CardContent>
          </Card>
        </div>

       {/* O Gráfico */}
       <Card className="dark:bg-gray-800">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-4 dark:text-white">Desempenho</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid 
                    strokeDasharray="3 3" 
                    stroke="rgba(156, 163, 175, 0.2)" 
                    className="dark:opacity-20"
                  />
                  <XAxis 
                    dataKey="name" 
                    stroke="currentColor"
                    className="dark:text-gray-400"
                  />
                  <YAxis 
                    stroke="currentColor"
                    className="dark:text-gray-400"
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'var(--tooltip-bg)',
                      borderColor: 'var(--tooltip-border)',
                      color: 'var(--tooltip-text)',
                    }}
                    itemStyle={{
                      color: 'var(--tooltip-text)'
                    }}
                    labelStyle={{
                      color: 'var(--tooltip-text)'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="vendas" 
                    stroke="#3B82F6" 
                    name="Vendas"
                    activeDot={{ r: 8 }}
                    strokeWidth={2}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="clientes" 
                    stroke="#10B981" 
                    name="Clientes"
                    activeDot={{ r: 8 }}
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>



       {/* Lista de Usuários */}
      <Card className="dark:bg-gray-800">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold dark:text-white">Lista de Usuários</h2>
            <div className="flex items-center gap-2">
              <Search className="text-gray-400 dark:text-gray-300" size={20} />
              <Input
                type="text"
                placeholder="Buscar usuários..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64 dark:bg-gray-700 dark:text-gray-200 dark:placeholder-gray-400 dark:border-gray-600"
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b dark:border-gray-700">
                  <th className="text-left p-3 dark:text-gray-200">Nome</th>
                  <th className="text-left p-3 dark:text-gray-200">Email</th>
                  <th className="text-left p-3 dark:text-gray-200">Status</th>
                  <th className="text-left p-3 dark:text-gray-200">Último Acesso</th>
                </tr>
              </thead>
              <tbody>
                {paginatedUsers.map((user) => (
                  <tr key={user.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="p-3 dark:text-gray-300">{user.nome}</td>
                    <td className="p-3 dark:text-gray-300">{user.email}</td>
                    <td className="p-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        user.status === 'Ativo' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="p-3 dark:text-gray-300">{user.ultimoAcesso}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex justify-between items-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Mostrando {((currentPage - 1) * itemsPerPage) + 1} a {Math.min(currentPage * itemsPerPage, filteredUsers.length)} de {filteredUsers.length} resultados
            </p>
            <div className="flex gap-2">
              <Button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                variant="outline"
                className="dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600"
              >
                Anterior
              </Button>
              <Button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, pageCount))}
                disabled={currentPage === pageCount}
                variant="outline"
                className="dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600"
              >
                Próximo
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      </div>
    </div>
  );
};

export default Dashboard;
