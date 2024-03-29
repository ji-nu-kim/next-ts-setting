import { Button, Form } from 'antd';
import Link from 'next/link';
import React, { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootStateInterface } from '../interfaces/RootState';
import useInput from '../hooks/useInput';
import { loginRequestAction } from '../actions/actionUser';

const ButtonWrapper = styled.div`
  margin-top: 10px;
`;

const FormWrapper = styled(Form)`
  padding: 10px;
`;

function LoginForm() {
  const dispatch = useDispatch();
  const { logInLoading, logInError } = useSelector(
    (state: RootStateInterface) => state.user
  );

  useEffect(() => {
    if (logInError) {
      alert(logInError);
    }
  }, [logInError]);

  const [email, onChangeEmail] = useInput<string>('');
  const [password, onChangePassword] = useInput<string>('');

  const onSubmitForm = useCallback(() => {
    dispatch(loginRequestAction(email, password));
  }, [email, password]);

  // useMemo예제
  const idColor = useMemo(() => ({ color: 'hotpink' }), []);

  return (
    <FormWrapper onFinish={onSubmitForm}>
      <div>
        <label style={idColor} htmlFor="user-email">
          이메일
        </label>
        <br />
        <input
          name="user-email"
          value={email}
          onChange={onChangeEmail}
          type="email"
          required
        />
      </div>
      <div>
        <label htmlFor="user-password">비밀번호</label>
        <br />
        <input
          name="user-password"
          value={password}
          onChange={onChangePassword}
          type="password"
          required
        />
      </div>
      <div>
        <ButtonWrapper>
          <Button type="primary" htmlType="submit" loading={logInLoading}>
            로그인
          </Button>
          <Link href="/signup">
            <a>
              <Button>회원가입</Button>
            </a>
          </Link>
        </ButtonWrapper>
      </div>
    </FormWrapper>
  );
}

export default LoginForm;
