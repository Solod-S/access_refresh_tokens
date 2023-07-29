import useForm from "../../shared/hooks/useForm";

import styles from "./login-form.module.css";

import { initialState } from "./initialState";

const LoginForm = ({ onSubmit }) => {
  const { state, handleChange, handleSubmit } = useForm({
    initialState,
    onSubmit,
  });

  const { email, password } = state;

  return (
    <form action="" onSubmit={handleSubmit}>
      <div className={styles.group}>
        <label className={styles.label} htmlFor="">
          User Email:
        </label>
        <input
          value={email}
          name="email"
          onChange={handleChange}
          className={styles.input}
          type="email"
          placeholder="Enter user email"
        />
      </div>
      <div className={styles.group}>
        <label className={styles.label} htmlFor="">
          User password:
        </label>
        <input
          value={password}
          name="password"
          onChange={handleChange}
          className={styles.input}
          type="password"
          placeholder="Enter user password"
        />
      </div>
      <div className={styles.group}>
        <button type="submit">Register</button>
      </div>
    </form>
  );
};

export default LoginForm;
