'use client';

import { useState } from 'react';
import {
  ShieldAlert,
  UserCheck,
  UserPlus,
  Trash2,
  Shield,
  CheckCircle2
} from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { UserAccount, UserRole } from '@/types';

export default function AdminEmployeesPage() {
  const { isAdmin } = useAuth();

  const [employees, setEmployees] = useState<UserAccount[]>([
    {
      uid: 'staff-1',
      name: 'Showroom Owner / Director',
      email: 'admin@sharmaelectronics.com',
      role: 'admin',
      createdAt: '2026-01-01T10:00:00Z',
    },
    {
      uid: 'staff-2',
      name: 'Vasant Kunj Store Manager',
      email: 'manager@sharmaelectronics.com',
      role: 'shop_manager',
      createdAt: '2026-02-15T10:00:00Z',
    },
    {
      uid: 'staff-3',
      name: 'Electronics Procurement Lead',
      email: 'inventory@sharmaelectronics.com',
      role: 'shop_manager',
      createdAt: '2026-03-01T10:00:00Z',
    },
  ]);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<UserRole>('shop_manager');
  const [showAddForm, setShowAddForm] = useState(false);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(
    null
  );

  // STRICT SERVER/ROLE CHECK: If user is not Admin, display Access Denied
  if (!isAdmin) {
    return (
      <div className="py-16 max-w-lg mx-auto text-center space-y-4">
        <div className="w-16 h-16 rounded-3xl bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center mx-auto shadow-subtle">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-black text-brand-navy">
          403 — Administrative Clearance Required
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Your account is currently assigned the role of <strong>Shop Manager</strong>.
          Per showroom security protocol, employee management and role delegations are strictly restricted to <strong>Executive Admins</strong>.
        </p>
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-500 text-left space-y-1">
          <p className="font-bold text-slate-700">Role Capabilities Summary:</p>
          <p>• <strong>Shop Manager:</strong> Product catalogue, pricing adjustments, display statuses.</p>
          <p>• <strong>Admin:</strong> Complete platform access, credentials, and employee roles.</p>
        </div>
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

    setEmployees([...employees, newEmp]);
    setName('');
    setEmail('');
    setShowAddForm(false);
    setNotification({
      message: `Staff account created for ${name} with ${role.replace('_', ' ')} privileges.`,
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
    setEmployees(updated);
    setNotification({ message: 'User role updated successfully.', type: 'success' });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleDelete = (uid: string, empName: string) => {
    if (confirm(`Revoke staff account for ${empName}?`)) {
      setEmployees(employees.filter((e) => e.uid !== uid));
      setNotification({ message: `Access revoked for ${empName}.`, type: 'success' });
      setTimeout(() => setNotification(null), 3000);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
            Executive Control
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-brand-navy">Staff &amp; Role Management</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Authorize team members, assign operational roles, and enforce RBAC credentials.
          </p>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-5 py-2.5 rounded-xl bg-brand-navy hover:bg-slate-800 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-sm transition-all shrink-0"
        >
          <UserPlus className="w-4 h-4 text-emerald-400" />
          <span>{showAddForm ? 'Close Form' : 'Add New Staff Member'}</span>
        </button>
      </div>

      {notification && (
        <div
          className={`p-4 rounded-xl text-xs font-semibold flex items-center gap-2 ${
            notification.type === 'success'
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              : 'bg-rose-50 text-rose-800 border border-rose-200'
          }`}
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{notification.message}</span>
        </div>
      )}

      {/* Add Employee Form Drawer */}
      {showAddForm && (
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-card space-y-4 animate-in slide-in-from-top-2">
          <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
            <UserPlus className="w-4 h-4 text-brand-blue" />
            <span>Create Showroom Staff Account</span>
          </h3>

          <form onSubmit={handleAddEmployee} className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Amit Sharma"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-blue"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Company / Staff Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. staff@sharmaelectronics.com"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-blue"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Assigned Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as UserRole)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-blue bg-white"
              >
                <option value="shop_manager">Shop Manager (Inventory Only)</option>
                <option value="admin">Admin (Full Control)</option>
              </select>
            </div>

            <div className="sm:col-span-3 flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-brand-navy text-white text-xs font-bold"
              >
                Save Staff Account
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Staff Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-subtle overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-brand-blue" />
            <h3 className="text-sm font-bold text-slate-900">Active Staff Accounts</h3>
          </div>
          <span className="text-xs text-slate-400 font-medium">
            {employees.length} Authorized Accounts
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-400 font-semibold uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Staff Member</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Role Privileges</th>
                <th className="py-3 px-4 text-center">Change Role</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {employees.map((emp) => (
                <tr key={emp.uid} className="hover:bg-slate-50/80">
                  <td className="py-3 px-4 font-bold text-slate-900 flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-brand-blue shrink-0" />
                    <span>{emp.name}</span>
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-600">{emp.email}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                        emp.role === 'admin'
                          ? 'bg-amber-100 text-amber-800 border border-amber-200'
                          : 'bg-blue-100 text-blue-800 border border-blue-200'
                      }`}
                    >
                      {emp.role === 'admin' ? 'Executive Admin' : 'Shop Manager'}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => handleToggleRole(emp.uid)}
                      className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors"
                      title="Toggle role between Admin and Shop Manager"
                    >
                      Switch to {emp.role === 'admin' ? 'Shop Manager' : 'Admin'}
                    </button>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => handleDelete(emp.uid, emp.name)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                      title="Revoke account"
                    >
                      <Trash2 className="w-4 h-4" />
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
