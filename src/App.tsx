import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { initialSchedule } from './data/schedule';
import type { Month, NotePage, Week } from './data/schedule';
import { loadProgress, saveProgress, clearProgress, exportProgress, importProgress } from './lib/storage';
import { 
  Sun, 
  Moon, 
  Search, 
  Download, 
  Upload, 
  RotateCcw, 
  ChevronDown, 
  ChevronRight,
  CheckCircle2,
  Circle,
  Plus,
  Edit3,
  Trash2,
  Save,
  X
} from 'lucide-react';

// Styled Components
const AppContainer = styled.div`
  min-height: 100vh;
  background-color: var(--background);
  color: var(--foreground);
  transition: all 0.2s ease;
`;

const Header = styled.header`
  border-bottom: 1px solid var(--border);
  background-color: var(--card);
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.5rem 1rem;
`;

const HeaderTop = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;

  @media (min-width: 640px) {
    flex-direction: row;
    align-items: center;
  }
`;

const HeaderLeft = styled.div`
  flex: 1;
`;

const Title = styled.h1`
  font-size: 2.25rem;
  font-weight: 800;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  color: var(--blue-600);
  letter-spacing: -0.025em;
  background: linear-gradient(135deg, var(--blue-600), var(--blue-400));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: fadeInDown 0.8s ease-out;
`;

const Subtitle = styled.p`
  color: var(--muted-foreground);
  margin-top: 0.5rem;
  font-size: 1.125rem;
  font-weight: 500;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  animation: fadeInUp 0.8s ease-out 0.2s both;
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ProgressSection = styled.div`
  margin-top: 1.5rem;
`;

const ProgressHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

const ProgressLabel = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
`;

const ProgressText = styled.span`
  font-size: 0.875rem;
  color: var(--muted-foreground);
`;

const ProgressBar = styled.div`
  width: 100%;
  background-color: var(--gray-200);
  border-radius: 9999px;
  height: 0.75rem;
`;

const ProgressFill = styled.div<{ width: number }>`
  background: linear-gradient(90deg, var(--blue-600), var(--blue-400));
  height: 0.75rem;
  border-radius: 9999px;
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  width: ${props => props.width}%;
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    animation: shimmer 2s infinite;
  }
`;

const Main = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const SearchContainer = styled.div`
  margin-bottom: 2rem;
  animation: fadeInUp 0.6s ease-out;
`;

const SearchWrapper = styled.div`
  position: relative;
  max-width: 32rem;
  margin: 0 auto;
`;

const SearchIcon = styled(Search)`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  height: 1.25rem;
  width: 1.25rem;
  color: var(--blue-600);
  transition: all 0.3s ease;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.75rem;
  border: 2px solid var(--input);
  border-radius: 0.75rem;
  background-color: var(--card);
  color: var(--foreground);
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

  &::placeholder {
    color: var(--muted-foreground);
    font-weight: 400;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px var(--ring), 0 4px 16px rgba(0, 0, 0, 0.1);
    border-color: var(--blue-600);
    transform: translateY(-1px);
  }

  &:hover {
    border-color: var(--blue-400);
    transform: translateY(-1px);
  }
`;

const MonthsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const ExportImportSection = styled.div`
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid var(--border);
  animation: fadeInUp 0.8s ease-out 0.4s both;
`;

const ExportImportContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  @media (min-width: 640px) {
    flex-direction: row;
  }
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
  border-radius: 0.75rem;
  border: 2px solid var(--input);
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

// New styled components for Notes
const NotesContainer = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  background-color: var(--muted);
  border-radius: 0.75rem;
  border: 1px solid var(--border);
`;

const NotesHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

const NotesTitle = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  color: var(--foreground);
  margin-bottom: 0.5rem;
