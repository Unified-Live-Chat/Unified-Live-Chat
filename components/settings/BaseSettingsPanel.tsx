import React, { ReactNode } from 'react';

export interface BaseSettingsPanelProps {
  title: string;
  children: ReactNode;
}

export const BaseSettingsPanel: React.FC<BaseSettingsPanelProps> = ({
  title,
  children,
}) => {
  return (
    <div className="flex flex-col min-w-200">
      <p className="mt-2 mb-2 font-semibold text-3xl">{title}</p>
      <div className="border-t border-gray-300 w-full" />
      <div className="space-y-3">{children}</div>
    </div>
  );
};
