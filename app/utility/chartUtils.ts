export const Utils = {
  xlabel({ count }) {
    const xlabels = ['Cardiac Surgery','Cardiology','Diagno','Endo surgery','ENT','Marketing Activities','Meril Sports Medicine','Neuro vascular','Ortho pedics','Peripheral','Trauma BU', 'Total'];
    return xlabels.slice(0, count);
  },
  months({ count }) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Total'];
    return months.slice(0, count);
  },
  numbers({ count, min, max }) {
    return Array.from({ length: count }, () => Math.floor(Math.random() * (max - min + 1) + min));
  },
  CHART_COLORS: {
    pink: '#ef81a7',
    blue: '#8dbdff',
    green: '#b5d475',
    peach: '#ffbc7d',
    blueishgreen: '#79afbe',
    violet: '#605fb8',
    red: '#ff8181',
    black: '#000000',
    skyblue: '#8DBDFF',
    darkblue: '#605FB8',
  },
};