`;

const NotesActions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const NotesActionButton = styled.button`
  padding: 0.5rem;
  border-radius: 0.5rem;
  color: var(--blue-600);
  background-color: var(--blue-50);
  border: 1px solid var(--blue-200);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;

  &:hover {
    background-color: var(--blue-100);
    color: var(--blue-700);
    transform: scale(1.1);
    box-shadow: 0 2px 8px rgba(37, 99, 235, 0.2);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const NotesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const NoteItem = styled.div<{ isActive: boolean }>`
  padding: 0.75rem;
  border-radius: 0.5rem;
  border: 2px solid ${props => props.isActive ? 'var(--blue-400)' : 'var(--border)'};
  background-color: ${props => props.isActive ? 'var(--blue-50)' : 'var(--card)'};
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: ${props => props.isActive ? '0 4px 16px rgba(37, 99, 235, 0.15)' : '0 2px 8px rgba(0, 0, 0, 0.05)'};

  &:hover {
    background-color: var(--muted);
    transform: translateY(-1px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  }
`;

const NoteItemHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const NoteItemName = styled.span`
  font-size: 0.875rem;
  font-weight: 600;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  color: var(--foreground);
`;

const NoteItemDate = styled.span`
  font-size: 0.75rem;
  color: var(--muted-foreground);
`;

const NoteEditor = styled.div`
  margin-top: 0.75rem;
  border: 1px solid var(--border);
  border-radius: 0.375rem;
  overflow: hidden;
`;

const NoteEditorHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem;
  background-color: var(--muted);
  border-bottom: 1px solid var(--border);
`;

const NoteEditorTitle = styled.input`
  font-size: 1rem;
  font-weight: 600;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  background: transparent;
  border: 2px solid transparent;
  border-radius: 0.5rem;
  color: var(--foreground);
  flex: 1;
  margin-right: 0.5rem;
  padding: 0.5rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: var(--blue-400);
    background-color: var(--blue-50);
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }

  &:hover {
    background-color: var(--muted);
  }
`;

const NoteEditorActions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const NoteEditorButton = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: 0.5rem 0.75rem;
  border-radius: 0.5rem;
  font-size: 0.75rem;
  font-weight: 600;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  border: 2px solid;

  ${props => {
    switch (props.variant) {
      case 'primary':
        return `
          background-color: var(--blue-600);
          color: white;
          border-color: var(--blue-600);
          box-shadow: 0 2px 8px rgba(37, 99, 235, 0.3);
          &:hover {
            background-color: var(--blue-700);
            border-color: var(--blue-700);
            transform: translateY(-1px);
            box-shadow: 0 4px 16px rgba(37, 99, 235, 0.4);
          }
        `;
      default:
        return `
          background-color: transparent;
          color: var(--muted-foreground);
          border-color: var(--border);
          &:hover {
            background-color: var(--muted);
            border-color: var(--blue-400);
            transform: translateY(-1px);
          }
        `;
    }
  }}
`;

const NoteEditorContent = styled.div`
  padding: 0.75rem;
`;

const NoteEditorTextarea = styled.textarea`
  width: 100%;
  min-height: 120px;
  padding: 0.75rem;
  font-size: 0.875rem;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  border: 2px solid var(--border);
  border-radius: 0.5rem;
  background-color: var(--card);
  color: var(--foreground);
  resize: vertical;
  line-height: 1.6;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: var(--blue-400);
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
    background-color: var(--blue-50);
  }

  &:hover {
    border-color: var(--blue-200);
  }

  &::placeholder {
    color: var(--muted-foreground);
    font-style: italic;
  }
`;

