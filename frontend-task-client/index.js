import './styles/styles.scss';

const logIt = (something) => {
  console.log(something);
}

const obj = {
  name: 'Roman',
  age: 23
}

const { name } = obj;

logIt(name);