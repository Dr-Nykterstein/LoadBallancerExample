import React, { useState } from 'react';
import useInterval from 'use-interval';
import {
  Dimmer,
  Grid,
  Loader,
  Page as TablerPage,
  Form,
  Card,
  Button,
  Table,
} from 'tabler-react';
import { FormProvider, useForm } from 'react-hook-form';

import Page from '../../components/Page';
import FormInput from '../../components/FormInput';
// import { useTaskCreate, useTasksAll } from '../../hooks/api/task';
import TaskItem from '../../components/TaskItem';

// import './index.scss';

const INPUTS = [
  {
    label: 'NUMBER',
    name: 'number',
    type: 'number',
    placeholder: 'NUMBER',
    min: 1,
    max: 64,
    validation: {
      required: 'Please enter balancer-number',
      min: {
        value: 1,
        message: 'Number should be at least 1',
      },
      max: {
        value: 15000,
        message: 'Number less or equal 15000',
      },
    },
  },
];

const tasks = [];

const AccountPage = () => {
  // const { data: { data: tasks = [] } = {}, isSuccess, refetch } = useTasksAll({
  //   refetchInterval: 5000,
  // });
  // const [createTask, { isLoading }] = useTaskCreate();
  const [tasks, setTasks] = useState([]);
  const form = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      hardness: 8,
    },
  });
  const { handleSubmit } = form;
  const submit = ({number}) => {
    fetch(`http://localhost:5000/calc?number=${number}`, {
      method: 'POST',
    });
    // await createTask(task);
    // await refetch();
  };

  useInterval(() => {
    fetch(`http://localhost:5000/tasks`)
      .then((res) => res.json())
      .then(res => setTasks(res));
  }, 1000);

  return (
    <Page>
      <Dimmer active={false} loader={<Loader />}>
        <TablerPage.Content>
          <Grid.Row justifyContent="center">
            <Grid.Col width={4}>
              <Form
                autocomplete="off"
                className="card"
                onSubmit={handleSubmit(submit)}
              >
                <FormProvider {...form}>
                  <input type="hidden" value="something" />
                  <Card.Body className="p-4 p-md-5 p-xl-6">
                    <Grid.Row>
                      <Grid.Col
                        width={12}
                        className="d-flex flex-column justify-content-center"
                      >
                        <Card.Title RootComponent="div">
                          Create new task
                        </Card.Title>
                        <div className="d-flex flex-column align-items-end flex-md-row">
                          {INPUTS.map(
                            (
                              { type, name, label, placeholder, validation },
                              i,
                            ) => (
                              <FormInput
                                key={i}
                                type={type}
                                name={name}
                                label={label}
                                placeholder={placeholder}
                                validation={validation}
                                wrapperClassName="mr-0 mr-md-3 mb-4 mb-md-0"
                              />
                            ),
                          )}
                          <Button
                            className=""
                            type="submit"
                            color="primary"
                            outline
                          >
                            Start
                          </Button>
                        </div>
                      </Grid.Col>
                    </Grid.Row>
                  </Card.Body>
                </FormProvider>
              </Form>
            </Grid.Col>
            <Grid.Col width={8}>
              <Table cards responsive highlightRowOnHover className="table-vcenter">
                <Table.Header>
                  <Table.Row>
                    <Table.ColHeader>ID</Table.ColHeader>
                    <Table.ColHeader>NUMBER</Table.ColHeader>
                    <Table.ColHeader>STATUS</Table.ColHeader>
                    <Table.ColHeader>PORT</Table.ColHeader>
                    <Table.ColHeader>TIME</Table.ColHeader>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {tasks.map(({ id, number, status, workerPort, time },) => (
                    <TaskItem
                      id={id}
                      key={id}
                      number={number}
                      time={time}
                      workerPort={workerPort}
                      status={status}
                      // onDelete={() => refetch()}
                    />
                  ))}
                </Table.Body>
              </Table>
            </Grid.Col>
          </Grid.Row>
        </TablerPage.Content>
      </Dimmer>
    </Page>
  );
};

export default AccountPage;