function App() {
  const [months, setMonths] = useState<Month[]>(initialSchedule);
  const [searchTerm, setSearchTerm] = useState('');
  const [collapsedMonths, setCollapsedMonths] = useState<Set<string>>(new Set());
  const [fileInputKey, setFileInputKey] = useState(0);

  // Load progress from localStorage on mount
  useEffect(() => {
    const savedProgress = loadProgress();
    if (savedProgress.length > 0) {
      setMonths(savedProgress);
    }
  }, []);

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    saveProgress(months);
  }, [months]);

  const toggleMonthCollapse = (monthId: string) => {
    setCollapsedMonths(prev => {
      const newSet = new Set(prev);
      if (newSet.has(monthId)) {
        newSet.delete(monthId);
      } else {
        newSet.add(monthId);
      }
      return newSet;
    });
  };

  const toggleWeekCompletion = (monthId: string, weekId: string) => {
    setMonths(prev => prev.map(month => {
      if (month.id === monthId) {
        return {
          ...month,
          weeks: month.weeks.map(week => {
            if (week.id === weekId) {
              return { ...week, completed: !week.completed };
            }
            return week;
          })
        };
      }
      return month;
    }));
  };

  const toggleMonthCompletion = (monthId: string) => {
    setMonths(prev => prev.map(month => {
      if (month.id === monthId) {
        const allCompleted = month.weeks.every(week => week.completed);
        return {
          ...month,
          weeks: month.weeks.map(week => ({
            ...week,
            completed: !allCompleted
          }))
        };
      }
      return month;
    }));
  };

  const updateWeekNotes = (monthId: string, weekId: string, notes: Week['notes']) => {
    setMonths(prev => prev.map(month => {
      if (month.id === monthId) {
        return {
          ...month,
          weeks: month.weeks.map(week => {
            if (week.id === weekId) {
              return { ...week, notes };
            }
            return week;
          })
        };
      }
      return month;
    }));
  };

  const handleResetProgress = () => {
    if (window.confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
      setMonths(initialSchedule);
      clearProgress();
    }
  };

  const handleExportProgress = () => {
    const dataStr = exportProgress(months);
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
          setMonths(importedData);
          alert('Progress imported successfully!');
        } else {
          alert('Invalid file format. Please select a valid JSON file.');
        }
      };
      reader.readAsText(file);
    }
    // Reset file input
    setFileInputKey(prev => prev + 1);
  };

  // Global search across all content
  const filteredMonths = months.map(month => ({
    ...month,
    weeks: month.weeks.filter(week => {
      const weekText = week.description.toLowerCase();
      const notesText = week.notes.map(note => 
        `${note.name} ${note.content}`
      ).join(' ').toLowerCase();
      
      return weekText.includes(searchTerm.toLowerCase()) || 
             notesText.includes(searchTerm.toLowerCase());
    })
  })).filter(month => month.weeks.length > 0);

  // Calculate progress
  const totalWeeks = months.reduce((sum, month) => sum + month.weeks.length, 0);
  const completedWeeks = months.reduce((sum, month) => 
    sum + month.weeks.filter(week => week.completed).length, 0
  );
  const overallProgress = totalWeeks > 0 ? (completedWeeks / totalWeeks) * 100 : 0;

  return (
    <ThemeProvider>
      <AppContainer>
        {/* Header */}
        <Header>
          <HeaderContent>
            <HeaderTop>
              <HeaderLeft>
                <Title>Google Prep Tracker</Title>
                <Subtitle>Track your 1-year preparation journey</Subtitle>
              </HeaderLeft>
              
              <HeaderRight>
                <ThemeToggle />
                <Button variant="danger" onClick={handleResetProgress}>
                  <RotateCcw size={16} />
                  Reset Progress
                </Button>
              </HeaderRight>
            </HeaderTop>

            {/* Overall Progress */}
            <ProgressSection>
              <ProgressHeader>
                <ProgressLabel>Overall Progress</ProgressLabel>
                <ProgressText>
                  {completedWeeks} / {totalWeeks} weeks ({overallProgress.toFixed(1)}%)
                </ProgressText>
              </ProgressHeader>
              <ProgressBar>
                <ProgressFill width={overallProgress} />
              </ProgressBar>
            </ProgressSection>
          </HeaderContent>
        </Header>

        {/* Main Content */}
        <Main>
          {/* Search Bar */}
          <SearchContainer>
            <SearchWrapper>
              <SearchIcon />
              <SearchInput
                type="text"
                placeholder="Search anything... weeks, notes, content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </SearchWrapper>
          </SearchContainer>

          {/* Months */}
          <MonthsContainer>
            {filteredMonths.map((month, index) => {
              const monthProgress = month.weeks.length > 0 
                ? (month.weeks.filter(week => week.completed).length / month.weeks.length) * 100 
                : 0;
              const isCollapsed = collapsedMonths.has(month.id);

              return (
                <MonthCard
                  key={month.id}
                  month={month}
                  progress={monthProgress}
                  isCollapsed={isCollapsed}
                  onToggleCollapse={() => toggleMonthCollapse(month.id)}
                  onToggleMonthCompletion={() => toggleMonthCompletion(month.id)}
                  onToggleWeekCompletion={toggleWeekCompletion}
                  onUpdateWeekNotes={updateWeekNotes}
                  index={index}
                />
              );
            })}
          </MonthsContainer>

          {/* Export/Import Section */}
          <ExportImportSection>
            <ExportImportContainer>
              <Button variant="primary" onClick={handleExportProgress}>
                <Download size={16} />
                Export Progress
              </Button>
              
              <FileInputWrapper>
                <HiddenFileInput
                  key={fileInputKey}
                  type="file"
                  accept=".json"
                  onChange={handleImportProgress}
                />
                <Button>
                  <Upload size={16} />
                  Import Progress
                </Button>
              </FileInputWrapper>
            </ExportImportContainer>
          </ExportImportSection>
        </Main>
      </AppContainer>
    </ThemeProvider>
  );
}

