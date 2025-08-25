"use client"; // Добавляем директиву для клиентского компонента

import { useState } from 'react';

export default function Home() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(0);

  // Реальные проверки (валидные причины)
  const validatePassword = (pwd: string) => {
    if (pwd.length < 8) {
      return 'Пароль слишком короткий! Нужно минимум 8 символов.';
    }
    if (!/\d/.test(pwd)) {
      return 'Не хватает цифр! Добавьте хотя бы одну.';
    }
    if (!/[A-Z]/.test(pwd)) {
      return 'Нет заглавных букв! Как же без них?';
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(pwd)) {
      return 'Слишком мало специальных символов! @#$% — ваши друзья.';
    }
    return null; // Все ок, переходим к абсурду
  };

  // Абсурдные причины (начинаются после прохождения реальных)
  const absurdReasons = [
    'Пароль слишком простой. Попробуйте что-то посложнее.',
    'Этот пароль уже используется... кем-то в параллельной вселенной.',
    'Не хватает эмодзи! Добавьте 😎 для крутости.',
    'Пароль слишком предсказуемый. ИИ угадал его за 0.1 секунды.',
    'Слишком много гласных! Балансируйте с согласными.',
    'Пароль не вдохновляет. Добавьте мотивацию!',
    'Это не пароль, это шутка. Попробуйте серьёзно.',
    'Пароль отвергнут: он не любит понедельники.',
    'Слишком креативный! Нам нужны скучные пароли.',
    'Не хватает кофеина. Пароль выглядит уставшим.',
    'Поздравляем! ...Шучу, попробуйте снова.',
    'Пароль слишком счастливый. Добавьте грусти.',
    'Он не рифмуется с "самое полезное приложение".',
    'Пароль вызывает аллергию у сервера.',
    'Слишком много магии. Нам нужна наука.',
    'Пароль не верит в гравитацию. Попробуйте другой.'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAttempts(attempts + 1);

    const validationError = validatePassword(password);
    if (validationError) {
      setError(validationError);
    } else {
      // Абсурдная причина: рандомная или по attempts для эскалации
      const reasonIndex = Math.min(attempts % absurdReasons.length, absurdReasons.length - 1);
      setError(absurdReasons[reasonIndex]);
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>Самое полезное приложение в мире!</h1>
      <p>Зарегистрируйся и открой для себя... ничего полезного. Но попробуй!</p>
      
      <form onSubmit={handleSubmit}>
        <div style={{ margin: '20px' }}>
          <label>Логин (email или username):</label><br />
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ padding: '10px', width: '300px' }}
          />
        </div>
        <div style={{ margin: '20px' }}>
          <label>Пароль:</label><br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ padding: '10px', width: '300px' }}
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit" style={{ padding: '10px 20px', fontSize: '16px' }}>Зарегистрироваться</button>
      </form>
      
      {attempts > 5 && <p>Подсказка: Может, попробуй "P@ssw0rd123"? (Шучу, не сработает после реальных проверок.)</p>}
      {attempts > 10 && <p>Ты упорный! Но приложение упорнее. 😈</p>}
      <p>Попыток: {attempts}</p>
    </div>
  );
}