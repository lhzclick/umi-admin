import React,{useState} from 'react';
import styles from './index.less';

export default () => {
  const [data, setData] = useState({
    count: 0,
    name: 'cjg',
    age: 18,
  });
  const handleClick = () => {
    const { count } = data;
    // 这里必须将完整的state对象传进去
    setData({
      ...data,
      count: count + 1,
    })
  };
  return (
    <div>
      <button onClick={handleClick}>111</button>
    </div>
  );
}
