import React, { useState } from 'react';
import emailjs from 'emailjs-com';

const SendEmail = () => {
  const [toSend, setToSend] = useState({
    from_name: '',
    to_name: '',
    message: '',
    reply_to: '',
  });

  const onSubmit = (e) => {
    e.preventDefault();
    emailjs.send('your_service_id', 'your_template_id', toSend, 'your_user_id')
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
      })
      .catch((err) => {
        console.log('FAILED...', err);
      });
  };

  const handleChange = (e) => {
    setToSend({ ...toSend, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type='text'
        name='from_name'
        placeholder='From Name'
        value={toSend.from_name}
        onChange={handleChange}
      />
      <input
        type='text'
        name='to_name'
        placeholder='To Name'
        value={toSend.to_name}
        onChange={handleChange}
      />
      <input
        type='text'
        name='reply_to'
        placeholder='Your email'
        value={toSend.reply_to}
        onChange={handleChange}
      />
      <textarea
        name='message'
        placeholder='Your message'
        value={toSend.message}
        onChange={handleChange}
      />
      <button type='submit'>Send Email</button>
    </form>
  );
};

export default SendEmail;