// Theme Toggle Component
function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <ThemeToggleButton onClick={toggleTheme}>
      {theme === 'light' ? (
        <Moon size={16} />
      ) : (
        <Sun size={16} />
      )}
    </ThemeToggleButton>
  );
}

// Month Card Component
interface MonthCardProps {
  month: Month;
  progress: number;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  onToggleMonthCompletion: () => void;
  onToggleWeekCompletion: (monthId: string, weekId: string) => void;
  onUpdateWeekNotes: (monthId: string, weekId: string, notes: Week['notes']) => void;
  index: number;
}

const MonthCardContainer = styled.div<{ index: number }>`
  border: 1px solid var(--border);
  border-radius: 1rem;
  background-color: var(--card);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  animation: slideInUp 0.6s ease-out ${props => props.index * 0.1}s both;
  overflow: hidden;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    border-color: var(--blue-200);
  }
`;

const MonthHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid var(--border);
`;

const MonthHeaderTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const MonthHeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const CollapseButton = styled.button`
  padding: 0.25rem;
  border-radius: 0.375rem;
  transition: all 0.2s ease;

  &:hover {
    background-color: var(--muted);
  }
`;

const MonthInfo = styled.div``;

const MonthTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  color: var(--foreground);
  letter-spacing: -0.025em;
`;

const MonthStats = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 0.5rem;
`;

const MonthStat = styled.span`
  font-size: 0.875rem;
  color: var(--muted-foreground);
`;

const MonthProgressText = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--blue-600);
`;

const MonthHeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const MonthActionButton = styled.button`
  font-size: 0.875rem;
  color: var(--blue-600);
  transition: all 0.2s ease;
  cursor: pointer;
  background-color: transparent;
  border: none;

  &:hover {
    text-decoration: underline;
  }
`;

const MonthProgressBar = styled.div`
  margin-top: 1rem;
`;

const MonthProgressBarBg = styled.div`
  width: 100%;
  background-color: var(--gray-200);
  border-radius: 9999px;
  height: 0.5rem;
`;

const MonthProgressBarFill = styled.div<{ width: number }>`
  background: linear-gradient(90deg, var(--blue-600), var(--blue-400));
  height: 0.5rem;
  border-radius: 9999px;
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  width: ${props => props.width}%;
`;

const MonthWeeks = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

