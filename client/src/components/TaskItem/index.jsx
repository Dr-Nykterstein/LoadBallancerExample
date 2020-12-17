import React, { useState, useEffect } from 'react';
// @ts-ignore
import { Button, Badge, Table } from 'tabler-react';
import cn from 'classnames';



const TaskItem = ({
  id,
  number,
  status,
  workerPort,
  time,
  onDelete = () => null,
}) => {
  const baseClassName = 'created-contest-item';
  const getStatusColor = (status) => {
    if (status === 'CREATED') return 'warning';
    if (status === 'IS_CALCULATING') return 'warning';
    if (status === 'FINISHED') return 'success';
  };

  return (
    <Table.Row>
      <Table.Col className="w-1">{id}</Table.Col>
      <Table.Col>{number}</Table.Col>
      <Table.Col>{status}</Table.Col>
      <Table.Col>{workerPort}</Table.Col>
      <Table.Col>{time}</Table.Col>
    </Table.Row>
  );
};

export default TaskItem;