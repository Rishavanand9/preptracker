import React, { useState } from 'react';
import styled from 'styled-components';
import { Settings as SettingsIcon, Download, Upload, RotateCcw, Moon, Sun } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { clearProgress, exportProgress, importProgress } from '../lib/storage';

const Container = styled.div`
  min-height: 100vh;
  background-color: var(--background);
  color: var(--foreground);
  transition: all 0.2s ease;
`;

const Main = styled.main`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  animation: fadeInUp 0.8s ease-out;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  color: var(--foreground);
  letter-spacing: -0.025em;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  font-size: 1.125rem;
  color: var(--muted-foreground);
  max-width: 500px;
  margin: 0 auto;
  line-height: 1.6;
`;

const SettingsSection = styled.div`
  background-color: var(--card);
  border: 1px solid var(--border);
  border-radius: 1rem;
  padding: 2rem;
  margin-bottom: 2rem;
  animation: fadeInUp 0.6s ease-out;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  color: var(--foreground);
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const SettingItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0;
  border-bottom: 1px solid var(--border);

  &:last-child {
    border-bottom: none;
  }
`;

const SettingInfo = styled.div``;

const SettingLabel = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  color: var(--foreground);
  margin-bottom: 0.25rem;
`;

const SettingDescription = styled.p`
  font-size: 0.875rem;
  color: var(--muted-foreground);
  line-height: 1.5;
`;

const Button = styled.button<{ variant?: 'primary' | 'secondary' | 'danger' }>`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  font-size: 0.875rem;
  font-weight: 600;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  border: 2px solid;
  border-radius: 0.75rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s;
  }

  &:hover::before {
    left: 100%;
  }

  ${props => {
    switch (props.variant) {
      case 'primary':
        return `
          color: white;
          background-color: var(--blue-600);
          border-color: var(--blue-600);
          box-shadow: 0 4px 14px rgba(37, 99, 235, 0.3);
          &:hover {
            background-color: var(--blue-700);
            border-color: var(--blue-700);
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(37, 99, 235, 0.4);
          }
        `;
      case 'danger':
        return `
          color: white;
          background-color: var(--red-600);
          border-color: var(--red-600);
          box-shadow: 0 4px 14px rgba(220, 38, 38, 0.3);
          &:hover {
            background-color: var(--red-700);
            border-color: var(--red-700);
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(220, 38, 38, 0.4);
          }
        `;
      default:
        return `
          color: var(--foreground);
          background-color: var(--card);
          border-color: var(--input);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
          &:hover {
            background-color: var(--muted);
            border-color: var(--blue-400);
            transform: translateY(-1px);
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
          }
        `;
    }
  }}
`;

const ThemeToggleButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  border-radius: 0.5rem;
  border: 1px solid var(--input);
  background-color: var(--card);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

  &:hover {
    background-color: var(--muted);
    border-color: var(--blue-400);
    transform: translateY(-1px) scale(1.05);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translateY(0) scale(0.98);
  }
`;

const FileInputWrapper = styled.div`
  position: relative;
`;

const HiddenFileInput = styled.input`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
`;

function Settings() {
  const { theme, toggleTheme } = useTheme();
  const [fileInputKey, setFileInputKey] = useState(0);

  const handleExportProgress = () => {
    // This would need to get the current progress from context or props
    // For now, we'll export an empty structure
    const dataStr = exportProgress([]);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'google-prep-progress.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImportProgress = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        const importedData = importProgress(content);
        if (importedData) {
          alert('Progress imported successfully! Please refresh the page to see your data.');
        } else {
          alert('Invalid file format. Please select a valid JSON file.');
        }
      };
      reader.readAsText(file);
    }
    // Reset file input
    setFileInputKey(prev => prev + 1);
  };

  const handleResetProgress = () => {
    if (window.confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
      clearProgress();
      alert('Progress has been reset. Please refresh the page to see the changes.');
    }
  };

  return (
    <Container>
      <Main>
        <Header>
          <Title>Settings</Title>
          <Subtitle>
            Customize your experience and manage your data preferences
          </Subtitle>
        </Header>

        <SettingsSection>
          <SectionTitle>
            <SettingsIcon size={20} />
            Appearance
          </SectionTitle>
          
          <SettingItem>
            <SettingInfo>
              <SettingLabel>Theme</SettingLabel>
              <SettingDescription>
                Choose between light and dark themes for your interface
              </SettingDescription>
            </SettingInfo>
            <ThemeToggleButton onClick={toggleTheme}>
              {theme === 'light' ? (
                <Moon size={16} />
              ) : (
                <Sun size={16} />
              )}
            </ThemeToggleButton>
          </SettingItem>
        </SettingsSection>

        <SettingsSection>
          <SectionTitle>
            <Download size={20} />
            Data Management
          </SectionTitle>
          
          <SettingItem>
            <SettingInfo>
              <SettingLabel>Export Progress</SettingLabel>
              <SettingDescription>
                Download your current progress as a JSON file for backup
              </SettingDescription>
            </SettingInfo>
            <Button variant="primary" onClick={handleExportProgress}>
              <Download size={16} />
              Export
            </Button>
          </SettingItem>

          <SettingItem>
            <SettingInfo>
              <SettingLabel>Import Progress</SettingLabel>
              <SettingDescription>
                Restore your progress from a previously exported file
              </SettingDescription>
            </SettingInfo>
            <FileInputWrapper>
              <HiddenFileInput
                key={fileInputKey}
                type="file"
                accept=".json"
                onChange={handleImportProgress}
              />
              <Button>
                <Upload size={16} />
                Import
              </Button>
            </FileInputWrapper>
          </SettingItem>

          <SettingItem>
            <SettingInfo>
              <SettingLabel>Reset Progress</SettingLabel>
              <SettingDescription>
                Clear all your progress and start fresh (this cannot be undone)
              </SettingDescription>
            </SettingInfo>
            <Button variant="danger" onClick={handleResetProgress}>
              <RotateCcw size={16} />
              Reset
            </Button>
          </SettingItem>
        </SettingsSection>

        <SettingsSection>
          <SectionTitle>
            <SettingsIcon size={20} />
            About
          </SectionTitle>
          
          <SettingItem>
            <SettingInfo>
              <SettingLabel>Version</SettingLabel>
              <SettingDescription>
                Google Prep Tracker v1.0.0
              </SettingDescription>
            </SettingInfo>
          </SettingItem>

          <SettingItem>
            <SettingInfo>
              <SettingLabel>Data Storage</SettingLabel>
              <SettingDescription>
                Your progress is stored locally in your browser
              </SettingDescription>
            </SettingInfo>
          </SettingItem>
        </SettingsSection>
      </Main>
    </Container>
  );
}

export default Settings;
