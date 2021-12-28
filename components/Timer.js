import styles from './Timer.module.css'

export default function Timer({ name, time }) {
  return (
    <div className={styles.timer}>
      <span className={styles.time}>{time}</span>
      <br />
      <span className={styles.name}>{name}</span>
    </div>
  )
}