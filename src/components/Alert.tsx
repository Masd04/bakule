// src/components/Alert.tsx

import styles from '../styles/style.js'

interface AlertProps {
  message: string;
  textColor: string;  
}


const Alert: React.FC<AlertProps> = ({ message, textColor }) => {
    return (
  <div id="alert" className={`h-80 ${styles.flexCenter}`}>
    <div className={`${textColor} text-xl sm:text-4xl`}>
      <p>{message}</p>
    </div>
  </div>
    );
};

export default Alert;