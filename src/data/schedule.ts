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
    id: "month-1",
    name: "Month 1: Fundamentals & Data Structures",
    weeks: [
      {
        id: "month-1-week-1",
        description: "Week 1: Arrays & Strings + SD: Load Balancer",
        completed: false,
        notes: []
      },
      {
        id: "month-1-week-2",
        description: "Week 2: Linked Lists & Stacks + SD: Caching",
        completed: false,
        notes: []
      },
      {
        id: "month-1-week-3",
        description: "Week 3: Queues & Trees + SD: Database Design",
        completed: false,
        notes: []
      },
      {
        id: "month-1-week-4",
        description: "Week 4: Graphs & Hash Tables + SD: API Design",
        completed: false,
        notes: []
      }
    ]
  },
  {
    id: "month-2",
    name: "Month 2: Advanced Data Structures",
    weeks: [
      {
        id: "month-2-week-1",
        description: "Week 1: Heaps & Priority Queues + SD: Microservices",
        completed: false,
        notes: []
      },
      {
        id: "month-2-week-2",
        description: "Week 2: Tries & Segment Trees + SD: Message Queues",
        completed: false,
        notes: []
      },
      {
        id: "month-2-week-3",
        description: "Week 3: Union Find & Advanced Trees + SD: Distributed Systems",
        completed: false,
        notes: []
      },
      {
        id: "month-2-week-4",
        description: "Week 4: Advanced Graphs + SD: System Design Patterns",
        completed: false,
        notes: []
      }
    ]
  },
  {
    id: "month-3",
    name: "Month 3: Algorithms & Problem Solving",
    weeks: [
      {
        id: "month-3-week-1",
        description: "Week 1: Sorting & Searching + SD: Scalability",
        completed: false,
        notes: []
      },
      {
        id: "month-3-week-2",
        description: "Week 2: Dynamic Programming Basics + SD: Performance",
        completed: false,
        notes: []
      },
      {
        id: "month-3-week-3",
        description: "Week 3: Greedy Algorithms + SD: Security",
        completed: false,
        notes: []
      },
      {
        id: "month-3-week-4",
        description: "Week 4: Backtracking + SD: Monitoring & Logging",
        completed: false,
        notes: []
      }
    ]
  },
  {
    id: "month-4",
    name: "Month 4: Advanced Algorithms",
    weeks: [
      {
        id: "month-4-week-1",
        description: "Week 1: Advanced DP + SD: Data Processing",
        completed: false,
        notes: []
      },
      {
        id: "month-4-week-2",
        description: "Week 2: Graph Algorithms + SD: Machine Learning Systems",
        completed: false,
        notes: []
      },
      {
        id: "month-4-week-3",
        description: "Week 3: String Algorithms + SD: Big Data Systems",
        completed: false,
        notes: []
      },
      {
        id: "month-4-week-4",
        description: "Week 4: Advanced Tree Algorithms + SD: Real-time Systems",
        completed: false,
        notes: []
      }
    ]
  },
  {
    id: "month-5",
    name: "Month 5: System Design Deep Dive",
    weeks: [
      {
        id: "month-5-week-1",
        description: "Week 1: Design Twitter + SD: Social Media Systems",
        completed: false,
        notes: []
      },
      {
        id: "month-5-week-2",
        description: "Week 2: Design Uber + SD: Location Services",
        completed: false,
        notes: []
      },
      {
        id: "month-5-week-3",
        description: "Week 3: Design Netflix + SD: Video Streaming",
        completed: false,
        notes: []
      },
      {
        id: "month-5-week-4",
        description: "Week 4: Design Google Search + SD: Search Engines",
        completed: false,
        notes: []
      }
    ]
  },
  {
    id: "month-6",
    name: "Month 6: Database & Storage Systems",
    weeks: [
      {
        id: "month-6-week-1",
        description: "Week 1: SQL Deep Dive + SD: Database Sharding",
        completed: false,
        notes: []
      },
      {
        id: "month-6-week-2",
        description: "Week 2: NoSQL Databases + SD: Event Sourcing",
        completed: false,
        notes: []
      },
      {
        id: "month-6-week-3",
        description: "Week 3: Distributed Databases + SD: CAP Theorem",
        completed: false,
        notes: []
      },
      {
        id: "month-6-week-4",
        description: "Week 4: Storage Systems + SD: CDN Design",
        completed: false,
        notes: []
      }
    ]
  },
  {
    id: "month-7",
    name: "Month 7: Networking & Infrastructure",
    weeks: [
      {
        id: "month-7-week-1",
        description: "Week 1: Network Protocols + SD: Load Balancing",
        completed: false,
        notes: []
      },
      {
        id: "month-7-week-2",
        description: "Week 2: DNS & CDN + SD: Global Distribution",
        completed: false,
        notes: []
      },
      {
        id: "month-7-week-3",
        description: "Week 3: Network Security + SD: Authentication Systems",
        completed: false,
        notes: []
      },
      {
        id: "month-7-week-4",
        description: "Week 4: Cloud Infrastructure + SD: AWS/Azure Design",
        completed: false,
        notes: []
      }
    ]
  },
  {
    id: "month-8",
    name: "Month 8: Performance & Optimization",
    weeks: [
      {
        id: "month-8-week-1",
        description: "Week 1: Caching Strategies + SD: Redis Design",
        completed: false,
        notes: []
      },
      {
        id: "month-8-week-2",
        description: "Week 2: Database Optimization + SD: Query Performance",
        completed: false,
        notes: []
      },
      {
        id: "month-8-week-3",
        description: "Week 3: Frontend Performance + SD: Web Optimization",
        completed: false,
        notes: []
      },
      {
        id: "month-8-week-4",
        description: "Week 4: Backend Performance + SD: API Optimization",
        completed: false,
        notes: []
      }
    ]
  },
  {
    id: "month-9",
    name: "Month 9: Scalability & Reliability",
    weeks: [
      {
        id: "month-9-week-1",
        description: "Week 1: Horizontal Scaling + SD: Auto-scaling",
        completed: false,
        notes: []
      },
      {
        id: "month-9-week-2",
        description: "Week 2: Fault Tolerance + SD: Circuit Breakers",
        completed: false,
        notes: []
      },
      {
        id: "month-9-week-3",
        description: "Week 3: High Availability + SD: Disaster Recovery",
        completed: false,
        notes: []
      },
      {
        id: "month-9-week-4",
        description: "Week 4: Consistency Models + SD: Eventual Consistency",
        completed: false,
        notes: []
      }
    ]
  },
  {
    id: "month-10",
    name: "Month 10: Advanced System Design",
    weeks: [
      {
        id: "month-10-week-1",
        description: "Week 1: Design YouTube + SD: Video Platforms",
        completed: false,
        notes: []
      },
      {
        id: "month-10-week-2",
        description: "Week 2: Design WhatsApp + SD: Messaging Systems",
        completed: false,
        notes: []
      },
      {
        id: "month-10-week-3",
        description: "Week 3: Design Instagram + SD: Photo Sharing",
        completed: false,
        notes: []
      },
      {
        id: "month-10-week-4",
        description: "Week 4: Design Amazon + SD: E-commerce Systems",
        completed: false,
        notes: []
      }
    ]
  },
  {
    id: "month-11",
    name: "Month 11: Specialized Systems",
    weeks: [
      {
        id: "month-11-week-1",
        description: "Week 1: Design Spotify + SD: Music Streaming",
        completed: false,
        notes: []
      },
      {
        id: "month-11-week-2",
        description: "Week 2: Design Airbnb + SD: Booking Systems",
        completed: false,
        notes: []
      },
      {
        id: "month-11-week-3",
        description: "Week 3: Design LinkedIn + SD: Professional Networks",
        completed: false,
        notes: []
      },
      {
        id: "month-11-week-4",
        description: "Week 4: Design Google Maps + SD: Geospatial Systems",
        completed: false,
        notes: []
      }
    ]
  },
  {
    id: "month-12",
    name: "Month 12: Final Review & Mock Interviews",
    weeks: [
      {
        id: "month-12-week-1",
        description: "Week 1: Mock System Design Interview 1 + Review",
        completed: false,
        notes: []
      },
      {
        id: "month-12-week-2",
        description: "Week 2: Mock System Design Interview 2 + Review",
        completed: false,
        notes: []
      },
      {
        id: "month-12-week-3",
        description: "Week 3: Mock Coding Interview 1 + Review",
        completed: false,
        notes: []
      },
      {
        id: "month-12-week-4",
        description: "Week 4: Final Review & Interview Prep",
        completed: false,
        notes: []
      }
    ]
  }
];
