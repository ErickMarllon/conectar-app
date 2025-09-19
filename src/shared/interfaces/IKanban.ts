// ----------------------------------------------------------------------

export type IKanbanComment = {
  id: string;
  avatar: string;
  name: string;
  createdAt: Date | string | number;
  messageType: 'image' | 'text';
  message: string;
};

export type IKanbanAssignee = {
  id: string;
  name: string;
  username: string;
  avatar: string;
  address: string;
  phone: string;
  email: string;
  lastActivity: Date | string;
  status: string;
  role: string;
};

export type IKanbanCard = {
  id: string;
  name: string;
  description?: string;
  assignee: IKanbanAssignee[];
  due: [Date | null, Date | null];
  attachments: string[];
  comments: IKanbanComment[];
  completed: boolean;
};

export type IKanbanColumn = {
  id: string;
  name: string;
  cardIds: string[];
};

export type IKanbanBoardFlat = {
  cards: IKanbanCard[];
  columns: IKanbanColumn[];
  columnOrder: string[];
};

export type IKanbanStateFlat = {
  cards: Record<string, IKanbanCard>;
  columns: Record<string, IKanbanColumn>;
  columnOrder: string[];
};

export type IKanbanBoard = {
  board: IKanbanBoardFlat;
};

// ----------------------------------------------------------------------

export type IKanbanState = {
  board: IKanbanStateFlat;
};

export type IKanbanDeleteParams = {
  slug?: string;
  cardId?: string;
  columnId?: string;
};
export type IKanbanCommonParams = Partial<IKanbanDeleteParams> & {
  data: Partial<{
    cards: Partial<IKanbanCard>;
    columns: Partial<IKanbanColumn>;
    columnOrder: Partial<string[]>;
  }>;
};