function MonthCard({
  month,
  progress,
  isCollapsed,
  onToggleCollapse,
  onToggleMonthCompletion,
  onToggleWeekCompletion,
  onUpdateWeekNotes,
  index
}: MonthCardProps) {
  const completedWeeks = month.weeks.length > 0 ? month.weeks.filter(week => week.completed).length : 0;
  const totalWeeks = month.weeks.length;

  return (
    <MonthCardContainer index={index}>
      {/* Month Header */}
      <MonthHeader>
        <MonthHeaderTop>
          <MonthHeaderLeft>
            <CollapseButton onClick={onToggleCollapse}>
              {isCollapsed ? (
                <ChevronRight size={20} />
              ) : (
                <ChevronDown size={20} />
              )}
            </CollapseButton>
            <MonthInfo>
              <MonthTitle>{month.name}</MonthTitle>
              <MonthStats>
                <MonthStat>
                  {completedWeeks} / {totalWeeks} weeks completed
                </MonthStat>
                <MonthProgressText>
                  {progress.toFixed(1)}%
                </MonthProgressText>
              </MonthStats>
            </MonthInfo>
          </MonthHeaderLeft>
          
          <MonthHeaderRight>
            <MonthActionButton onClick={onToggleMonthCompletion}>
              {completedWeeks === totalWeeks ? 'Mark all incomplete' : 'Mark all complete'}
            </MonthActionButton>
          </MonthHeaderRight>
        </MonthHeaderTop>

        {/* Month Progress Bar */}
        <MonthProgressBar>
          <MonthProgressBarBg>
            <MonthProgressBarFill width={progress} />
          </MonthProgressBarBg>
        </MonthProgressBar>
      </MonthHeader>

      {/* Weeks */}
      {!isCollapsed && (
        <MonthWeeks>
          {month.weeks.map((week) => (
            <WeekItem
              key={week.id}
              week={week}
              monthId={month.id}
              onToggleCompletion={onToggleWeekCompletion}
              onUpdateNotes={onUpdateWeekNotes}
            />
          ))}
        </MonthWeeks>
      )}
    </MonthCardContainer>
  );
}

// Week Item Component
interface WeekItemProps {
  week: Week;
  monthId: string;
  onToggleCompletion: (monthId: string, weekId: string) => void;
  onUpdateNotes: (monthId: string, weekId: string, notes: Week['notes']) => void;
}

const WeekItemContainer = styled.div<{ completed: boolean }>`
  padding: 1.25rem;
  border-radius: 0.75rem;
  border: 1px solid var(--border);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  animation: fadeIn 0.5s ease-out;
  
  ${props => props.completed ? `
    background-color: var(--green-50);
    border-color: var(--green-200);
    box-shadow: 0 2px 8px rgba(22, 163, 74, 0.1);
  ` : `
    background-color: var(--card);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  `}

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
    border-color: var(--blue-200);
  }
`;

