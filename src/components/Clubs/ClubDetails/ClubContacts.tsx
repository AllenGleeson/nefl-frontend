"use client";

import { FaEnvelope, FaPhone, FaUser } from "react-icons/fa6";

export type ClubContact = {
  name: string;
  role: string;
  phone?: string;
  email?: string;
};

interface ClubContactsProps {
  contacts: ClubContact[];
}

export default function ClubContacts({ contacts }: ClubContactsProps) {
  if (!contacts?.length) return null;

  return (
    <section className="mt-8">
      <h2 className="text-2xl font-bold text-white mb-4">Club contacts</h2>
      <div className="rounded-lg border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-0">
            <thead className="bg-white/10">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                  Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                  Role
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                  Phone
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                  Email
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {contacts.map((c, i) => (
                <tr key={i} className="bg-white/5 hover:bg-white/10 transition-colors">
                  <td className="px-4 py-3 text-white flex items-center gap-2">
                    <FaUser className="text-white/60 flex-shrink-0" />
                    {c.name}
                  </td>
                  <td className="px-4 py-3 text-white/80">{c.role}</td>
                  <td className="px-4 py-3 text-white/80">
                    {c.phone ? (
                      <a
                        href={`tel:${c.phone.replace(/\s/g, "")}`}
                        className="inline-flex items-center gap-1.5 text-white/90 hover:text-white"
                      >
                        <FaPhone className="text-white/60 flex-shrink-0" />
                        {c.phone}
                      </a>
                    ) : (
                      <span className="text-white/50">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-white/80">
                    {c.email ? (
                      <a
                        href={`mailto:${c.email}`}
                        className="inline-flex items-center gap-1.5 text-white/90 hover:text-white break-all"
                      >
                        <FaEnvelope className="text-white/60 flex-shrink-0" />
                        {c.email}
                      </a>
                    ) : (
                      <span className="text-white/50">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
