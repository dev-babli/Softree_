'use client';

import { useState } from 'react';
import { TopBar } from '@/components/top-bar';
import { Sidebar } from '@/components/sidebar';
import { CommandPaletteWrapper } from '@/components/command-palette';
import { Card, CardContent, CardHeader, CardTitle, Badge, Button } from '@neo/ui';
import { Users, Mail, Shield, Plus } from 'lucide-react';

const members = [
  { id: '1', name: 'Alex Chen', email: 'alex@neo.agency', role: 'Admin', initials: 'AC', color: '#3b82f6' },
  { id: '2', name: 'Sarah Kim', email: 'sarah@neo.agency', role: 'Editor', initials: 'SK', color: '#10b981' },
  { id: '3', name: 'Mike Ross', email: 'mike@neo.agency', role: 'Viewer', initials: 'MR', color: '#f59e0b' },
  { id: '4', name: 'John Doe', email: 'john@neo.agency', role: 'Editor', initials: 'JD', color: '#8b5cf6' },
];

export default function TeamPage() {
  const [commandOpen, setCommandOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-neo-base">
      <TopBar onOpenCommandPalette={() => setCommandOpen(true)} />
      <div className="flex flex-1">
        <Sidebar activeItem="team" />
        <main className="flex-1 overflow-auto p-6">
          <div className="mx-auto max-w-4xl space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-text-primary">Team</h1>
                <p className="text-text-secondary">Manage workspace members</p>
              </div>
              <Button variant="primary" size="sm">
                <Plus className="h-4 w-4" />
                Invite
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-text-tertiary" />
                  Members
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {members.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center justify-between rounded-md border border-border p-3"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="flex h-9 w-9 items-center justify-center rounded-full text-xs font-semibold text-white"
                        style={{ backgroundColor: member.color }}
                      >
                        {member.initials}
                      </div>
                      <div>
                        <div className="font-medium text-text-primary">{member.name}</div>
                        <div className="flex items-center gap-1 text-xs text-text-tertiary">
                          <Mail className="h-3 w-3" />
                          {member.email}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="info" className="flex items-center gap-1">
                        <Shield className="h-3 w-3" />
                        {member.role}
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
      <CommandPaletteWrapper open={commandOpen} onOpenChange={setCommandOpen} />
    </div>
  );
}
