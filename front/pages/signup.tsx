import AppLayout from '@components/AppLayout';
import useInput from '@hooks/useInput';
import { Form, Checkbox, Input, Button } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import Head from 'next/head';
import React, { ChangeEvent, useCallback, useState } from 'react';
import styled from 'styled-components';

const ErrorMessage = styled.div`
  color: crimson;
`;

function Signup() {
  const [id, onChangeId] = useInput('');
  const [nickname, onChangeNickname] = useInput('');
  const [password, onChangePassword] = useInput('');

  const [passwordError, setPasswordError] = useState(false);
  const [passwordCheck, setPasswordCheck] = useState('');
  const onChangePasswordCheck = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setPasswordCheck(e.target.value);
      setPasswordError(e.target.value !== password);
    },
    [password]
  );

  const [term, setTerm] = useState(false);
  const [termError, setTermError] = useState(false);

  const onChangeTerm = useCallback((e: CheckboxChangeEvent) => {
    setTerm(e.target.checked);
    setTermError(false);
  }, []);

  const onsubmit = useCallback(() => {
    if (password !== passwordCheck) {
      return setPasswordError(true);
    }
    if (!term) {
      return setTermError(true);
    }
  }, [password, term, passwordCheck]);

  return (
    <>
      <AppLayout>
        <Head>회원가입</Head>
        <h1>Signup</h1>
        <Form onFinish={onsubmit}>
          <div>
            <label htmlFor="user-id">아이디</label>
            <br />
            <Input
              name="user-id"
              type="text"
              value={id}
              required
              onChange={onChangeId}
            />
          </div>
          <div>
            <label htmlFor="user-nickname">닉네임</label>
            <br />
            <Input
              name="user-nickname"
              type="text"
              value={nickname}
              required
              onChange={onChangeNickname}
            />
          </div>
          <div>
            <label htmlFor="user-password">비밀번호</label>
            <br />
            <Input
              name="user-password"
              type="password"
              value={password}
              required
              onChange={onChangePassword}
            />
          </div>
          <div>
            <label htmlFor="user-password-check">비밀번호 확인</label>
            <br />
            <Input
              name="user-password-check"
              type="password"
              value={passwordCheck}
              required
              onChange={onChangePasswordCheck}
            />
            {passwordError && (
              <ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage>
            )}
          </div>
          <div>
            <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>
              동의합니까?
            </Checkbox>
            {termError && <ErrorMessage>약관에 동의하셔야 합니다</ErrorMessage>}
          </div>
          <Button type="primary" htmlType="submit">
            가입
          </Button>
        </Form>
      </AppLayout>
    </>
  );
}

export default Signup;