const WeekItemContent = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
`;

const WeekToggleButton = styled.button`
  margin-top: 0.25rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;

  &:hover {
    background-color: var(--muted);
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const WeekDetails = styled.div`
  flex: 1;
`;

const WeekDescription = styled.p<{ completed: boolean }>`
  font-weight: 600;
  font-size: 1rem;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  line-height: 1.6;
  
  ${props => props.completed && `
    text-decoration: line-through;
    color: var(--muted-foreground);
  `}
`;

const WeekNotesContainer = styled.div`
  margin-top: 0.75rem;
`;

const WeekNotesTextarea = styled.textarea`
  width: 100%;
  padding: 0.5rem;
  font-size: 0.875rem;
  border: 1px solid var(--input);
  border-radius: 0.375rem;
  background-color: var(--card);
  color: var(--foreground);
  resize: none;
  transition: all 0.2s ease;

  &::placeholder {
    color: var(--muted-foreground);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px var(--ring);
    border-color: transparent;
  }
`;

function WeekItem({
  week,
  monthId,
  onToggleCompletion,
  onUpdateNotes
}: WeekItemProps) {
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);
  const [editingNote, setEditingNote] = useState<NotePage | null>(null);
  const [isCreatingNote, setIsCreatingNote] = useState(false);

  // Reset note state when week changes
  useEffect(() => {
    setActiveNoteId(null);
    setEditingNote(null);
    setIsCreatingNote(false);
  }, [week.id]);

  const handleCreateNote = () => {
    const newNote: NotePage = {
      id: `note-${Date.now()}`,
      name: 'Untitled Note',
      content: '',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const updatedNotes = [...week.notes, newNote];
    onUpdateNotes(monthId, week.id, updatedNotes);
    setActiveNoteId(newNote.id);
    setEditingNote(newNote);
    setIsCreatingNote(true);
  };

  const handleEditNote = (note: NotePage) => {
    setEditingNote({ ...note });
    setActiveNoteId(note.id);
    setIsCreatingNote(false);
  };

  const handleSaveNote = () => {
    if (editingNote) {
      const updatedNotes = week.notes.map(note => 
        note.id === editingNote.id 
          ? { ...editingNote, updatedAt: new Date() }
          : note
      );
      onUpdateNotes(monthId, week.id, updatedNotes);
      setEditingNote(null);
      setIsCreatingNote(false);
    }
  };

  const handleCancelEdit = () => {
    setEditingNote(null);
    setIsCreatingNote(false);
  };

  const handleDeleteNote = (noteId: string) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      const updatedNotes = week.notes.filter(note => note.id !== noteId);
      onUpdateNotes(monthId, week.id, updatedNotes);
      if (activeNoteId === noteId) {
        setActiveNoteId(null);
      }
    }
  };

  const handleNoteContentChange = (content: string) => {
    if (editingNote) {
      setEditingNote({ ...editingNote, content });
    }
  };

  const handleNoteNameChange = (name: string) => {
    if (editingNote) {
      setEditingNote({ ...editingNote, name });
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(date));
  };

  return (
    <WeekItemContainer completed={week.completed}>
      <WeekItemContent>
        <WeekToggleButton onClick={() => onToggleCompletion(monthId, week.id)}>
          {week.completed ? (
            <CheckCircle2 size={20} color="var(--green-600)" />
          ) : (
            <Circle size={20} color="var(--gray-400)" />
          )}
        </WeekToggleButton>
        
        <WeekDetails>
          <WeekDescription completed={week.completed}>
            {week.description}
          </WeekDescription>
          
          <NotesContainer>
            <NotesHeader>
              <NotesTitle>Notes ({week.notes.length})</NotesTitle>
              <NotesActions>
                <NotesActionButton onClick={handleCreateNote} title="Add Note">
                  <Plus size={14} />
                </NotesActionButton>
              </NotesActions>
            </NotesHeader>

            {week.notes.length > 0 && (
              <NotesList>
                {week.notes.map((note) => (
                  <NoteItem
                    key={note.id}
                    isActive={activeNoteId === note.id}
                    onClick={() => setActiveNoteId(note.id)}
                  >
                    <NoteItemHeader>
                      <NoteItemName>{note.name}</NoteItemName>
                      <NoteItemDate>{formatDate(note.updatedAt)}</NoteItemDate>
                    </NoteItemHeader>
                  </NoteItem>
                ))}
              </NotesList>
            )}

            {activeNoteId && (
              <NoteEditor>
                <NoteEditorHeader>
                  <NoteEditorTitle
                    value={editingNote?.name || ''}
                    onChange={(e) => handleNoteNameChange(e.target.value)}
                    placeholder="Note title..."
                  />
                  <NoteEditorActions>
                    <NoteEditorButton onClick={handleSaveNote} variant="primary">
                      <Save size={12} />
                      Save
                    </NoteEditorButton>
                    <NoteEditorButton onClick={handleCancelEdit}>
                      <X size={12} />
                      Cancel
                    </NoteEditorButton>
                    {!isCreatingNote && (
                      <NoteEditorButton onClick={() => handleEditNote(week.notes.find(n => n.id === activeNoteId)!)}>
                        <Edit3 size={12} />
                        Edit
                      </NoteEditorButton>
                    )}
                    <NoteEditorButton onClick={() => handleDeleteNote(activeNoteId)}>
                      <Trash2 size={12} />
                    </NoteEditorButton>
                  </NoteEditorActions>
                </NoteEditorHeader>
                <NoteEditorContent>
                  <NoteEditorTextarea
                    value={editingNote?.content || ''}
                    onChange={(e) => handleNoteContentChange(e.target.value)}
                    placeholder="Start writing your notes here..."
                  />
                </NoteEditorContent>
              </NoteEditor>
            )}
          </NotesContainer>
        </WeekDetails>
      </WeekItemContent>
    </WeekItemContainer>
  );
}

export default App;
