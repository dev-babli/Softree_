'use client';

import { useState } from 'react';
import { TopBar } from '@/components/top-bar';
import { Sidebar } from '@/components/sidebar';
import { CommandPaletteWrapper } from '@/components/command-palette';
import { Button, Card, CardContent, CardHeader, CardTitle, Input, Badge } from '@neo/ui';
import {
  Building2,
  Users,
  Shield,
  Bell,
  Palette,
  Globe,
  ChevronRight,
  Save,
} from 'lucide-react';

const settingsGroups = [
  { id: 'workspace', label: 'Workspace', icon: Building2, description: 'Name, slug, and branding' },
  { id: 'members', label: 'Members', icon: Users, description: 'Invite and manage team access' },
  { id: 'permissions', label: 'Permissions', icon: Shield, description: 'Roles and access control' },
  { id: 'notifications', label: 'Notifications', icon: Bell, description: 'Email and in-app alerts' },
  { id: 'appearance', label: 'Appearance', icon: Palette, description: 'Theme and accent color' },
  { id: 'localization', label: 'Localization', icon: Globe, description: 'Language and region' },
];

export default function SettingsPage() {
  const [commandOpen, setCommandOpen] = useState(false);
  const [activeGroup, setActiveGroup] = useState('workspace');

  return (
    <div className="flex min-h-screen flex-col bg-neo-base">
      <TopBar onOpenCommandPalette={() => setCommandOpen(true)} />
      <div className="flex flex-1">
        <Sidebar activeItem="settings" />
        <main className="flex-1 overflow-auto p-6">
          <div className="mx-auto max-w-5xl space-y-6">
            <div>
              <h1 className="text-2xl font-semibold text-text-primary">Settings</h1>
              <p className="text-text-secondary">Manage workspace and platform preferences</p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-[280px_1fr]">
              <Card>
                <CardContent className="p-2">
                  <div className="space-y-1">
                    {settingsGroups.map((group) => {
                      const Icon = group.icon;
                      const isActive = group.id === activeGroup;
                      return (
                        <button
                          key={group.id}
                          onClick={() => setActiveGroup(group.id)}
                          className={`flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-sm transition-colors ${
                            isActive
                              ? 'bg-brand-primary-subtle text-text-primary'
                              : 'text-text-secondary hover:bg-neo-elevated hover:text-text-primary'
                          }`}
                        >
                          <Icon className="h-4 w-4" />
                          <span className="flex-1">{group.label}</span>
                          <ChevronRight className="h-3.5 w-3.5 text-text-tertiary" />
                        </button>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-6">
                {activeGroup === 'workspace' && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Workspace</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <label className="text-sm text-text-tertiary">Workspace name</label>
                        <Input defaultValue="Neo Agency" />
                      </div>
                      <div>
                        <label className="text-sm text-text-tertiary">Slug</label>
                        <Input defaultValue="neo-agency" />
                      </div>
                      <div>
                        <label className="text-sm text-text-tertiary">Description</label>
                        <textarea
                          defaultValue="AI-native agency platform workspace"
                          className="mt-1 min-h-[80px] w-full rounded-md border border-border bg-neo-base px-3 py-2 text-sm text-text-primary focus:outline-none focus-visible:border-brand-primary/50"
                        />
                      </div>
                      <div className="flex justify-end">
                        <Button variant="primary" size="sm">
                          <Save className="h-4 w-4" />
                          Save Changes
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {activeGroup === 'members' && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Members</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {[
                        { name: 'Alex Chen', email: 'alex@neo.agency', role: 'Admin' },
                        { name: 'Sarah Kim', email: 'sarah@neo.agency', role: 'Editor' },
                        { name: 'Mike Ross', email: 'mike@neo.agency', role: 'Viewer' },
                      ].map((member) => (
                        <div
                          key={member.email}
                          className="flex items-center justify-between rounded-md border border-border p-3"
                        >
                          <div>
                            <div className="font-medium text-text-primary">{member.name}</div>
                            <div className="text-sm text-text-tertiary">{member.email}</div>
                          </div>
                          <Badge variant="info">{member.role}</Badge>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                )}

                {activeGroup === 'permissions' && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Roles & Permissions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {[
                        { name: 'Admin', description: 'Full workspace access' },
                        { name: 'Editor', description: 'Create and edit content' },
                        { name: 'Viewer', description: 'Read-only access' },
                      ].map((role) => (
                        <div
                          key={role.name}
                          className="flex items-center justify-between rounded-md border border-border p-3"
                        >
                          <div>
                            <div className="font-medium text-text-primary">{role.name}</div>
                            <div className="text-sm text-text-tertiary">{role.description}</div>
                          </div>
                          <Button variant="secondary" size="sm">
                            Edit
                          </Button>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                )}

                {(activeGroup === 'notifications' || activeGroup === 'appearance' || activeGroup === 'localization') && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="capitalize">{activeGroup}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-text-secondary">
                        {activeGroup === 'notifications' && 'Configure notification preferences.'}
                        {activeGroup === 'appearance' && 'Customize theme and accent colors.'}
                        {activeGroup === 'localization' && 'Set language, timezone, and date format.'}
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
      <CommandPaletteWrapper open={commandOpen} onOpenChange={setCommandOpen} />
    </div>
  );
}
