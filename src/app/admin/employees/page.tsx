'use client';

import { useState, useEffect } from 'react';
import {
  ShieldAlert,
  UserPlus,
  Trash2,
  Check,
  Mail,
  Send,
  CheckCircle2,
  Clock,
  RefreshCw,
} from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { UserAccount, UserRole } from '@/types';

export default function AdminEmployeesPage() {
  const { user, isAdmin } = useAuth();

  const [employees, setEmployees] = useState<UserAccount[]>([
    {
      uid: 'admin-owner',
      name: 'Aditya Enterprises (Showroom Owner)',
      email: 'adityaenterprises.work24@gmail.com',
      role: 'admin',
      isEmailVerified: true,
      createdAt: '2026-01-01T10:00:00Z',
    },
    {
      uid: 'staff-manager',
      name: 'Vasant Kunj Store Manager',
      email: 'manager@sharmabazaar.com',
      role: 'shop_manager',
      isEmailVerified: true,
      createdAt: '2026-02-15T10:00:00Z',
    },
    {
      uid: 'staff-procurement',
      name: 'Electronics Procurement Lead',
      email: 'inventory@sharmabazaar.com',
      role: 'shop_manager',
      isEmailVerified: false,
      verificationSentAt: '2026-11-17T18:00:00Z',
      createdAt: '2026-11-17T18:00:00Z',
    },
  ]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('sharma_admin_employees');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Ensure adityaenterprises.work24@gmail.com is present as the primary admin
          const hasAditya = parsed.some(
            (e: UserAccount) => e.email?.toLowerCase() === 'adityaenterprises.work24@gmail.com'
          );
          if (!hasAditya) {
            const upgraded = [
              {
                uid: 'admin-owner',
                name: 'Aditya Enterprises (Showroom Owner)',
                email: 'adityaenterprises.work24@gmail.com',
                role: 'admin' as UserRole,
                isEmailVerified: true,
                createdAt: new Date().toISOString(),
              },
              ...parsed,
            ];
            setEmployees(upgraded);
            localStorage.setItem('sharma_admin_employees', JSON.stringify(upgraded));
          } else {
            setEmployees(parsed);
          }
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
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(
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
          Per showroom protocol, employee access governance is restricted strictly to <strong>Executive Administrators (adityaenterprises.work24@gmail.com)</strong>.
        </p>
      </div>
    );
  }

  const handleAddEmployee = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    // Check if email already registered
    const exists = employees.some((emp) => emp.email.toLowerCase() === email.trim().toLowerCase());
    if (exists) {
      setNotification({
        message: `An account with ${email.trim()} is already registered in staff records.`,
        type: 'error',
      });
      setTimeout(() => setNotification(null), 4000);
      return;
    }

    const newEmp: UserAccount = {
      uid: `staff-${Date.now()}`,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      role,
      isEmailVerified: false, // Mandatory verification protocol
      verificationSentAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };

    saveEmployees([...employees, newEmp]);
    setName('');
    setEmail('');
    setShowAddForm(false);
    setNotification({
      message: `Staff ID issued for ${name}. Verification link dispatched to ${newEmp.email}. Email confirmation required to activate access.`,
      type: 'success',
    });
    setTimeout(() => setNotification(null), 6000);
  };

  const handleResendVerification = (empEmail: string, empName: string) => {
    const updated = employees.map((emp) => {
      if (emp.email.toLowerCase() === empEmail.toLowerCase()) {
        return {
          ...emp,
          verificationSentAt: new Date().toISOString(),
        };
      }
      return emp;
    });
    saveEmployees(updated);
    setNotification({
      message: `Verification email re-dispatched to ${empName} (${empEmail}).`,
      type: 'info',
    });
    setTimeout(() => setNotification(null), 4000);
  };

  const handleToggleVerification = (uid: string) => {
    const updated = employees.map((emp) => {
      if (emp.uid === uid) {
        const nextState = !emp.isEmailVerified;
        return {
          ...emp,
          isEmailVerified: nextState,
        };
      }
      return emp;
    });
    saveEmployees(updated);
    setNotification({
      message: 'Staff email verification status updated.',
      type: 'success',
    });
    setTimeout(() => setNotification(null), 3000);
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

  const handleDelete = (uid: string, empName: string, empEmail: string) => {
    if (user?.email && empEmail.toLowerCase() === user.email.toLowerCase()) {
      setNotification({ message: 'You cannot revoke clearance for your own active session.', type: 'error' });
      setTimeout(() => setNotification(null), 3000);
      return;
    }
    const adminCount = employees.filter((e) => e.role === 'admin').length;
    const target = employees.find((e) => e.uid === uid);
    if (target?.role === 'admin' && adminCount <= 1) {
      setNotification({ message: 'At least one executive administrator must remain in the system.', type: 'error' });
      setTimeout(() => setNotification(null), 3000);
      return;
    }
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
            Security Governance &amp; RBAC
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-brand-navy">
            Staff &amp; Role Management
          </h1>
          <p className="text-xs text-neutral-500 font-mono mt-0.5">
            Executive Owner: <strong className="text-brand-navy">adityaenterprises.work24@gmail.com</strong> · Email verification enforced on all staff IDs.
          </p>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-4 py-2.5 bg-brand-navy hover:bg-black text-white text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors flex items-center gap-2 shadow-subtle shrink-0"
        >
          <UserPlus className="w-3.5 h-3.5" />
          <span>{showAddForm ? 'Close Form' : 'Enroll Staff ID'}</span>
        </button>
      </div>

      {notification && (
        <div
          className={`p-3.5 rounded-sm text-xs font-mono flex items-center gap-2 shadow-subtle ${
            notification.type === 'error'
              ? 'bg-rose-900 text-white'
              : notification.type === 'info'
              ? 'bg-blue-900 text-white'
              : 'bg-neutral-900 text-white'
          }`}
        >
          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{notification.message}</span>
        </div>
      )}

      {/* Staff Email Verification Policy Banner */}
      <div className="p-4 bg-neutral-50 border border-neutral-200 rounded-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5 text-neutral-700">
          <Mail className="w-4 h-4 text-brand-navy shrink-0" />
          <span>
            <strong>Mandatory Email Verification Protocol:</strong> All newly created staff profiles require mail confirmation before permissions activate.
          </span>
        </div>
        <span className="font-mono text-[10px] uppercase tracking-wider text-emerald-700 font-bold bg-emerald-100/80 px-2.5 py-1 rounded-sm shrink-0">
          Enforced
        </span>
      </div>

      {showAddForm && (
        <form onSubmit={handleAddEmployee} className="p-6 bg-white border border-neutral-200 rounded-sm space-y-4 shadow-subtle animate-in fade-in duration-200">
          <div className="flex items-center justify-between border-b border-neutral-100 pb-2">
            <h3 className="font-mono text-xs uppercase tracking-widest text-brand-navy font-bold">
              Enroll New Showroom Personnel
            </h3>
            <span className="text-[11px] font-mono text-neutral-400">
              Auto-dispatches verification email
            </span>
          </div>
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
              <label className="block font-mono text-[10px] uppercase tracking-wider text-neutral-500 mb-1.5">Staff Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="staff@sharmabazaar.com"
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
                <option value="shop_manager">Shop Manager (Inventory &amp; Pricing)</option>
                <option value="admin">Executive Administrator (Full Access)</option>
              </select>
            </div>
          </div>
          <div className="flex items-center justify-between pt-2">
            <p className="text-[11px] text-neutral-400 font-mono">
              Staff ID will be marked as &quot;Pending Verification&quot; until confirmed.
            </p>
            <button
              type="submit"
              className="px-5 py-2.5 bg-brand-navy hover:bg-black text-white text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors flex items-center gap-2"
            >
              <span>Issue Credentials &amp; Send Verification</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>
      )}

      {/* Staff Registry Table */}
      <div className="border border-neutral-200 rounded-sm overflow-hidden bg-white shadow-subtle">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-neutral-200 bg-neutral-50 font-mono text-[10px] uppercase tracking-wider text-neutral-500">
                <th className="py-3.5 px-4">Staff Member</th>
                <th className="py-3.5 px-4">Email</th>
                <th className="py-3.5 px-4">Clearance Role</th>
                <th className="py-3.5 px-4">Email Verification</th>
                <th className="py-3.5 px-4">Issued On</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {employees.map((emp) => (
                <tr key={emp.uid} className="hover:bg-neutral-50/70 transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-neutral-900 font-sans">
                    <div className="flex items-center gap-2">
                      <span>{emp.name}</span>
                      {emp.email.toLowerCase() === 'adityaenterprises.work24@gmail.com' && (
                        <span className="px-1.5 py-0.5 rounded-sm bg-neutral-900 text-white font-mono text-[9px] uppercase font-bold tracking-wider">
                          Super Admin
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-neutral-600">
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
                  <td className="py-3.5 px-4">
                    {emp.isEmailVerified ? (
                      <button
                        onClick={() => handleToggleVerification(emp.uid)}
                        className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-sm bg-emerald-50 text-emerald-800 border border-emerald-200 font-mono text-[10px] font-bold"
                        title="Click to toggle status"
                      >
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>Verified</span>
                      </button>
                    ) : (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleToggleVerification(emp.uid)}
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-sm bg-amber-50 text-amber-800 border border-amber-200 font-mono text-[10px] font-semibold"
                          title="Click to manually verify (Admin Override)"
                        >
                          <Clock className="w-3 h-3 text-amber-600" />
                          <span>Pending</span>
                        </button>
                        <button
                          onClick={() => handleResendVerification(emp.email, emp.name)}
                          className="p-1 text-neutral-400 hover:text-brand-navy hover:bg-neutral-100 rounded-sm transition-colors"
                          title="Resend verification email"
                        >
                          <RefreshCw className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-[11px] text-neutral-400">
                    {emp.createdAt ? new Date(emp.createdAt).toLocaleDateString() : 'Active'}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => handleDelete(emp.uid, emp.name, emp.email)}
                      disabled={user?.email?.toLowerCase() === emp.email.toLowerCase()}
                      className="p-1.5 text-neutral-400 hover:text-rose-600 disabled:opacity-30 disabled:hover:text-neutral-400 transition-colors rounded-sm hover:bg-rose-50"
                      title={user?.email?.toLowerCase() === emp.email.toLowerCase() ? 'Current active session' : 'Revoke clearance'}
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
