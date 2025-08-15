export interface NotePage {
  id: string;
  name: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Week {
  id: string;
  description: string;
  completed: boolean;
  notes: NotePage[];
}

export interface Month {
  id: string;
  name: string;
  weeks: Week[];
}

export const initialSchedule: Month[] = [
  {
    id: 'month-1',
    name: 'Month 1: Fundamentals',
    weeks: [
      {
        id: 'week-1-1',
        description: 'Week 1: Basic Data Structures',
        completed: false,
        notes: []
      },
      {
        id: 'week-1-2',
        description: 'Week 2: Arrays and Strings',
        completed: false,
        notes: []
      },
      {
        id: 'week-1-3',
        description: 'Week 3: Linked Lists',
        completed: false,
        notes: []
      },
      {
        id: 'week-1-4',
        description: 'Week 4: Stacks and Queues',
        completed: false,
        notes: []
      }
    ]
  },
  {
    id: 'month-2',
    name: 'Month 2: Advanced Data Structures',
    weeks: [
      {
        id: 'week-2-1',
        description: 'Week 5: Trees and Binary Trees',
        completed: false,
        notes: []
      },
      {
        id: 'week-2-2',
        description: 'Week 6: Binary Search Trees',
        completed: false,
        notes: []
      },
      {
        id: 'week-2-3',
        description: 'Week 7: Heaps and Priority Queues',
        completed: false,
        notes: []
      },
      {
        id: 'week-2-4',
        description: 'Week 8: Graphs and Graph Algorithms',
        completed: false,
        notes: []
      }
    ]
  },
  {
    id: 'month-3',
    name: 'Month 3: Algorithms',
    weeks: [
      {
        id: 'week-3-1',
        description: 'Week 9: Sorting Algorithms',
        completed: false,
        notes: []
      },
      {
        id: 'week-3-2',
        description: 'Week 10: Searching Algorithms',
        completed: false,
        notes: []
      },
      {
        id: 'week-3-3',
        description: 'Week 11: Recursion and Backtracking',
        completed: false,
        notes: []
      },
      {
        id: 'week-3-4',
        description: 'Week 12: Dynamic Programming Basics',
        completed: false,
        notes: []
      }
    ]
  },
  {
    id: 'month-4',
    name: 'Month 4: Problem Solving',
    weeks: [
      {
        id: 'week-4-1',
        description: 'Week 13: Two Pointers Technique',
        completed: false,
        notes: []
      },
      {
        id: 'week-4-2',
        description: 'Week 14: Sliding Window Technique',
        completed: false,
        notes: []
      },
      {
        id: 'week-4-3',
        description: 'Week 15: Binary Search Applications',
        completed: false,
        notes: []
      },
      {
        id: 'week-4-4',
        description: 'Week 16: Greedy Algorithms',
        completed: false,
        notes: []
      }
    ]
  }
];
