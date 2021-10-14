export default () =>
  Promise.resolve([
    {
      color: null,
      icon: 'done_outline',
      id: 1,
      metadata: {},
      tasks: [
        {
          id: 1,
          title: 'Una tarea en primera lista',
          note: null,
          list_id: 1,
          done: false,
        },
      ],
      title: 'Primera lista',
    },
    {
      color: null,
      icon: 'done_outline',
      id: 2,
      metadata: {},
      tasks: [
        {
          id: 2,
          title: 'Una tarea en segunda lista',
          note: null,
          list_id: 2,
          done: false,
        },
        {
          id: 3,
          title: 'Otra tarea en segunda lista',
          note: null,
          list_id: 2,
          done: true,
        },
      ],
      title: 'Segunda lista',
    },
  ]);
