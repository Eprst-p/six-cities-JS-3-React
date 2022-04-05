const getRandomPositiveNumber = (a:number, b:number) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  return Math.floor(Math.random() * (upper - lower + 1)) + lower; //рандомное число от a до b включительно
};


export {getRandomPositiveNumber}
