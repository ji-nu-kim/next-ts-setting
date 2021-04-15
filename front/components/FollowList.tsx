import { StopOutlined } from '@ant-design/icons';
import {
  removeFollowerRequestAction,
  unfollowRequestAction,
} from 'actions/actionUser';
import { Button, Card, List } from 'antd';
import React, { useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';

type Headers = '팔로잉' | '팔로워';
interface FollowListProps {
  header: Headers;
  data: { id: number; nickname?: string }[] | undefined;
  loading: boolean;
  onClickMore: () => void;
}

function FollowList({ header, data, loading, onClickMore }: FollowListProps) {
  const dispatch = useDispatch();

  const onClickDelete = useCallback(
    (id: number) => () => {
      if (header === '팔로잉') {
        return dispatch(unfollowRequestAction({ userId: id }));
      }
      if (header === '팔로워') {
        return dispatch(removeFollowerRequestAction({ userId: id }));
      }
    },
    []
  );

  const listMarginTop = useMemo(
    () => ({
      marginTop: '20px',
    }),
    []
  );
  const listMarginBottom = useMemo(
    () => ({
      marginBottom: '20px',
    }),
    []
  );

  return (
    <List
      style={listMarginBottom}
      grid={{ gutter: 4, xs: 2, md: 3 }}
      size="small"
      header={<div>{header}</div>}
      loadMore={
        <div
          style={{
            textAlign: 'center',
            margin: '10px 0',
          }}
        >
          <Button loading={loading} onClick={onClickMore}>
            더 보기
          </Button>
        </div>
      }
      bordered
      dataSource={data}
      renderItem={item => (
        <List.Item style={listMarginTop}>
          <Card
            actions={[
              <StopOutlined key="stop" onClick={onClickDelete(item.id)} />,
            ]}
          >
            <Card.Meta description={item.nickname} />
          </Card>
        </List.Item>
      )}
    />
  );
}

export default FollowList;
