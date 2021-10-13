import { Task } from '.';

export type List = {
  id: string;
  title: string;
  color?: string;
  icon?: string;
  metadata?: Record<any, any>;
  tasks?: Task[];
};
