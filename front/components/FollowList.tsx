import { StopOutlined } from '@ant-design/icons';
import { Button, Card, List } from 'antd';
import React, { useMemo } from 'react';

interface FollowListProps {
  header: string;
  data: {
    nickname: string;
  }[];
}

function FollowList({ header, data }: FollowListProps) {
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
          <Button>더 보기</Button>
        </div>
      }
      bordered
      dataSource={data}
      renderItem={item => (
        <List.Item style={listMarginTop}>
          <Card actions={[<StopOutlined key="stop" />]}>
            <Card.Meta description={item.nickname} />
          </Card>
        </List.Item>
      )}
    />
  );
}

export default FollowList;
