import { changeNicknameRequestAction } from 'actions/actionUser';
import { Input } from 'antd';
import Form from 'antd/lib/form/Form';
import useInput from 'hooks/useInput';
import { RootStateInterface } from 'interfaces/RootState';
import React, { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function NicknameEditForm() {
  const me = useSelector((state: RootStateInterface) => state.user.me);
  const [nickname, onChangeNickname] = useInput<string>(me?.nickname || '');
  const dispatch = useDispatch();

  const onSubmit = useCallback(() => {
    dispatch(changeNicknameRequestAction({ nickname: nickname }));
  }, [nickname]);

  const style = useMemo(
    () => ({
      marginBottom: '20px',
      border: '1px solid #d9d9d9',
      padding: '20px',
    }),
    []
  );

  return (
    <Form style={style}>
      <Input.Search
        addonBefore="닉네임"
        enterButton="수정"
        value={nickname}
        onChange={onChangeNickname}
        onSearch={onSubmit}
      />
    </Form>
  );
}

export default NicknameEditForm;
