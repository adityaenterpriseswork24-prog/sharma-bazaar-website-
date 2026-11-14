'use client';

import { useState, useEffect } from 'react';
import {
  ShieldAlert,
  UserPlus,
  Trash2,
  Shield,
  Check,
} from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { UserAccount, UserRole } from '@/types';

export default function AdminEmployeesPage() {
  const { isAdmin } = useAuth();

  const [employees, setEmployees] = useState<UserAccount[]>([
    {
      uid: 'staff-1',
      name: 'Showroom Owner / Director',
      email: 'admin@sharmabazaar.com',
      role: 'admin',
      createdAt: '2026-01-01T10:00:00Z',
    },
    {
      uid: 'staff-2',
      name: 'Vasant Kunj Store Manager',
      email: 'manager@sharmabazaar.com',
      role: 'shop_manager',
      createdAt: '2026-02-15T10:00:00Z',
    },
    {
      uid: 'staff-3',
      name: 'Electronics Procurement Lead',
      email: 'inventory@sharmabazaar.com',
      role: 'shop_manager',
      createdAt: '2026-03-01T10:00:00Z',
    },
  ]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('sharma_admin_employees');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setEmployees(parsed);
        }
      }
    } catch {
      // keep initial
    }
  }, []);

  const saveEmployees = (list: UserAccount[]) => {
    setEmployees(list);
    localStorage.setItem('sharma_admin_employees', JSON.stringify(list));
  };

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<UserRole>('shop_manager');
  const [showAddForm, setShowAddForm] = useState(false);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(
    null
  );

  // STRICT ROLE CHECK: If user is not Admin, display Access Denied
  if (!isAdmin) {
    return (
      <div className="py-16 max-w-lg mx-auto text-center space-y-4 font-sans">
        <div className="w-12 h-12 rounded-sm bg-rose-50 border border-rose-200 text-rose-700 flex items-center justify-center mx-auto">
          <ShieldAlert className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-bold text-brand-navy">
          403 — Administrative Clearance Required
        </h2>
        <p className="text-xs text-neutral-600 leading-relaxed font-mono">
          Your account is currently assigned the role of <strong>Shop Manager</strong>.
          Per showroom protocol, employee access governance is restricted strictly to <strong>Executive Administrators</strong>.
        </p>
      </div>
    );
  }

  const handleAddEmployee = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    const newEmp: UserAccount = {
      uid: `staff-${Date.now()}`,
      name,
      email,
      role,
      createdAt: new Date().toISOString(),
    };

    saveEmployees([...employees, newEmp]);
    setName('');
    setEmail('');
    setShowAddForm(false);
    setNotification({
      message: `Staff credentials granted for ${name} (${role.replace('_', ' ')}).`,
      type: 'success',
    });
    setTimeout(() => setNotification(null), 4000);
  };

  const handleToggleRole = (uid: string) => {
    const updated = employees.map((emp) => {
      if (emp.uid === uid) {
        const newRole: UserRole = emp.role === 'admin' ? 'shop_manager' : 'admin';
        return { ...emp, role: newRole };
      }
      return emp;
    });
    saveEmployees(updated);
    setNotification({ message: 'User role updated successfully.', type: 'success' });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleDelete = (uid: string, empName: string) => {
    if (confirm(`Revoke staff account for ${empName}?`)) {
      saveEmployees(employees.filter((e) => e.uid !== uid));
      setNotification({ message: `Access revoked for ${empName}.`, type: 'success' });
      setTimeout(() => setNotification(null), 3000);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-200">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400">
            Security Governance
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-brand-navy">
            Staff &amp; Role Management
          </h1>
          <p className="text-xs text-neutral-500 font-mono mt-0.5">
            Manage showroom employee authorization, role clearance levels, and credentials.
          </p>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-4 py-2.5 bg-brand-navy hover:bg-black text-white text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors flex items-center gap-2 shadow-subtle shrink-0"
        >
          <UserPlus className="w-3.5 h-3.5" />
          <span>{showAddForm ? 'Close Form' : 'Enroll Staff'}</span>
        </button>
      </div>

      {notification && (
        <div className="p-3.5 rounded-sm bg-neutral-900 text-white text-xs font-mono flex items-center gap-2 shadow-subtle">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{notification.message}</span>
        </div>
      )}

      {showAddForm && (
        <form onSubmit={handleAddEmployee} className="p-6 bg-white border border-neutral-200 rounded-sm space-y-4">
          <h3 className="font-mono text-xs uppercase tracking-widest text-neutral-400 border-b border-neutral-100 pb-2">
            Enroll New Showroom Personnel
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-mono text-[10px] uppercase tracking-wider text-neutral-500 mb-1.5">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Vikram Sharma"
                className="w-full px-3.5 py-2 bg-neutral-50 border border-neutral-200 rounded-sm text-xs focus:outline-none focus:border-brand-navy"
              />
            </div>
            <div>
              <label className="block font-mono text-[10px] uppercase tracking-wider text-neutral-500 mb-1.5">Staff Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="vikram@sharmabazaar.com"
                className="w-full px-3.5 py-2 bg-neutral-50 border border-neutral-200 rounded-sm text-xs font-mono focus:outline-none focus:border-brand-navy"
              />
            </div>
            <div>
              <label className="block font-mono text-[10px] uppercase tracking-wider text-neutral-500 mb-1.5">Clearance Level</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as UserRole)}
                className="w-full px-3.5 py-2 bg-neutral-50 border border-neutral-200 rounded-sm text-xs font-mono focus:outline-none focus:border-brand-navy"
              >
                <option value="shop_manager">Shop Manager</option>
                <option value="admin">Executive Admin</option>
              </select>
            </div>
          </div>
          <button
            type="submit"
            className="px-5 py-2.5 bg-brand-navy text-white text-xs font-semibold uppercase tracking-wider rounded-sm"
          >
            Create Staff Profile
          </button>
        </form>
      )}

      {/* Staff Registry Table */}
      <div className="border border-neutral-200 rounded-sm overflow-hidden bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-neutral-200 bg-neutral-50 font-mono text-[10px] uppercase tracking-wider text-neutral-500">
                <th className="py-3.5 px-4">Staff Member</th>
                <th className="py-3.5 px-4">Email</th>
                <th className="py-3.5 px-4">Clearance Role</th>
                <th className="py-3.5 px-4">Issued On</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {employees.map((emp) => (
                <tr key={emp.uid} className="hover:bg-neutral-50/70 transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-neutral-900 font-sans">
                    {emp.name}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-neutral-500">
                    {emp.email}
                  </td>
                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => handleToggleRole(emp.uid)}
                      className={`font-mono text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm border ${
                        emp.role === 'admin'
                          ? 'bg-amber-50 text-amber-800 border-amber-200'
                          : 'bg-blue-50 text-blue-800 border-blue-200'
                      }`}
                      title="Click to toggle clearance role"
                    >
                      {emp.role === 'admin' ? 'Executive Admin' : 'Shop Manager'}
                    </button>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-[11px] text-neutral-400">
                    {emp.createdAt ? new Date(emp.createdAt).toLocaleDateString() : 'Active'}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => handleDelete(emp.uid, emp.name)}
                      className="p-1.5 text-neutral-400 hover:text-rose-600 transition-colors rounded-sm hover:bg-rose-50"
                      title="Revoke clearance"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
