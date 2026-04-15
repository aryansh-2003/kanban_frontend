export const mockWorkspaces = [
  { id: 'w1', name: 'Engineering', initials: 'EN' },
  { id: 'w2', name: 'Design Team', initials: 'DT' },
];

export const mockBoard = {
  id: 'b1',
  title: 'Kanban V2 Architecture',
  activeUsers: [
    { id: 'u1', name: 'Alice', color: 'bg-blue-500' },
    { id: 'u2', name: 'Bob', color: 'bg-green-500' },
  ],
  columns: [
    {
      id: 'col-1',
      title: 'To Do',
      cards: [
        { id: 'card-1', title: 'Setup Repo & CI/CD', labels: ['DevOps'], assignees: ['u1'] },
        { id: 'card-2', title: 'JWT Auth Endpoints', labels: ['Backend', 'Security'], assignees: [] },
      ]
    },
    {
      id: 'col-2',
      title: 'In Progress',
      cards: [
        { id: 'card-3', title: 'Glassmorphism UI', labels: ['Frontend'], assignees: ['u2', 'u1'] },
      ]
    },
    {
      id: 'col-3',
      title: 'Review',
      cards: []
    }
  ]
};