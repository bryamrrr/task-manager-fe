export type Task = {
  id: number;
  title: string;
  due_date?: string;
  note?: string;
  metadata?: Record<any, any>;
  done?: boolean;
};
