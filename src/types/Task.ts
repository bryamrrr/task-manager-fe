export type Task = {
  id: string;
  title: string;
  due_date?: string;
  note?: string;
  metadata?: Record<any, any>;
  done?: boolean;
};
