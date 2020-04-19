const getFilterNames = () => ([
  `all`,
  `overdue`,
  `today`,
  `favorites`,
  `repeating`,
  `archive`,
]);

class Filter {
  constructor(name) {
    this.name = name;
    this.count = Math.floor(Math.random() * 10);
  }
}

export const filters = getFilterNames().map((name) => new Filter(name));
